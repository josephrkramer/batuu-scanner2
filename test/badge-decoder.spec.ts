import { BadgeCode, BadgeDecoder } from "../src/badge-decoder";
import { ChainCodeDecoder } from "../src/chain-code";
import { beforeEach, describe, expect, it } from "vitest";
import { CrateDecoder, CrateType } from "../src/crate-decoder";

describe("BadgeDecoder", () => {
  let badgeDecoder: BadgeDecoder;
  let crateDecoder: CrateDecoder;
  let chainCodeDecoder: ChainCodeDecoder;
  let resultsHeader: HTMLElement = document.createElement('h1');
  resultsHeader.id = 'results-header';
  document.body.appendChild(resultsHeader);
  let contentsImage: HTMLElement = document.createElement('img');
  contentsImage.id = 'contents-image';
  document.body.appendChild(contentsImage);
  let decodeButton: HTMLElement = document.createElement('button');
  decodeButton.id = 'decode-chain-code-button';
  document.body.appendChild(decodeButton);

  beforeEach(() => {
    badgeDecoder = new BadgeDecoder();
    crateDecoder = new CrateDecoder();
    chainCodeDecoder = new ChainCodeDecoder();
  });

  it("should decode listed badges", () => {
    const badge = badgeDecoder.decode(BadgeCode.Gayas_Microphone);
    expect(badge.name).toBe("Gaya's Microphone");
    expect(badge.description).toBe("You participated in the March 1, 2024 event and helped retrieve Gaya's Microphone.");
  });

  it("should decode unlisted badges", () => {
    const badge = badgeDecoder.decode(BadgeCode.Slicer);
    expect(badge.name).toBe("Slicer");
    expect(badge.description).toBe("You sure are a sneaky one. Raithe would be proud.");
  });

  it("should throw an error for unknown badges", () => {
    expect(() => badgeDecoder.decode("unknown")).toThrowError("unknown is an unknown badge");
  });

  it("should add badges to the earned set", () => {
    badgeDecoder.add(BadgeCode.Gayas_Microphone);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Gayas_Microphone)).toBe(true);
  });

  it("should remove badges from the earned set", () => {
    badgeDecoder.add(BadgeCode.Gayas_Microphone);
    badgeDecoder.remove(BadgeCode.Gayas_Microphone);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Gayas_Microphone)).toBe(false);
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

  it("should check for crate-related badges", () => {
    crateDecoder.setResult('JK_RS', badgeDecoder);
    crateDecoder.setResult('JK_TU', badgeDecoder);
    expect(crateDecoder.getTotalNumberOfType(CrateType.Relic)).toBe(2);
    expect(crateDecoder.getScannedNumberOfType(CrateType.Relic)).toBe(2);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Hunter)).toBe(true);
  });

  it("should check for chain code-related badges", () => {
    chainCodeDecoder.setChainCodeResult('LIGHT', badgeDecoder);
    chainCodeDecoder.setChainCodeResult('LIGHT', badgeDecoder);
    chainCodeDecoder.setChainCodeResult('LIGHT', badgeDecoder);
    chainCodeDecoder.setChainCodeResult('LIGHT', badgeDecoder);
    chainCodeDecoder.setChainCodeResult('LIGHT', badgeDecoder);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(true);
    expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
  });
});
