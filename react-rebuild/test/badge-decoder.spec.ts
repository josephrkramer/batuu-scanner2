import {
  BadgeCode,
  BadgeDecoder,
  BADGE_DATE_FORMAT,
  EarnedBadge,
} from "../src/badge-decoder";
import { ChainCodeAlignmentCode, ChainCodeDecoder } from "../src/chain-code";
import { CrateDecoder } from "../src/crate-decoder";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { beforeEach, describe, expect, it, vitest } from "vitest";

dayjs.extend(customParseFormat);

describe("BadgeDecoder", () => {
  let badgeDecoder: BadgeDecoder;
  let earnedBadges: BadgeDecoder["earnedBadges"];
  let newBadgesEarned: BadgeDecoder["newBadgesEarned"];
  let setNewBadgesEarned: BadgeDecoder["setNewBadgesEarned"];
  let displayLogoCallback: BadgeDecoder["displayLogoCallback"];
  let setEarnedBadges: BadgeDecoder["setEarnedBadges"];

  beforeEach(() => {
    earnedBadges = new Map();
    newBadgesEarned = undefined;
    setNewBadgesEarned = vitest.fn();
    displayLogoCallback = vitest.fn();
    setEarnedBadges = vitest.fn();
    badgeDecoder = new BadgeDecoder(
      newBadgesEarned,
      setNewBadgesEarned,
      displayLogoCallback,
      earnedBadges,
      setEarnedBadges,
    );
  });

  it("should decode a known badge code", () => {
    const badge = badgeDecoder.decode(BadgeCode.First_Step);
    expect(badge.code).toBe(BadgeCode.First_Step);
    expect(badge.name).toBe("First Step");
    expect(badge.quote).toBe(
      `"You’ve taken your first step into a larger world." --Obi-Wan Kenobi`,
    );
    expect(badge.description).toBe(`Scan a crate on Batuu.`);
    expect(badge.image).toBe("images/badge/unearned-bw.jpeg");
  });

  it("should decode an unlisted badge code", () => {
    const badge = badgeDecoder.decode(BadgeCode.Slicer);
    expect(badge.code).toBe(BadgeCode.Slicer);
    expect(badge.name).toBe("Slicer");
    expect(badge.quote).toBe(
      "You sure are a sneaky one. Raithe would be proud.",
    );
    expect(badge.description).toBe(
      "Find this badge in the source code of the datapad.",
    );
    expect(badge.image).toBe("images/badge/slicer.jpeg");
  });

  it("should throw an error for an unknown badge code", () => {
    expect(() => badgeDecoder.decode("invalid_code")).toThrowError(
      "invalid_code is an unknown badge",
    );
  });

  it("should add a badge to the earned badges map", () => {
    badgeDecoder.add(BadgeCode.First_Step);
    expect(earnedBadges.has(BadgeCode.First_Step)).toBe(true);
    expect(earnedBadges.get(BadgeCode.First_Step)?.code).toBe(
      BadgeCode.First_Step,
    );
  });

  it("should add a badge to the url params", () => {
    badgeDecoder.add(BadgeCode.First_Step);
    expect(window.location.search).toContain(
      `b=${BadgeCode.First_Step}${dayjs().startOf("date").format(BADGE_DATE_FORMAT)}`,
    );
  });

  it("should display a badge when it is added", () => {
    badgeDecoder.add(BadgeCode.First_Step);
    expect(setNewBadgesEarned).toHaveBeenCalledWith([
      badgeDecoder.decode(BadgeCode.First_Step),
    ]);
  });

  describe.skip("this check passes through local storage", () => {
  it("should remove a badge from the earned badges map", () => {
    earnedBadges.set(BadgeCode.First_Step, new EarnedBadge({}));
    badgeDecoder.remove(BadgeCode.First_Step);
    expect(earnedBadges.has(BadgeCode.First_Step)).toBe(false);
  });
    });

  it("should remove a badge from the url params", () => {
    earnedBadges.set(BadgeCode.First_Step, new EarnedBadge({}));
    badgeDecoder.remove(BadgeCode.First_Step);
    expect(window.location.search).not.toContain(
      `b=${BadgeCode.First_Step}${BADGE_DATE_FORMAT}`,
    );
  });

  it("should return all possible badge codes", () => {
    badgeDecoder.add(BadgeCode.First_Step);
    badgeDecoder.add(BadgeCode.Slicer);
    const allKeys = badgeDecoder.allKeys();
    expect(allKeys.size).toBeGreaterThan(0);
    expect(allKeys.has(BadgeCode.First_Step)).toBe(true);
    expect(allKeys.has(BadgeCode.Slicer)).toBe(true);
  });

  it("should return all badges", () => {
    badgeDecoder.add(BadgeCode.First_Step);
    badgeDecoder.add(BadgeCode.Slicer);
    const allBadges = badgeDecoder.allBadges();
    expect(allBadges.length).toBeGreaterThan(0);
    expect(allBadges.some((badge) => badge.code === BadgeCode.First_Step)).toBe(
      true,
    );
    expect(allBadges.some((badge) => badge.code === BadgeCode.Slicer)).toBe(
      true,
    );
  });

  describe.skip("this check passes through local storage", () => {
  it("should reset the earned badges map and url params", () => {
    earnedBadges.set(BadgeCode.First_Step, new EarnedBadge({}));
    badgeDecoder.reset();
    expect(earnedBadges.size).toBe(0);
    expect(window.location.search).not.toContain(
      `b=${BadgeCode.First_Step}${BADGE_DATE_FORMAT}`,
    );
  });
    });

  it("should check for crate related badges", () => {
    const crateDecoder = new CrateDecoder(
      new Set(),
      vitest.fn(),
      new Map(),
      vitest.fn(),
      undefined,
      vitest.fn(),
      vitest.fn(),
    );
    crateDecoder.scannedCrates.add("GI_QR");
    badgeDecoder.checkForCrateRelatedBadges("GI_QR", crateDecoder);
    expect(earnedBadges.has(BadgeCode.Bounty)).toBe(true);
  });

  it("should check for chain code related badges", () => {
    const chainCodeDecoder = new ChainCodeDecoder([], vitest.fn(), vitest.fn());
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
    ];
    badgeDecoder.checkForChainCodeRelatedBadges(chainCodeDecoder);
    expect(earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
  });

  describe.skip("unsure how to test for event related badges", () => {
  it("should check for event related badges", () => {
    badgeDecoder.eventDates.add(
      dayjs().startOf("date").format(BADGE_DATE_FORMAT),
    );
    badgeDecoder.earnedBadges.set(
      BadgeCode.Gayas_Microphone,
      new EarnedBadge({
        earnedAt: dayjs().startOf("date").format(BADGE_DATE_FORMAT),
      }),
    );
    badgeDecoder.checkForEventRelatedBadges();
    expect(earnedBadges.has(BadgeCode.Frequent_Flyer_2)).toBe(true);
  });
    });

  it("should convert a badge param to an earned badge", () => {
    const earnedBadge = badgeDecoder.badgeParamToEarnedBadge(
      `${BadgeCode.First_Step}${BADGE_DATE_FORMAT}`,
    );
    expect(earnedBadge.code).toBe(BadgeCode.First_Step);
    expect(earnedBadge.date).toBe(BADGE_DATE_FORMAT);
  });

  it("should convert an earned badge to a badge param", () => {
    const earnedBadge = new EarnedBadge({
      code: BadgeCode.First_Step,
      earnedAt: BADGE_DATE_FORMAT,
    });
    const badgeParam = badgeDecoder.earnedBadgeToBadgeParam(earnedBadge);
    expect(badgeParam).toBe(`${BadgeCode.First_Step}${BADGE_DATE_FORMAT}`);
  });

  it("should display a badge", () => {
    const badge = badgeDecoder.decode(BadgeCode.First_Step);
    badgeDecoder.displayBadge(badge);
    expect(setNewBadgesEarned).toHaveBeenCalledWith([badge]);
  });

  it("should check if a badge code is valid", () => {
    expect(badgeDecoder.isValidBadgeCode(BadgeCode.First_Step)).toBe(true);
    expect(badgeDecoder.isValidBadgeCode(BadgeCode.Slicer)).toBe(true);
    expect(badgeDecoder.isValidBadgeCode("invalid_code")).toBe(false);
  });
});
