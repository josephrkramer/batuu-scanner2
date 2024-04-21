import { CrateContents, CrateDecoder, CrateType } from "../src/crate-decoder";
import { BadgeDecoder } from "../src/badge-decoder";
import { beforeEach, describe, expect, it, vitest } from "vitest";

describe("CrateDecoder", () => {
  let badgeDecoder: BadgeDecoder = new BadgeDecoder();
  let crateDecoder: CrateDecoder = new CrateDecoder();
  let resultsHeader: HTMLElement = document.createElement("h1");
  resultsHeader.id = "results-header";
  document.body.appendChild(resultsHeader);
  let contentsImage: HTMLElement = document.createElement("img");
  contentsImage.id = "contents-image";
  document.body.appendChild(contentsImage);
  let decodeButton: HTMLElement = document.createElement("button");
  decodeButton.id = "decode-chain-code-button";
  document.body.appendChild(decodeButton);

  beforeEach(() => {
    badgeDecoder.reset();
    crateDecoder.reset();
  });

  it("should decode a valid crate code", () => {
    const crate = crateDecoder.decode("CAST09");
    expect(crate.code).toBe("CAST09");
    expect(crate.contents).toBe("Training Remote");
    expect(crate.type).toBe("Halcyon Cargo");
  });

  it("should return unknown for an invalid crate code", () => {
    const crate = crateDecoder.decode("INVALID");
    expect(crate.code).toBe("?????");
    expect(crate.contents).toBe("Unknown contents");
    expect(crate.type).toBe("Unknown");
  });

  it("should override a crate's contents", () => {
    crateDecoder.override(
      new CrateContents({
        code: "JK_RS",
        contents: "Evan's Manifesto",
        type: "Relic",
        image: "images/halcyon_cargo.jpeg",
      }),
    );
    const crate = crateDecoder.decode("JK_RS");
    expect(crate.code).toBe("JK_RS");
    expect(crate.contents).toBe("Evan's Manifesto");
    expect(crate.type).toBe("Relic");
  });

  it("should check if a crate has been scanned", () => {
    expect(crateDecoder.hasCrate("CAST09")).toBe(false);
    crateDecoder.addToScanned("CAST09");
    expect(crateDecoder.hasCrate("CAST09")).toBe(true);
  });

  it("should reset the scanned crates", () => {
    crateDecoder.addToScanned("CAST09");
    crateDecoder.reset();
    expect(crateDecoder.hasCrate("CAST09")).toBe(false);
  });

  it("should sort the cargo hold by type", () => {
    crateDecoder.addToScanned("CAST09");
    crateDecoder.addToScanned("BC_ST");
    crateDecoder.addToScanned("FG_RS");
    const sortedCargoHold = crateDecoder.sortCargoHold();
    expect(sortedCargoHold.size).toBe(3);
    expect(sortedCargoHold.get("Halcyon Cargo")!.size).toBe(1);
    expect(sortedCargoHold.get("Outfit")!.size).toBe(1);
    expect(sortedCargoHold.get("Weapon")!.size).toBe(1);
  });

  it("should get the total number of a type of crate", () => {
    expect(crateDecoder.getTotalNumberOfType(CrateType.Halcyon_Cargo)).toBe(13);
    expect(crateDecoder.getTotalNumberOfType(CrateType.Outfit)).toBe(18);
    expect(crateDecoder.getTotalNumberOfType(CrateType.Weapon)).toBe(21);
  });

  it("should get the scanned number of a type of crate", () => {
    crateDecoder.addToScanned("CAST09");
    crateDecoder.addToScanned("BC_ST");
    crateDecoder.addToScanned("FG_RS");
    expect(crateDecoder.getScannedNumberOfType("Halcyon Cargo")).toBe(1);
    expect(crateDecoder.getScannedNumberOfType("Outfit")).toBe(1);
    expect(crateDecoder.getScannedNumberOfType("Weapon")).toBe(1);
  });

  it("should set the result and call the badge decoder", () => {
    const setResultSpy = vitest.spyOn(crateDecoder, "setResult");
    const checkForCrateRelatedBadgesSpy = vitest.spyOn(
      badgeDecoder,
      "checkForCrateRelatedBadges",
    );
    crateDecoder.setResult("CAST09", badgeDecoder);
    expect(setResultSpy).toHaveBeenCalledWith("CAST09", badgeDecoder);
    expect(checkForCrateRelatedBadgesSpy).toHaveBeenCalledWith(
      "CAST09",
      crateDecoder,
    );
  });
});
