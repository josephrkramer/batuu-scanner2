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
    chainCode = new Array();

    constructor() {
        this.scanCodeToChainCodePart.set('DARK1', new ChainCodePart({code: 'DARK1', description: 'Dark Side Alignment', type: ChainCodeAlignment.Dark}));
        this.scanCodeToChainCodePart.set('LIGHT', new ChainCodePart({code: 'LIGHT', contents: 'Light Side Alignment', type: ChainCodeAlignment.Light}));
        this.scanCodeToChainCodePart.set('NEUTR', new ChainCodePart({code: 'NEUTR', contents: 'Neutral Alignment', type: ChainCodeAlignment.Neutral}));
    }

    add(code) {
        if (this.scanCodeToChainCodePart.has(code)) {
            const chainCodePart = this.scanCodeToChainCodePart.get(code);
            this.chainCode.push(chainCodePart);
            return chainCodePart;
        } else {
            throw new Error(`${code} is an unknown chaincode`);
        }
    }

    decode() {
        //Figure out how to interpret the raw summary
        return this.rawValue();
    }

    rawValue() {
        let value = 0;
        for (const chainCodePart of this.chainCode) {
            value += chainCodePart.ChainCodeAlignment;
        }
        return value;
    }
}