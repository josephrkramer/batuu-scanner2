import { CrateType } from "./crate-decoder.js";

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
    earnedBadges = new Set();

    constructor() {
        this.codeToBadge.set('31nne', new Badge({code: '31nne', name: "Gaya's Microphone", description: "You participated in the March 1, 2024 event and helped retrieve Gaya's Micrphone.", image: 'images/badge/gaya-mic.jpeg'}));
        this.codeToBadge.set('5y7ms', new Badge({code: '5y7ms', name: "Relic Hunter", description: "You found all of the AARC relics hidden in the crates on Batuu.", image: 'images/badge/relic-hunter.jpeg'}));
        this.codeToBadge.set('kupy4', new Badge({code: 'kupy4', name: "Well Connected", description: "You interacted with every informant during the event.", image: 'images/badge/well-connected.jpeg'}));

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
        return this.codeToBadge.keys();
    }

    reset() {
        this.earnedBadges.clear();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('b');
        window.location.search = urlParams;
    }

    checkForCrateRelatedBadges(scannedCrates, crateDecoder) {
        //Relic Hunter - all Relic "overridden" crates
        console.log(`Checking for ${CrateType.Relic} badge`);
        if (!this.earnedBadges.has('5y7ms') && crateDecoder.getTotalNumberOfType(CrateType.Relic) === crateDecoder.getScannedNumberOfType(CrateType.Relic, scannedCrates)) {
            this.add('5y7ms');
        }
    }

    checkForChainCodeRelatedBadges(chainCode, chainCodeDecoder) {
        //Well Connected - all NPCs visited
        if (!this.earnedBadges.has('kupy4') && chainCode.length >= chainCodeDecoder.MAX_CHAIN_CODE_SIZE) {
            this.add('kupy4');
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