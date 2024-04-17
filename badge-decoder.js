import { CrateType } from "./crate-decoder.js";

export const BadgeCode = Object.freeze({
    Gayas_Microphone: '31nne',
    Relic_Hunter: '5y7ms',
    Well_Connected: 'kupy4',
    Slicer: 'ocu62',
    Amnesiac: 'k9zh0',
});

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
    unlistedCodeToBadge = new Map();
    earnedBadges = new Set();

    constructor() {
        //listed badges
        this.codeToBadge.set(BadgeCode.Gayas_Microphone, new Badge({code: BadgeCode.Gayas_Microphone, name: "Gaya's Microphone", description: "You participated in the March 1, 2024 event and helped retrieve Gaya's Microphone.", image: 'images/badge/gaya-mic.jpeg'}));
        this.codeToBadge.set(BadgeCode.Relic_Hunter, new Badge({code: BadgeCode.Relic_Hunter, name: "Relic Hunter", description: "You found all of the AARC relics hidden in the crates on Batuu.", image: 'images/badge/relic-hunter.jpeg'}));
        this.codeToBadge.set(BadgeCode.Well_Connected, new Badge({code: BadgeCode.Well_Connected, name: "Well Connected", description: "You interacted with every informant during the event.", image: 'images/badge/well-connected.jpeg'}));

        //unlisted badges
        this.unlistedCodeToBadge.set(BadgeCode.Slicer, new Badge({code: BadgeCode.Slicer, name: "Slicer", description: "You sure are a sneaky one. Raithe would be proud.", image: 'images/badge/slicer.jpeg'}));
        this.unlistedCodeToBadge.set(BadgeCode.Amnesiac, new Badge({code: BadgeCode.Amnesiac, name: "Amnesiac", description: "What were you expecting? It's the same space junk in the box every time.", image: 'images/badge/amnesiac.jpeg'}));

        const urlParams = new URLSearchParams(window.location.search);
        for (const code of urlParams.getAll('b')) {
            this.earnedBadges.add(code);
        }
    }

    decode(code) {
        console.log(`Decoding ${code}`);
        if (this.codeToBadge.has(code)) {
            //Cloning the badge so we can overwrite the image value without altering the original
            const cloneBadge = structuredClone(this.codeToBadge.get(code));
            if (!this.earnedBadges.has(code)) {
                cloneBadge.image = 'images/badge/unearned-bw.jpeg';
            }
            return cloneBadge;
        } else if (this.unlistedCodeToBadge.has(code)) {
            return this.unlistedCodeToBadge.get(code);
        } else {
            throw new Error(`${code} is an unknown badge`);
        }
    }

    add(code) {
        console.log(`Badge ${code} earned`);
        this.earnedBadges.add(code);

        //Add the badge to the url
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.append('b', code);
        window.location.search = urlParams;
    }

    allKeys() {
        //all possible listed badges + all earned unlisted badges
        return new Set([...this.codeToBadge.keys(),...this.earnedBadges]);
    }

    reset() {
        this.earnedBadges.clear();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('b');
        window.location.search = urlParams;
    }

    checkForCrateRelatedBadges(crateCode, scannedCrates, crateDecoder) {
        //Relic Hunter - all Relic "overridden" crates
        console.log(`Checking for ${CrateType.Relic} badge`);
        if (!this.earnedBadges.has(BadgeCode.Relic_Hunter) && crateDecoder.getTotalNumberOfType(CrateType.Relic) === crateDecoder.getScannedNumberOfType(CrateType.Relic, scannedCrates)) {
            this.add(BadgeCode.Relic_Hunter);
        }

        //Amnesiac - Scan the same crate again
        if (!this.earnedBadges.has(BadgeCode.Amnesiac) && scannedCrates.has(crateCode)) {
            this.add(BadgeCode.Amnesiac);
        }
    }

    checkForChainCodeRelatedBadges(chainCode, chainCodeDecoder) {
        //Well Connected - all NPCs visited
        if (!this.earnedBadges.has(BadgeCode.Well_Connected) && chainCode.length >= chainCodeDecoder.MAX_CHAIN_CODE_SIZE) {
            this.add(BadgeCode.Well_Connected);
        }
    }
}

export function displayBadge(badge) {
    const resultsHeader = document.getElementById('results-header');
    const contentsImage = document.getElementById('contents-image');

    //update the display text for the item
    console.log(badge);
    //read parameters from the url
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
        resultsHeader.textContent = badge.code + " - " + badge.name + ": " + badge.description;
    } else {
        resultsHeader.textContent = badge.name + ": " + badge.description;
    }
    resultsHeader.style.display = 'block';

    //display the image contents
    contentsImage.style.display = 'block';
    contentsImage.src = badge.image;
}