import { BadgeCode, BadgeDecoder, EarnedBadge } from "../src/badge-decoder";
import { ChainCodeAlignmentCode, ChainCodeDecoder } from "../src/chain-code";
import { beforeEach, describe, expect, it } from "vitest";
import { CrateDecoder, CrateType } from "../src/crate-decoder";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

describe("BadgeDecoder", () => {
  const badgeDecoder: BadgeDecoder = new BadgeDecoder();
  const crateDecoder: CrateDecoder = new CrateDecoder();
  const chainCodeDecoder: ChainCodeDecoder = new ChainCodeDecoder();
  const resultsHeader: HTMLElement = document.createElement("h1");
  resultsHeader.id = "results-header";
  document.body.appendChild(resultsHeader);
  const contentsImage: HTMLElement = document.createElement("img");
  contentsImage.id = "contents-image";
  document.body.appendChild(contentsImage);
  const decodeButton: HTMLElement = document.createElement("button");
  decodeButton.id = "decode-chain-code-button";
  document.body.appendChild(decodeButton);
  const badgeText: HTMLElement = document.createElement("h1");
  badgeText.id = "badge-text-large";
  document.body.appendChild(badgeText);
  const badgeDate: HTMLElement = document.createElement("h1");
  badgeDate.id = "badge-date-large";
  document.body.appendChild(badgeDate);
  const badgeImage: HTMLElement = document.createElement("img");
  badgeImage.id = "badge-image-large";
  document.body.appendChild(badgeImage);
  const badgeDiv: HTMLElement = document.createElement("div");
  badgeDiv.id = "badge-large";
  document.body.appendChild(badgeDiv);

  beforeEach(() => {
    badgeDecoder.reset();
    crateDecoder.reset();
    chainCodeDecoder.reset();
  });

  it("should decode listed badges", () => {
    const badge = badgeDecoder.decode(BadgeCode.Gayas_Microphone);
    expect(badge.name).toBe("Gaya's Microphone");
    expect(badge.description).toBe(
      `"I'm a Rockstar Queen!" --Gaya
          
          Participated in an event and helped retrieve Gaya's Microphone.`,
    );
  });

  it("should decode unlisted badges", () => {
    const badge = badgeDecoder.decode(BadgeCode.Slicer);
    expect(badge.name).toBe("Slicer");
    expect(badge.description).toBe(
      "You sure are a sneaky one. Raithe would be proud.",
    );
  });

  it("should throw an error for unknown badges", () => {
    expect(() => badgeDecoder.decode("unknown")).toThrowError(
      "unknown is an unknown badge",
    );
  });

  it("should add badges to the earned set", () => {
    badgeDecoder.add(BadgeCode.Gayas_Microphone);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Gayas_Microphone)).toBe(
      true,
    );
  });

  it("should remove badges from the earned set", () => {
    badgeDecoder.add(BadgeCode.Gayas_Microphone);
    badgeDecoder.remove(BadgeCode.Gayas_Microphone);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Gayas_Microphone)).toBe(
      false,
    );
  });

  it("should return all possible badge keys", () => {
    badgeDecoder.add(BadgeCode.Slicer);
    const keys = badgeDecoder.allKeys();
    expect(keys.has(BadgeCode.Gayas_Microphone)).toBe(true);
    expect(keys.has(BadgeCode.Slicer)).toBe(true);
  });

  it("should reset the earned badges", () => {
    badgeDecoder.add(BadgeCode.Gayas_Microphone);
    badgeDecoder.reset();
    expect(badgeDecoder.earnedBadges.size).toBe(0);
  });

  //Crate Related Badges

  it("should check for Relic Hunter", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Hunter)).toBe(false);
    crateDecoder.setResult("JK_RS", badgeDecoder);
    crateDecoder.setResult("JK_TU", badgeDecoder);
    expect(crateDecoder.getTotalNumberOfType(CrateType.Relic)).toBe(2);
    expect(crateDecoder.getScannedNumberOfType(CrateType.Relic)).toBe(2);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Hunter)).toBe(true);
  });

  it("should check for Amnesiac", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Amnesiac)).toBe(false);
    crateDecoder.setResult("JK_RS", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Amnesiac)).toBe(false);
    crateDecoder.setResult("JK_RS", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Amnesiac)).toBe(true);
  });

  it("should check for Bounty", () => {
    //not granted on irrelevant scan
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);
    crateDecoder.setResult("JK_RS", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);

    crateDecoder.setResult("GI_QR", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(true);

    //clear the badges and scanned crates for the next check
    badgeDecoder.reset();
    crateDecoder.reset();
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);

    crateDecoder.setResult("KL_QR", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(true);

    //clear the badges and scanned crates for the next check
    badgeDecoder.reset();
    crateDecoder.reset();
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(false);

    crateDecoder.setResult("FAL26", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Bounty)).toBe(true);
  });

  it("should check for Jawa", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Jawa)).toBe(false);
    for (const code of crateDecoder.contents.keys()) {
      crateDecoder.setResult(code, badgeDecoder);
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Jawa)).toBe(true);
  });

  it("should check for I Shot First", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.I_Shot_First)).toBe(false);
    crateDecoder.setResult("FG_RS", badgeDecoder);
    crateDecoder.setResult("AB_OP", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.I_Shot_First)).toBe(true);
  });

  it("should check for The Best Teacher", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.The_Best_Teacher)).toBe(
      false,
    );
    for (const code of crateDecoder.contents.keys()) {
      if (crateDecoder.decode(code).type !== CrateType.Relic) {
        crateDecoder.setResult(code, badgeDecoder);
      }
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.The_Best_Teacher)).toBe(
      true,
    );
  });

  it("should check for Relic Enthusiast", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Enthusiast)).toBe(
      false,
    );

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
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Enthusiast)).toBe(
      true,
    );
  });

  it("should check for Relic Archivist", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Archivist)).toBe(
      false,
    );

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
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Archivist)).toBe(true);
  });

  //Chain Code Related Badges

  it("should check for Well Connected", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(false);
    for (let i = 0; i < chainCodeDecoder.MAX_CHAIN_CODE_SIZE; i++) {
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Light,
        badgeDecoder,
      );
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(true);
  });

  it("should check for Resistance Hero", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
    for (let i = 0; i < chainCodeDecoder.MIN_CHAIN_CODE_SIZE; i++) {
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Light,
        badgeDecoder,
      );
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Character_AARC)).toBe(false);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
  });

  it("should check for We Have Cookies", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
    for (let i = 0; i < chainCodeDecoder.MIN_CHAIN_CODE_SIZE; i++) {
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Dark,
        badgeDecoder,
      );
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Character_AARC)).toBe(false);
  });

  it("should check for Chracter AARC", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Character_AARC)).toBe(false);
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
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Character_AARC)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
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
    badgeDecoder.eventDates.add(badgeDecoder.today());
    badgeDecoder.add(
      BadgeCode.Gayas_Microphone,
      dayjs("2024-03-01").startOf("date"),
    );
    crateDecoder.setResult("JK_RS", badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Frequent_Flyer_2)).toBe(
      true,
    );
  });
});
