import { BadgeCode, BadgeDecoder } from "../src/badge-decoder";
import { ChainCodeDecoder } from "../src/chain-code";
import { beforeEach, describe, expect, it } from "vitest";
import { CrateDecoder, CrateType } from "../src/crate-decoder";

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

  beforeEach(() => {
    badgeDecoder.reset();
    crateDecoder.reset();
    chainCodeDecoder.reset();
  });

  it("should decode listed badges", () => {
    const badge = badgeDecoder.decode(BadgeCode.Gayas_Microphone);
    expect(badge.name).toBe("Gaya's Microphone");
    expect(badge.description).toBe(
      "You participated in the March 1, 2024 event and helped retrieve Gaya's Microphone.",
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

  //Chain Code Related Badges

  it("should check for Well Connected", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(false);
    for (let i = 0; i < chainCodeDecoder.MAX_CHAIN_CODE_SIZE; i++) {
      chainCodeDecoder.setChainCodeResult("LIGHT", badgeDecoder);
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(true);
  });

  it("should check for Resistance Hero", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(
      false,
    );
    for (let i = 0; i < chainCodeDecoder.MIN_CHAIN_CODE_SIZE; i++) {
      chainCodeDecoder.setChainCodeResult("LIGHT", badgeDecoder);
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
  });

  it("should check for We Have Cookies", () => {
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(
      false,
    );
    for (let i = 0; i < chainCodeDecoder.MIN_CHAIN_CODE_SIZE; i++) {
      chainCodeDecoder.setChainCodeResult("DARK1", badgeDecoder);
    }
    expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(true);
  });
});
