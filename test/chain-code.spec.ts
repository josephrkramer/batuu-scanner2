import { BadgeDecoder } from "../src/services/badge-decoder";
import {
  ChainCodeAlignmentCode,
  ChainCodeAlignmentString,
  ChainCodeAlignmentValue,
  ChainCodeDecoder,
} from "../src/services/chain-code";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { beforeEach, describe, expect, it, vitest } from "vitest";

dayjs.extend(customParseFormat);

describe("ChainCodeDecoder", () => {
  let chainCodeDecoder: ChainCodeDecoder;
  let chainCode: ChainCodeDecoder["chainCode"];
  let renderChainCodePieceCallback: ChainCodeDecoder["renderChainCodePieceCallback"];
  let setChainCodeCallback: ChainCodeDecoder["setChainCodeCallback"];

  beforeEach(() => {
    chainCode = [];
    renderChainCodePieceCallback = vitest.fn();
    setChainCodeCallback = vitest.fn();
    chainCodeDecoder = new ChainCodeDecoder(
      chainCode,
      renderChainCodePieceCallback,
      setChainCodeCallback,
    );
  });

  it("should decode a known chain code", () => {
    const chainCodePart = chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark);
    expect(chainCodePart.code).toBe(ChainCodeAlignmentCode.Dark);
    expect(chainCodePart.description).toBe("Dark Side Alignment");
    expect(chainCodePart.value).toBe(ChainCodeAlignmentValue.Dark);
  });

  it("should throw an error for an unknown chain code", () => {
    expect(() => chainCodeDecoder.decode("invalid_code")).toThrowError(
      "invalid_code is an unknown chaincode",
    );
  });

  it("should check if a chain code is valid", () => {
    expect(chainCodeDecoder.isValidChainCode(ChainCodeAlignmentCode.Dark)).toBe(
      true,
    );
    expect(chainCodeDecoder.isValidChainCode("invalid_code")).toBe(false);
  });

  it("should return the length of the chain code", () => {
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
    ];
    expect(chainCodeDecoder.chainCodeLength()).toBe(2);
  });

  it("should return the raw value of the chain code", () => {
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
    ];
    expect(chainCodeDecoder.rawValue()).toBe(0);
  });

  it("should set the chain code result", () => {
    const badgeDecoder = new BadgeDecoder(
      undefined,
      vitest.fn(),
      vitest.fn(),
      new Map(),
      vitest.fn(),
    );
    chainCodeDecoder.setChainCodeResult(
      ChainCodeAlignmentCode.Dark,
      badgeDecoder,
    );
    expect(renderChainCodePieceCallback).toHaveBeenCalledWith(
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
    );
    expect(setChainCodeCallback).toHaveBeenCalledWith([
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
    ]);
  });

  it("should reset the chain code", () => {
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
    ];
    chainCodeDecoder.reset();
    expect(setChainCodeCallback).toHaveBeenCalledWith([]);
  });

  it("should return the correct alignment for a light side chain code", () => {
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
    ];
    expect(chainCodeDecoder.chainCodeAlignment()).toBe(
      ChainCodeAlignmentString.Light,
    );
  });

  it("should return the correct alignment for a dark side chain code", () => {
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
    ];
    expect(chainCodeDecoder.chainCodeAlignment()).toBe(
      ChainCodeAlignmentString.Dark,
    );
  });

  it("should return the correct alignment for a neutral side chain code", () => {
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
    ];
    expect(chainCodeDecoder.chainCodeAlignment()).toBe(
      ChainCodeAlignmentString.Neutral,
    );
  });

  it("should return the correct alignment for a mixed side chain code", () => {
    chainCodeDecoder.chainCode = [
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Light),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
      chainCodeDecoder.decode(ChainCodeAlignmentCode.Dark),
    ];
    expect(chainCodeDecoder.chainCodeAlignment()).toBe(
      ChainCodeAlignmentString.Neutral,
    );
  });
});
