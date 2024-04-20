import { BadgeCode, BadgeDecoder } from "../src/badge-decoder";
//import { CrateDecoder } from "../src/crate-decoder";
import { beforeEach, describe, expect, it } from 'vitest';

// Tests for the BadgeDecoder class

describe("BadgeDecoder", () => {
  let badgeDecoder: BadgeDecoder;

  beforeEach(() => {
    badgeDecoder = new BadgeDecoder();
  });

  describe("decode", () => {
    it("should decode a listed unearned badge", () => {
      const badge = badgeDecoder.decode(BadgeCode.Gayas_Microphone);
      expect(badge.code).toBe(BadgeCode.Gayas_Microphone);
      expect(badge.name).toBe("Gaya's Microphone");
      expect(badge.description).toBe("You participated in the March 1, 2024 event and helped retrieve Gaya's Microphone.");
      expect(badge.image).toBe("images/badge/unearned-bw.jpeg");
    });

    it("should decode a listed earned badge", () => {
        badgeDecoder.add(BadgeCode.Gayas_Microphone);
        const badge = badgeDecoder.decode(BadgeCode.Gayas_Microphone);
        expect(badge.code).toBe(BadgeCode.Gayas_Microphone);
        expect(badge.name).toBe("Gaya's Microphone");
        expect(badge.description).toBe("You participated in the March 1, 2024 event and helped retrieve Gaya's Microphone.");
        expect(badge.image).toBe("images/badge/gaya-mic.jpeg");
      });

    it("should decode an unlisted badge", () => {
      const badge = badgeDecoder.decode(BadgeCode.Slicer);
      expect(badge.code).toBe(BadgeCode.Slicer);
      expect(badge.name).toBe("Slicer");
      expect(badge.description).toBe("You sure are a sneaky one. Raithe would be proud.");
      expect(badge.image).toBe("images/badge/slicer.jpeg");
    });

    it("should throw an error for an unknown code", () => {
      expect(() => badgeDecoder.decode("XXXXX")).toThrowError("XXXXX is an unknown badge");
    });
  });

  describe("add", () => {
    it("should add a badge to the earned badges set", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Gayas_Microphone)).toBe(true);
    });

    it("should update local storage with the new earned badges set", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      expect(localStorage.getItem("badges")).toBe(JSON.stringify([BadgeCode.Gayas_Microphone]));
    });

    //jsdom does not allow modification of window.location. See https://www.benmvp.com/blog/mocking-window-location-methods-jest-jsdom/ 
    /*it("should add the badge to the url if not already in url", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      const urlParams = new URLSearchParams(window.location.search);
      expect(urlParams.getAll("b")).toContain(BadgeCode.Gayas_Microphone);
    });*/
  });

  describe("remove", () => {
    it("should remove a badge from the earned badges set", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      badgeDecoder.remove(BadgeCode.Gayas_Microphone);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Gayas_Microphone)).toBe(false);
    });

    it("should update local storage with the new earned badges set", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      badgeDecoder.remove(BadgeCode.Gayas_Microphone);
      expect(localStorage.getItem("badges")).toBe(JSON.stringify([]));
    });

    it("should remove the badge from the url if in url", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      badgeDecoder.remove(BadgeCode.Gayas_Microphone);
      const urlParams = new URLSearchParams(window.location.search);
      expect(urlParams.getAll("b")).not.toContain(BadgeCode.Gayas_Microphone);
    });
  });

  describe("allKeys", () => {
    it("should return all possible listed badges + all earned unlisted badges", () => {
      badgeDecoder.add(BadgeCode.Slicer);
      expect(badgeDecoder.allKeys()).toEqual(new Set([BadgeCode.Gayas_Microphone, BadgeCode.Relic_Hunter, BadgeCode.Well_Connected, BadgeCode.Resistance_Hero, BadgeCode.We_Have_Cookies, BadgeCode.Slicer]));
    });
  });

  describe("reset", () => {
    it("should clear the earned badges set", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      badgeDecoder.reset();
      expect(badgeDecoder.earnedBadges.size).toBe(0);
    });

    it("should remove the badges from local storage", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      badgeDecoder.reset();
      expect(localStorage.getItem("badges")).toBe(null);
    });

    it("should remove the badges from the url", () => {
      badgeDecoder.add(BadgeCode.Gayas_Microphone);
      badgeDecoder.reset();
      const urlParams = new URLSearchParams(window.location.search);
      expect(urlParams.getAll("b")).toEqual([]);
    });
  });

  /*
  describe("checkForCrateRelatedBadges", () => {
    it("should add the Relic Hunter badge if all Relic crates are scanned", () => {
      const crateDecoder = new CrateDecoder();
      crateDecoder.addCrate("Relic", "12345");
      crateDecoder.addCrate("Relic", "67890");
      badgeDecoder.checkForCrateRelatedBadges("12345", new Set(["12345"]), crateDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Hunter)).toBe(true);
    });

    it("should not add the Relic Hunter badge if not all Relic crates are scanned", () => {
      const crateDecoder = new CrateDecoder();
      crateDecoder.addCrate("Relic", "12345");
      crateDecoder.addCrate("Relic", "67890");
      badgeDecoder.checkForCrateRelatedBadges("12345", new Set(["12345"]), crateDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Relic_Hunter)).toBe(false);
    });

    it("should add the Amnesiac badge if the same crate is scanned again", () => {
      badgeDecoder.checkForCrateRelatedBadges("12345", new Set(["12345"]), new CrateDecoder());
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Amnesiac)).toBe(true);
    });
  });

  describe("checkForChainCodeRelatedBadges", () => {
    it("should add the Well Connected badge if all NPCs are visited", () => {
      const chainCodeDecoder = new ChainCodeDecoder();
      chainCodeDecoder.addChainCode("12345");
      chainCodeDecoder.addChainCode("67890");
      badgeDecoder.checkForChainCodeRelatedBadges("1234567890", chainCodeDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(true);
    });

    it("should not add the Well Connected badge if not all NPCs are visited", () => {
      const chainCodeDecoder = new ChainCodeDecoder();
      chainCodeDecoder.addChainCode("12345");
      badgeDecoder.checkForChainCodeRelatedBadges("12345", chainCodeDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Well_Connected)).toBe(false);
    });

    it("should add the Resistance Hero badge if only light side codes are used", () => {
      const chainCodeDecoder = new ChainCodeDecoder();
      chainCodeDecoder.addChainCode("12345");
      badgeDecoder.checkForChainCodeRelatedBadges("12345", chainCodeDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(true);
    });

    it("should not add the Resistance Hero badge if dark side codes are used", () => {
      const chainCodeDecoder = new ChainCodeDecoder();
      chainCodeDecoder.addChainCode("-12345");
      badgeDecoder.checkForChainCodeRelatedBadges("-12345", chainCodeDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.Resistance_Hero)).toBe(false);
    });

    it("should add the We Have Cookies badge if only dark side codes are used", () => {
      const chainCodeDecoder = new ChainCodeDecoder();
      chainCodeDecoder.addChainCode("-12345");
      badgeDecoder.checkForChainCodeRelatedBadges("-12345", chainCodeDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(true);
    });

    it("should not add the We Have Cookies badge if light side codes are used", () => {
      const chainCodeDecoder = new ChainCodeDecoder();
      chainCodeDecoder.addChainCode("12345");
      badgeDecoder.checkForChainCodeRelatedBadges("12345", chainCodeDecoder);
      expect(badgeDecoder.earnedBadges.has(BadgeCode.We_Have_Cookies)).toBe(false);
    });
  });
  */
});
