import { BadgeDecoder } from "../src/badge-decoder";
import { CrateContents, CrateDecoder, CrateType } from "../src/crate-decoder";
import { beforeEach, describe, expect, it, vitest } from "vitest";

describe("CrateDecoder", () => {
  let crateDecoder: CrateDecoder;
  let scannedCrates: Set<string>;
  let setScannedCrates: CrateDecoder["setScannedCrates"];
  let multipleChoiceScannedCrates: Map<string, CrateContents>;
  let setMultipleChoiceScannedCrates: CrateDecoder["setMultipleChoiceScannedCrates"];
  let renderMultipleChoiceCrateCode: CrateDecoder["renderMultipleChoiceCrateCode"];
  let setRenderMultipleChoiceCrateCode: CrateDecoder["setRenderMultipleChoiceCrateCode"];
  let setCrateToDisplay: CrateDecoder["setCrateToDisplay"];
  let badgeDecoder: BadgeDecoder;
  let earnedBadges: BadgeDecoder["earnedBadges"];
  let newBadgesEarned: BadgeDecoder["newBadgesEarned"];
  let setNewBadgesEarned: BadgeDecoder["setNewBadgesEarned"];
  let displayLogoCallback: BadgeDecoder["displayLogoCallback"];
  let setEarnedBadges: BadgeDecoder["setEarnedBadges"];

  beforeEach(() => {
    scannedCrates = new Set();
    setScannedCrates = vitest.fn();
    multipleChoiceScannedCrates = new Map();
    setMultipleChoiceScannedCrates = vitest.fn();
    renderMultipleChoiceCrateCode = undefined;
    setRenderMultipleChoiceCrateCode = vitest.fn();
    setCrateToDisplay = vitest.fn();
    crateDecoder = new CrateDecoder(
      scannedCrates,
      setScannedCrates,
      multipleChoiceScannedCrates,
      setMultipleChoiceScannedCrates,
      renderMultipleChoiceCrateCode,
      setRenderMultipleChoiceCrateCode,
      setCrateToDisplay,
    );
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

  it("should decode a known crate code", () => {
    const crateContents = crateDecoder.decode("CAST09");
    expect(crateContents.code).toBe("CAST09");
    expect(crateContents.contents).toBe("Training Remote");
    expect(crateContents.type).toBe(CrateType.Halcyon_Cargo);
  });

  it("should return undefined for an unknown crate code", () => {
    const crateContents = crateDecoder.decode("invalid_code");
    expect(crateContents).toEqual(
      new CrateContents({
        code: "?????",
        contents: "Unknown contents",
        type: CrateType.Unknown,
      }),
    );
  });

  describe.skip("this check passes through local storage", () => {
    it("should add a crate to the scanned crates set", () => {
      crateDecoder.setResult("CAST09", badgeDecoder);
      expect(scannedCrates.has("CAST09")).toBe(true);
    });
  });

  it("should get the total number of crates of a specific type", () => {
    expect(crateDecoder.getTotalNumberOfType(CrateType.Halcyon_Cargo)).toBe(13);
  });

  it("should get the scanned number of crates of a specific type", () => {
    crateDecoder.scannedCrates.add("CAST09");
    expect(crateDecoder.getScannedNumberOfType(CrateType.Halcyon_Cargo)).toBe(
      1,
    );
  });

  it("should check if a crate has been scanned", () => {
    crateDecoder.scannedCrates.add("CAST09");
    expect(crateDecoder.hasCrate("CAST09")).toBe(true);
    expect(crateDecoder.hasCrate("invalid_code")).toBe(false);
  });

  it("should set the crate to display", () => {
    const crateContents = crateDecoder.decode("CAST09");
    crateDecoder.setCrateToDisplay(crateContents);
    expect(setCrateToDisplay).toHaveBeenCalledWith(crateContents);
  });

  it("should set the render multiple choice crate code", () => {
    crateDecoder.setRenderMultipleChoiceCrateCode("CAST09");
    expect(setRenderMultipleChoiceCrateCode).toHaveBeenCalledWith("CAST09");
  });

  it("should set the multiple choice scanned crates", () => {
    const crateContents = crateDecoder.decode("CAST09");
    crateDecoder.setMultipleChoiceScannedCrates(
      new Map([["CAST09", crateContents]]),
    );
    expect(setMultipleChoiceScannedCrates).toHaveBeenCalledWith(
      new Map([["CAST09", crateContents]]),
    );
  });
});
