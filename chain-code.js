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
            value += chainCodePart.ChainCodeAlignment;
        }
        return value;
    }
}