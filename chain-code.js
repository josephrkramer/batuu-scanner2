export const ChainCodeAlignment = Object.freeze({
    Dark: -1,
    Neutral: 0,
    Light: 1,
});

export class ChainCodePart {
    constructor({code, description, type, image}) {
        this.code=code;
        this.description=description;
        this.type=type;
        this.image=image;
    }
}

export class ChainCodeDecoder {
    scanCodeToChainCodePart = new Map();
    MIN_CHAIN_CODE_SIZE = 3;
    MAX_CHAIN_CODE_SIZE = 5;

    constructor() {
        this.scanCodeToChainCodePart.set('DARK1', new ChainCodePart({code: 'DARK1', description: 'Dark Side Alignment', type: ChainCodeAlignment.Dark}));
        this.scanCodeToChainCodePart.set('LIGHT', new ChainCodePart({code: 'LIGHT', description: 'Light Side Alignment', type: ChainCodeAlignment.Light}));
        this.scanCodeToChainCodePart.set('NEUTR', new ChainCodePart({code: 'NEUTR', description: 'Neutral Alignment', type: ChainCodeAlignment.Neutral}));
    }

    get MIN_CHAIN_CODE_SIZE() {
        return this.MIN_CHAIN_CODE_SIZE;
    }

    get MAX_CHAIN_CODE_SIZE() {
        return this.MAX_CHAIN_CODE_SIZE;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    getRandomImage() {
        const randomNum = this.getRandomInt(3) + 1;
        return `images/chaincode0${randomNum}.jpeg`;
    }

    decode(code) {
        console.log(`Decoding ${code}`);
        if (this.scanCodeToChainCodePart.has(code)) {
            const ccPart = this.scanCodeToChainCodePart.get(code);
            ccPart.image = this.getRandomImage();
            return ccPart;
        } else {
            throw new Error(`${code} is an unknown chaincode`);
        }
    }

    isValidChainCode(code) {
        return this.scanCodeToChainCodePart.has(code);
    }

    rawValue(chainCode) {
        let value = 0;
        for (const code of chainCode) {
            const chainCodePart = this.decode(code);
            value += chainCodePart.type;
        }
        return value;
    }
}

export function setChainCodeResult(code, chainCodeDecoder, chainCode) {
    console.log(`Valid Chain Code Detected: ${code}`);
    const chainCodePart = chainCodeDecoder.decode(code);

    displayChainCodeResult(chainCodePart);

    //add the item to the chainCode internal tracking
    chainCode.push(code);

    //store all of the scanned crates into local storage
    localStorage.chainCode = JSON.stringify(chainCode);

    checkDecodeButton(chainCode, chainCodeDecoder);
}

export function checkDecodeButton(chainCode, chainCodeDecoder) {
    console.log(`Chain code length: ${chainCode.length}`);
    if (chainCode.length >= chainCodeDecoder.MIN_CHAIN_CODE_SIZE) {
        const decodeButton = document.getElementById('decode-chain-code-button');
        decodeButton.style.display = 'block';
    }
}

function displayChainCodeResult(chainCodePart) {
    const resultsHeader = document.getElementById('results-header');
    const contentsImage = document.getElementById('contents-image');

    //update the display text for the item
    console.log(chainCodePart);
    //read parameters from the url
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
        resultsHeader.textContent = chainCodePart.code + " - Chain Code Piece";
    } else {
        resultsHeader.textContent = "Chain Code Piece";
    }
    resultsHeader.style.display = 'block';

    //display the image contents
    contentsImage.style.display = 'block';
    contentsImage.src = chainCodePart.image;
}
