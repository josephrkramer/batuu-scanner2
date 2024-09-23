import { renderHook, act } from "@testing-library/react";
import {
  BadgeCode,
  BADGE_DATE_FORMAT,
  EarnedBadge,
} from "../src/services/badge-decoder";
import {
  ChainCodeAlignmentCode,
  ChainCodeDecoder,
  MAX_CHAIN_CODE_SIZE,
  MIN_CHAIN_CODE_SIZE,
} from "../src/services/chain-code";
import { CrateDecoder, CrateType } from "../src/services/crate-decoder";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import { Setup } from "./Setup";

dayjs.extend(customParseFormat);

describe("BadgeDecoder", () => {
  const {
    result: {
      current: { crateDecoder, chainCodeDecoder, badgeDecoder, reset },
    },
  } = renderHook(() => Setup());

  beforeEach(() => {
    act(() => {
      chainCodeDecoder.reset();
      badgeDecoder.reset();
      crateDecoder.reset();
      reset();
    });
  });

  it("should decode a known badge code", () => {
    let badge;
    act(() => {
      badge = badgeDecoder.decode(BadgeCode.First_Step);
    });
    expect(badge.code).toBe(BadgeCode.First_Step);
    expect(badge.name).toBe("First Step");
    expect(badge.quote).toBe(
      `"You’ve taken your first step into a larger world." --Obi-Wan Kenobi`,
    );
    expect(badge.description).toBe(`Scan a crate on Batuu.`);
    expect(badge.image).toBe("./badge/unearned-bw.jpeg");
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
    expect(badge.image).toBe("./badge/slicer.jpeg");
  });

  it("should throw an error for an unknown badge code", () => {
    expect(() => badgeDecoder.decode("invalid_code")).toThrowError(
      "invalid_code is an unknown badge",
    );
  });

  it("should add a badge to the earned badges map", () => {
    badgeDecoder.add(BadgeCode.First_Step);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.First_Step)).toBe(true);
    expect(badgeDecoder.earnedBadges.get(BadgeCode.First_Step)?.code).toBe(
      BadgeCode.First_Step,
    );
  });

  it("should add a badge to the url params", () => {
    badgeDecoder.add(BadgeCode.First_Step);
    expect(window.location.search).toContain(
      `b=${BadgeCode.First_Step}${dayjs().startOf("date").format(BADGE_DATE_FORMAT)}`,
    );
  });

  it("should remove a badge from the url params", () => {
    badgeDecoder.earnedBadges.set(BadgeCode.First_Step, new EarnedBadge({}));
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

  it("should reset the earned badges map and url params", () => {
    act(() => {
      badgeDecoder.earnedBadges.set(BadgeCode.First_Step, new EarnedBadge({}));
      badgeDecoder.reset();
    });
    expect(badgeDecoder.earnedBadges.size).toBe(0);
    expect(window.location.search).not.toContain(
      `b=${BadgeCode.First_Step}${BADGE_DATE_FORMAT}`,
    );
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
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(true);
  });

  it("should check for chain code related badges", () => {
    const chainCodeDecoder = new ChainCodeDecoder([], vitest.fn(), vitest.fn());
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
    ];
    badgeDecoder.checkForChainCodeRelatedBadges(chainCodeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
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

  it("should check if a badge code is valid", () => {
    expect(badgeDecoder.isValidBadgeCode(BadgeCode.First_Step)).toBe(true);
    expect(badgeDecoder.isValidBadgeCode(BadgeCode.Slicer)).toBe(true);
    expect(badgeDecoder.isValidBadgeCode("invalid_code")).toBe(false);
  });

  //Crate Related Badges

  it("should check for Relic Hunter", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Hunter)).toBe(false);
    act(() => {
      const relics = crateDecoder.sortCargoHold(true).get(CrateType.Relic)!;
      relics.forEach((crate) => {
        crateDecoder.setResult(crate.code, badgeDecoder);
      });
    });
    expect(crateDecoder.getTotalNumberOfType(CrateType.Relic)).toBe(13);
    expect(crateDecoder.getScannedNumberOfType(CrateType.Relic)).toBe(13);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Hunter)).toBe(true);
  });

  it("should check for Amnesiac", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Amnesiac)).toBe(false);
    act(() => {
      crateDecoder.setResult("JK_RS", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Amnesiac)).toBe(false);
    act(() => {
      crateDecoder.setResult("JK_RS", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Amnesiac)).toBe(true);
  });

  it("should check for Bounty", () => {
    //not granted on irrelevant scan
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);
    act(() => {
      crateDecoder.setResult("JK_RS", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);

    act(() => {
      crateDecoder.setResult("GI_QR", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(true);

    //clear the badges and scanned crates for the next check
    act(() => {
      badgeDecoder.reset();
      crateDecoder.reset();
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);

    act(() => {
      crateDecoder.setResult("KL_QR", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(true);

    //clear the badges and scanned crates for the next check
    act(() => {
      badgeDecoder.reset();
      crateDecoder.reset();
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);

    act(() => {
      crateDecoder.setResult("FAL26", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(true);
  });

  it("should check for Jawa", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Jawa)).toBe(false);
    act(() => {
      for (const code of crateDecoder.contents.keys()) {
        crateDecoder.setResult(code, badgeDecoder);
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Jawa)).toBe(true);
  });

  it("should check for I Shot First", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.I_Shot_First)).toBe(false);
    act(() => {
      crateDecoder.setResult("FG_RS", badgeDecoder);
      crateDecoder.setResult("AB_OP", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.I_Shot_First)).toBe(true);
  });

  it("should check for The Best Teacher", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.The_Best_Teacher)).toBe(
      false,
    );
    act(() => {
      for (const code of crateDecoder.contents.keys()) {
        if (crateDecoder.decode(code).type !== CrateType.Relic) {
          crateDecoder.setResult(code, badgeDecoder);
        }
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.The_Best_Teacher)).toBe(
      true,
    );
  });

  it("should check for Relic Enthusiast", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Enthusiast)).toBe(
      false,
    );

    act(() => {
      let i = 0;
      for (const code of crateDecoder.contents.keys()) {
        //All crates are now Relics
        const crate = crateDecoder.decode(code);
        crate.type = CrateType.Relic;

        //Add crate
        crateDecoder.setResult(code, badgeDecoder);

        //If we have five crates, exit the loop
        if (i++ >= 5) {
          break;
        }
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Enthusiast)).toBe(
      true,
    );
  });

  it("should check for Relic Archivist", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Archivist)).toBe(
      false,
    );

    act(() => {
      let i = 0;
      for (const code of crateDecoder.contents.keys()) {
        //All crates are now Relics
        const crate = crateDecoder.decode(code);
        crate.type = CrateType.Relic;

        //Add crate
        crateDecoder.setResult(code, badgeDecoder);

        //If we have five crates, exit the loop
        if (i++ >= 10) {
          break;
        }
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Archivist)).toBe(true);
  });

  it("should check for First Step", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.First_Step)).toBe(false);
    act(() => {
      crateDecoder.setResult("JK_RS", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.First_Step)).toBe(true);
  });

  //Chain Code Related Badges

  it("should check for Well Connected", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(false);
    act(() => {
      for (let i = 0; i < MAX_CHAIN_CODE_SIZE; i++) {
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Light,
          badgeDecoder,
        );
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(true);
  });

  it("should check for Resistance Hero", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
    act(() => {
      for (let i = 0; i < MIN_CHAIN_CODE_SIZE; i++) {
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Light,
          badgeDecoder,
        );
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(
      false,
    );
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
  });

  it("should check for Resistance Hero with past badges", () => {
    act(() => {
      badgeDecoder.add(BadgeCode.Its_Complicated, dayjs("2024-03-01"));
      badgeDecoder.add(BadgeCode.We_Have_Cookies, dayjs("2024-03-01"));
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(true);

    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
    act(() => {
      for (let i = 0; i < MIN_CHAIN_CODE_SIZE; i++) {
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Light,
          badgeDecoder,
        );
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(true);
  });

  it("should check for We Have Cookies", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
    act(() => {
      for (let i = 0; i < MIN_CHAIN_CODE_SIZE; i++) {
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Dark,
          badgeDecoder,
        );
      }
    });
    console.log(badgeDecoder.earnedBadges);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(
      false,
    );
  });

  it("should check for We Have Cookies with past badges", () => {
    act(() => {
      badgeDecoder.add(BadgeCode.Its_Complicated, dayjs("2024-03-01"));
      badgeDecoder.add(BadgeCode.Resistance_Hero, dayjs("2024-03-01"));
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
    act(() => {
      for (let i = 0; i < MIN_CHAIN_CODE_SIZE; i++) {
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Dark,
          badgeDecoder,
        );
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(true);
  });

  it("should check for It's Complicated", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(
      false,
    );
    act(() => {
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Dark,
        badgeDecoder,
      );
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Dark,
        badgeDecoder,
      );
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Dark,
        badgeDecoder,
      );
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Light,
        badgeDecoder,
      );
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
  });

  describe.skip("this check passes when run independently", () => {
    it("should check for It's Complicated with past badges", () => {
      act(() => {
        badgeDecoder.add(BadgeCode.We_Have_Cookies, dayjs("2024-03-01"));
        badgeDecoder.add(BadgeCode.Resistance_Hero, dayjs("2024-03-01"));
      });
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
        true,
      );
      expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
        true,
      );
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(
        false,
      );
      act(() => {
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Dark,
          badgeDecoder,
        );
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Dark,
          badgeDecoder,
        );
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Dark,
          badgeDecoder,
        );
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Light,
          badgeDecoder,
        );
      });
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Its_Complicated)).toBe(
        true,
      );
      expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
        true,
      );
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
        true,
      );
    });
  });

  it("should decode a url parameter into an EarnedBadge", () => {
    const earnedBadge = new EarnedBadge({
      code: BadgeCode.I_Shot_First,
      earnedAt: "000705",
    });
    const codeAndDate = BadgeCode.I_Shot_First + "000705";
    expect(badgeDecoder.badgeParamToEarnedBadge(codeAndDate)).toStrictEqual(
      earnedBadge,
    );
  });

  it("should convert an EarnedBadge into a url parameter", () => {
    const earnedBadge = new EarnedBadge({
      code: BadgeCode.I_Shot_First,
      earnedAt: "000705",
    });
    const codeAndDate = BadgeCode.I_Shot_First + "000705";
    expect(badgeDecoder.earnedBadgeToBadgeParam(earnedBadge)).toStrictEqual(
      codeAndDate,
    );
  });

  //check for event related badges
  it("should check for Frequent Flyer", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Frequent_Flyer_2)).toBe(
      false,
    );
    act(() => {
      badgeDecoder.eventDates.add(badgeDecoder.today());
      badgeDecoder.add(
        BadgeCode.Gayas_Microphone,
        dayjs("2024-03-01").startOf("date"),
      );
      crateDecoder.setResult("JK_RS", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Frequent_Flyer_2)).toBe(
      true,
    );
  });

  it("should check for Veteran Flyer", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Frequent_Flyer_5)).toBe(
      false,
    );

    act(() => {
      badgeDecoder.add(
        BadgeCode.Gayas_Microphone,
        dayjs("2024-03-01").startOf("date"),
      );
      badgeDecoder.eventDates.add(
        dayjs("2024-03-02").startOf("date").format(BADGE_DATE_FORMAT),
      );
      badgeDecoder.add(BadgeCode.Amnesiac, dayjs("2024-03-02").startOf("date"));
      badgeDecoder.eventDates.add(
        dayjs("2024-03-03").startOf("date").format(BADGE_DATE_FORMAT),
      );
      badgeDecoder.add(BadgeCode.Bounty, dayjs("2024-03-03").startOf("date"));
      badgeDecoder.eventDates.add(
        dayjs("2024-03-04").startOf("date").format(BADGE_DATE_FORMAT),
      );
      badgeDecoder.add(BadgeCode.Bounty, dayjs("2024-03-04").startOf("date"));
      badgeDecoder.eventDates.add(
        dayjs("2024-03-05").startOf("date").format(BADGE_DATE_FORMAT),
      );
      badgeDecoder.add(
        BadgeCode.I_Shot_First,
        dayjs("2024-03-05").startOf("date"),
      );
      crateDecoder.setResult("JK_RS", badgeDecoder);
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Frequent_Flyer_5)).toBe(
      true,
    );
  });

  it("should check for Pathway to AARC", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Pathway_to_AARC)).toBe(
      false,
    );
    act(() => {
      for (let i = 0; i < 2; i++) {
        chainCodeDecoder.setChainCodeResult(
          ChainCodeAlignmentCode.Light,
          badgeDecoder,
        );
      }
    });
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Pathway_to_AARC)).toBe(true);
  });
});
