import { CrateType } from "./crate-decoder.js";

export const BadgeCode = Object.freeze({
    Gayas_Microphone: '31nne',
    Relic_Hunter: '5y7ms',
    Well_Connected: 'kupy4',
    Slicer: 'ocu62',
    Amnesiac: 'k9zh0',
    Resistance_Hero: 'p35e8',
    We_Have_Cookies: '090xk'
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
    earnedBadges = new Set(JSON.parse(localStorage.getItem('badges')));

    constructor() {
        //listed badges
        this.codeToBadge.set(BadgeCode.Gayas_Microphone, new Badge({code: BadgeCode.Gayas_Microphone, name: "Gaya's Microphone", description: "You participated in the March 1, 2024 event and helped retrieve Gaya's Microphone.", image: 'images/badge/gaya-mic.jpeg'}));
        this.codeToBadge.set(BadgeCode.Relic_Hunter, new Badge({code: BadgeCode.Relic_Hunter, name: "Relic Hunter", description: "You found all of the AARC relics hidden in the crates on Batuu.", image: 'images/badge/relic-hunter.jpeg'}));
        this.codeToBadge.set(BadgeCode.Well_Connected, new Badge({code: BadgeCode.Well_Connected, name: "Well Connected", description: "You interacted with every informant during the event.", image: 'images/badge/well-connected.jpeg'}));
        this.codeToBadge.set(BadgeCode.Resistance_Hero, new Badge({code: BadgeCode.Resistance_Hero, name: "Resistance Hero", description: "We don't choose the light because we want to win. We choose it because it is the light.", image: 'images/badge/resistance-hero.jpeg'}));
        this.codeToBadge.set(BadgeCode.We_Have_Cookies, new Badge({code: BadgeCode.We_Have_Cookies, name: "We Have Cookies", description: "Be careful not to choke on your aspirations.", image: 'images/badge/we-have-cookies.jpeg'}));

        //unlisted badges
        this.unlistedCodeToBadge.set(BadgeCode.Slicer, new Badge({code: BadgeCode.Slicer, name: "Slicer", description: "You sure are a sneaky one. Raithe would be proud.", image: 'images/badge/slicer.jpeg'}));
        this.unlistedCodeToBadge.set(BadgeCode.Amnesiac, new Badge({code: BadgeCode.Amnesiac, name: "Amnesiac", description: "What were you expecting? It's the same space junk in the box every time.", image: 'images/badge/amnesiac.jpeg'}));

        const urlParams = new URLSearchParams(window.location.search);
        //load new url params into local storage
        for (const code of urlParams.getAll('b')) {
            if (!this.earnedBadges.has(code)) {
                this.earnedBadges.add(code);
            }
        }
        localStorage.setItem('badges', JSON.stringify(Array.from(this.earnedBadges)));
        //load new local storage badges into the url params
        let modifiedParams = false;
        for (const code of this.earnedBadges) {
            const urlBadges = new Set(urlParams.getAll('b'));
            if (!urlBadges.has(code)) {
                urlParams.append('b', code);
                modifiedParams = true;
            }
        }
        if (modifiedParams) {
            window.location.search = urlParams;
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
        //adding again is not harmful as it is a set
        this.earnedBadges.add(code);
        localStorage.setItem('badges', JSON.stringify(Array.from(this.earnedBadges)));

        //Add the badge to the url if not already in url
        const urlParams = new URLSearchParams(window.location.search);
        const urlCodes = new Set(urlParams.getAll('b'));
        if (!urlCodes.has(code)) {
            urlParams.append('b', code);
            window.location.search = urlParams;
        }
    }

    remove(code) {
        console.log(`Badge ${code} revoked`);
        //deleting again is not harmful as it is a set
        this.earnedBadges.delete(code);
        localStorage.setItem('badges', JSON.stringify(Array.from(this.earnedBadges)));

        //Add the badge to the url if not already in url
        const urlParams = new URLSearchParams(window.location.search);
        const urlCodes = new Set(urlParams.getAll('b'));
        if (urlCodes.has(code)) {
            urlParams.delete('b', code);
            window.location.search = urlParams;
        }
    }

    allKeys() {
        //all possible listed badges + all earned unlisted badges
        return new Set([...this.codeToBadge.keys(),...this.earnedBadges]);
    }

    reset() {
        this.earnedBadges.clear();
        localStorage.removeItem('badges');
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

        //Resistance Hero - only light side codes
        if (chainCode.length >= chainCodeDecoder.MIN_CHAIN_CODE_SIZE && chainCodeDecoder.rawValue(chainCode) === chainCode.length) {
            this.add(BadgeCode.Resistance_Hero);
        } else {
            this.remove(BadgeCode.Resistance_Hero);
        }

        //We Have Cookies - only dark side codes
        if (chainCode.length >= chainCodeDecoder.MIN_CHAIN_CODE_SIZE && (chainCodeDecoder.rawValue(chainCode) * -1) === chainCode.length) {
            this.add(BadgeCode.We_Have_Cookies);
        } else {
            this.remove(BadgeCode.We_Have_Cookies);
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