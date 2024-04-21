import { BadgeDecoder } from "./badge-decoder";

export const ChainCodeAlignment = Object.freeze({
  Dark: -1,
  Neutral: 0,
  Light: 1,
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

export class ChainCodeDecoder {
  scanCodeToChainCodePart = new Map<string, ChainCodePart>();
  MIN_CHAIN_CODE_SIZE = 3;
  MAX_CHAIN_CODE_SIZE = 5;
  MEETING_TIME = "7:30pm";
  //load chainCode from local storage
  chainCode = new Array<string>();

  constructor() {
    this.scanCodeToChainCodePart.set(
      "DARK1",
      new ChainCodePart({
        code: "DARK1",
        description: "Dark Side Alignment",
        value: ChainCodeAlignment.Dark,
      }),
    );
    this.scanCodeToChainCodePart.set(
      "LIGHT",
      new ChainCodePart({
        code: "LIGHT",
        description: "Light Side Alignment",
        value: ChainCodeAlignment.Light,
      }),
    );
    this.scanCodeToChainCodePart.set(
      "NEUTR",
      new ChainCodePart({
        code: "NEUTR",
        description: "Neutral Alignment",
        value: ChainCodeAlignment.Neutral,
      }),
    );

    if (localStorage.chainCode !== undefined) {
      this.chainCode = new Array<string>(JSON.parse(localStorage.chainCode));
      console.log(`Chain code instantiated from local storage:`);
      console.log(this.chainCode);
    }

    //check if the decode button should be enabled after an initial load from local storage
    this.checkDecodeButton();
  }

  reset(): void {
    this.chainCode = new Array<string>();
    localStorage.removeItem("chainCode");
    this.checkDecodeButton();
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
    for (const code of this.chainCode) {
      const chainCodePart = this.decode(code);
      value += chainCodePart.value;
    }
    return value;
  }

  checkDecodeButton(): void {
    console.log(`Chain code length: ${this.chainCode.length}`);
    if (this.chainCode.length >= this.MIN_CHAIN_CODE_SIZE) {
      const decodeButton = document.getElementById("decode-chain-code-button")!;
      decodeButton.style.display = "block";
    }
  }

  setChainCodeResult(code: string, badgeDecoder: BadgeDecoder) {
    console.log(`Valid Chain Code Detected: ${code}`);
    const chainCodePart = this.decode(code);

    displayChainCodeResult(chainCodePart);

    //add the item to the chainCode internal tracking
    this.chainCode.push(code);

    //store all of the scanned crates into local storage
    localStorage.chainCode = JSON.stringify(this.chainCode);

    this.checkDecodeButton();
    badgeDecoder.checkForChainCodeRelatedBadges(this);
  }
}

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

export function displayChainCodeValue(chainCodeDecoder: ChainCodeDecoder) {
  const chainCodeHeader = document.getElementById("chain-code-title")!;
  chainCodeHeader.textContent =
    "Chain Code Value: " + chainCodeDecoder.rawValue();

  const chainCodeMessage = document.getElementById("chain-code-message")!;
  if (
    chainCodeDecoder.chainCodeLength() < chainCodeDecoder.MAX_CHAIN_CODE_SIZE
  ) {
    chainCodeMessage.textContent = `There are still more informants to contact, but make sure you meet with your AARC Agent at ${chainCodeDecoder.MEETING_TIME}`;
  } else {
    chainCodeMessage.textContent = `Well, done! You've met with all of our informants. Be ready to meet with your AARC Agent at ${chainCodeDecoder.MEETING_TIME}`;
  }
}
