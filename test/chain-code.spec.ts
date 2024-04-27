import { ChainCodeAlignmentCode, ChainCodeDecoder } from "../src/chain-code";
import { BadgeDecoder } from "../src/badge-decoder";
import { beforeEach, describe, expect, it, vitest } from "vitest";

describe("ChainCodeDecoder", () => {
  const badgeDecoder: BadgeDecoder = new BadgeDecoder();
  const chainCodeDecoder: ChainCodeDecoder = new ChainCodeDecoder();
  const resultsHeader: HTMLElement = document.createElement("h1");
  resultsHeader.id = "results-header";
  document.body.appendChild(resultsHeader);
  const contentsImage: HTMLElement = document.createElement("img");
  contentsImage.id = "contents-image";
  document.body.appendChild(contentsImage);
  const decodeButton: HTMLElement = document.createElement("button");
  decodeButton.id = "decode-chain-code-button";
  decodeButton.style.display = "none";
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
    chainCodeDecoder.reset();
  });

  it("should decode a valid chain code", () => {
    const chainCodePart = chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark);
    expect(chainCodePart.code).toBe(ChainCodeAlignmentCode.Dark);
    expect(chainCodePart.description).toBe("Dark Side Alignment");
    expect(chainCodePart.value).toBe(-1);
    expect(chainCodePart.image).toContain("images/chaincode");
  });

  it("should return unknown for an invalid chain code", () => {
    expect(() => chainCodeDecoder.decode("INVALID")).toThrowError(
      "INVALID is an unknown chaincode",
    );
  });

  it("should check if a chain code is valid", () => {
    expect(chainCodeDecoder.isValidChainCode(ChainCodeAlignmentCode.Dark)).toBe(
      true,
    );
    expect(chainCodeDecoder.isValidChainCode("INVALID")).toBe(false);
  });

  it("should get the length of the chain code", () => {
    expect(chainCodeDecoder.chainCodeLength()).toBe(0);
    chainCodeDecoder.setChainCodeResult(
      ChainCodeAlignmentCode.Dark,
      badgeDecoder,
    );
    expect(chainCodeDecoder.chainCodeLength()).toBe(1);
  });

  it("should get the raw value of the chain code", () => {
    expect(chainCodeDecoder.rawValue()).toBe(0);
    chainCodeDecoder.setChainCodeResult(
      ChainCodeAlignmentCode.Dark,
      badgeDecoder,
    );
    expect(chainCodeDecoder.rawValue()).toBe(-1);
  });

  it("should check if the decode button should be enabled", () => {
    const decodeButton = document.getElementById("decode-chain-code-button")!;
    expect(decodeButton.style.display).toBe("none");
    for (let i = 0; i < chainCodeDecoder.MIN_CHAIN_CODE_SIZE; i++) {
      chainCodeDecoder.setChainCodeResult(
        ChainCodeAlignmentCode.Dark,
        badgeDecoder,
      );
    }
    expect(decodeButton.style.display).toBe("block");
  });

  it("should set the chain code result and call the badge decoder", () => {
    const setChainCodeResultSpy = vitest.spyOn(
      chainCodeDecoder,
      "setChainCodeResult",
    );
    const checkForChainCodeRelatedBadgesSpy = vitest.spyOn(
      badgeDecoder,
      "checkForChainCodeRelatedBadges",
    );
    chainCodeDecoder.setChainCodeResult(
      ChainCodeAlignmentCode.Dark,
      badgeDecoder,
    );
    expect(setChainCodeResultSpy).toHaveBeenCalledWith(
      ChainCodeAlignmentCode.Dark,
      badgeDecoder,
    );
    expect(checkForChainCodeRelatedBadgesSpy).toHaveBeenCalledWith(
      chainCodeDecoder,
    );
  });
});
