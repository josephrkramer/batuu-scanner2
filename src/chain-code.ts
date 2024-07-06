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

export class ChainCodePart {
  code: string;
  description: string;
  value: number;
  image: string;

  constructor({ code = "", description = "", value = 0, image = "" }) {
    this.code = code;
    this.description = description;
    this.value = value;
    this.image = image;
  }
}

export const MIN_CHAIN_CODE_SIZE = 3;
export const MAX_CHAIN_CODE_SIZE = 5;
export const MEETING_TIME = "7:30pm";

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
      }),
    );
    this.scanCodeToChainCodePart.set(
      ChainCodeAlignmentCode.Light,
      new ChainCodePart({
        code: ChainCodeAlignmentCode.Light,
        description: "Light Side Alignment",
        value: ChainCodeAlignmentValue.Light,
      }),
    );
    this.scanCodeToChainCodePart.set(
      ChainCodeAlignmentCode.Neutral,
      new ChainCodePart({
        code: ChainCodeAlignmentCode.Neutral,
        description: "Neutral Alignment",
        value: ChainCodeAlignmentValue.Neutral,
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
    return `images/chaincode${randomNum}.jpg`;
  }

  decode(code: string): ChainCodePart {
    console.log(`Decoding ${code}`);
    if (this.scanCodeToChainCodePart.has(code)) {
      const ccPart = this.scanCodeToChainCodePart.get(code)!;
      const imgUrl = new URL(`../${this.getRandomImage()}`, import.meta.url)
        .href;
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
}

/*
export function displayChainCodeResult(chainCodePart: ChainCodePart) {
  const resultsHeader = document.getElementById("results-header")!;
  const contentsImage = document.getElementById(
    "contents-image",
  )! as HTMLImageElement;

  //update the display text for the item
  console.log(chainCodePart);
  //read parameters from the url
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("debug")) {
    resultsHeader.textContent = chainCodePart.code + " - Chain Code Piece";
  } else {
    resultsHeader.textContent = "Chain Code Piece";
  }
  resultsHeader.style.display = "block";

  //display the image contents
  contentsImage.style.display = "block";
  //chain code image has already been corrected by vite
  contentsImage.src = chainCodePart.image;
}
  */

/*
export function displayChainCodeValue(chainCodeDecoder: ChainCodeDecoder) {
  const chainCodeHeader = document.getElementById("chain-code-title")!;
  chainCodeHeader.textContent =
    "Chain Code Value: " + chainCodeDecoder.rawValue();

  const chainCodeMessage = document.getElementById("chain-code-message")!;
  if (chainCodeDecoder.chainCodeLength() < MAX_CHAIN_CODE_SIZE) {
    chainCodeMessage.textContent = `There are still more informants to contact, but make sure you meet with your AARC Agent at ${MEETING_TIME}`;
  } else {
    chainCodeMessage.textContent = `Well, done! You've met with all of our informants. Be ready to meet with your AARC Agent at ${MEETING_TIME}`;
  }
}
  */
