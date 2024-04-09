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

    constructor() {
        this.scanCodeToChainCodePart.set('DARK1', new ChainCodePart({code: 'DARK1', description: 'Dark Side Alignment', type: ChainCodeAlignment.Dark}));
        this.scanCodeToChainCodePart.set('LIGHT', new ChainCodePart({code: 'LIGHT', contents: 'Light Side Alignment', type: ChainCodeAlignment.Light}));
        this.scanCodeToChainCodePart.set('NEUTR', new ChainCodePart({code: 'NEUTR', contents: 'Neutral Alignment', type: ChainCodeAlignment.Neutral}));
    }

    decode(code) {
        if (this.scanCodeToChainCodePart.has(code)) {
            return this.scanCodeToChainCodePart.get(code);
        } else {
            throw new Error(`${code} is an unknown chaincode`);
        }
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