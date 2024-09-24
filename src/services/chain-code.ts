import { BadgeDecoder } from "./badge-decoder";

export const ChainCodeAlignmentValue = Object.freeze({
  Dark: -1,
  Neutral: 0,
  Light: 1,
});

export const ChainCodeAlignmentCode = Object.freeze({
  Dark: "DARK1",
  Neutral: "NEUTR",
  Light: "LIGHT",
});

export const ChainCodeAlignmentString = Object.freeze({
  Dark: "First Order",
  Neutral: "Cause",
  Light: "Light",
});

export class ChainCodePart {
  code: string;
  description: string;
  value: number;
  image: string;
  aztec: string;

  constructor({
    code = "",
    description = "",
    value = 0,
    image = "",
    aztec = "",
  }) {
    this.code = code;
    this.description = description;
    this.value = value;
    this.image = image;
    this.aztec = aztec;
  }
}

export const MIN_CHAIN_CODE_SIZE = 3;
export const MAX_CHAIN_CODE_SIZE = 5;
export const THURS_MEETING_TIME = "7:50pm";
export const SUN_MEETING_TIME = "10:50pm";

export class ChainCodeDecoder {
  scanCodeToChainCodePart = new Map<string, ChainCodePart>();
  //load chainCode from local storage
  chainCode: ChainCodePart[];
  renderChainCodePieceCallback: (chainCodePart: ChainCodePart) => void;
  setChainCodeCallback: (chainCode: ChainCodePart[]) => void;

  constructor(
    chainCode: ChainCodePart[],
    renderChainCodePieceCallback: (chainCodePart: ChainCodePart) => void,
    setChainCodeCallback: (chainCode: ChainCodePart[]) => void,
  ) {
    this.chainCode = chainCode;
    this.renderChainCodePieceCallback = renderChainCodePieceCallback;
    this.setChainCodeCallback = setChainCodeCallback;

    this.scanCodeToChainCodePart.set(
      ChainCodeAlignmentCode.Dark,
      new ChainCodePart({
        code: ChainCodeAlignmentCode.Dark,
        description: "Dark Side Alignment",
        value: ChainCodeAlignmentValue.Dark,
        aztec: `./aztec/${ChainCodeAlignmentCode.Dark}.png`,
      }),
    );
    this.scanCodeToChainCodePart.set(
      ChainCodeAlignmentCode.Light,
      new ChainCodePart({
        code: ChainCodeAlignmentCode.Light,
        description: "Light Side Alignment",
        value: ChainCodeAlignmentValue.Light,
        aztec: `./aztec/${ChainCodeAlignmentCode.Light}.png`,
      }),
    );
    this.scanCodeToChainCodePart.set(
      ChainCodeAlignmentCode.Neutral,
      new ChainCodePart({
        code: ChainCodeAlignmentCode.Neutral,
        description: "Neutral Alignment",
        value: ChainCodeAlignmentValue.Neutral,
        aztec: `./aztec/${ChainCodeAlignmentCode.Neutral}.png`,
      }),
    );
  }

  reset(): void {
    this.chainCode = new Array<ChainCodePart>();
    this.setChainCodeCallback(new Array<ChainCodePart>());
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  getRandomImage() {
    const randomNum = this.getRandomInt(8) + 1;
    return `../chaincode${randomNum}.jpg`;
  }

  decode(code: string): ChainCodePart {
    console.log(`Decoding ${code}`);
    if (this.scanCodeToChainCodePart.has(code)) {
      const ccPart = this.scanCodeToChainCodePart.get(code)!;
      const imgUrl = new URL(`${this.getRandomImage()}`, import.meta.url).href;
      ccPart.image = imgUrl;
      return ccPart;
    } else {
      throw new Error(`${code} is an unknown chaincode`);
    }
  }

  isValidChainCode(code: string): boolean {
    return this.scanCodeToChainCodePart.has(code);
  }

  chainCodeLength(): number {
    return this.chainCode.length;
  }

  rawValue(): number {
    let value = 0;
    for (const chainCodePart of this.chainCode) {
      value += chainCodePart.value;
    }
    return value;
  }

  chainCodeAlignment(): string {
    if (this.rawValue() >= 3) {
      return ChainCodeAlignmentString.Light;
    } else if (this.rawValue() <= -3) {
      return ChainCodeAlignmentString.Dark;
    } else {
      return ChainCodeAlignmentString.Neutral;
    }
  }

  setChainCodeResult(code: string, badgeDecoder: BadgeDecoder) {
    console.log(`Valid Chain Code Detected: ${code}`);
    const chainCodePart = this.decode(code);

    this.renderChainCodePieceCallback(chainCodePart);

    //add the item to the chainCode internal tracking
    const tempChainCode = this.chainCode.concat([chainCodePart]);
    this.chainCode = tempChainCode;
    this.setChainCodeCallback(tempChainCode);

    badgeDecoder.checkForChainCodeRelatedBadges(this);
    badgeDecoder.checkForEventRelatedBadges();
  }

  adminChainCode(): ChainCodePart[] {
    return Array.from(this.scanCodeToChainCodePart.values());
  }
}
