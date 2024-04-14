export class Badge {
    constructor({code, name, description, image}) {
        this.code=code;
        this.name=name;
        this.description=description;
        this.image=image;
    }
}

export class BadgeDecoder {
    codeToBadge = new Map();

    constructor() {
        
    }
}