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
    earnedBadges = new Set(JSON.parse(localStorage.getItem('badges')));

    constructor() {
        this.codeToBadge.set('31nne', new Badge({code: '31nne', name: "Gaya's Microphone", description: "You participated in the March 1, 2024 event and helped retrieve Gaya's Micrphone.", image: 'images/badge/gaya-mic.jpeg'}));
        this.codeToBadge.set('5y7ms', new Badge({code: '5y7ms', name: "Relic Hunter", description: "You found all of the AARC relics hidden in the crates on Batuu.", image: 'images/badge/relic-hunter.jpeg'}));
        this.codeToBadge.set('kupy4', new Badge({code: 'kupy4', name: "Well Connected", description: "You interacted with every informant during the event.", image: 'images/badge/well-connected.jpeg'}));
    }

    decode(code) {
        console.log(`Decoding ${code}`);
        if (this.codeToBadge.has(code)) {
            //Cloning the badge so we can overwrite the image value without altering the original
            const cloneBadge = structuredClone(this.codeToBadge.get(code));
            if (!this.earnedBadges.has(code)) {
                console.log(`Overriding badge image - ${code}`);
                cloneBadge.image = 'images/badge/unearned-bw.jpeg';
            } else {
                console.log(`BADGE SHOULD HAVE ORIGINAL IMAGE - ${code}`);
            }
            return cloneBadge;
        } else {
            throw new Error(`${code} is an unknown badge`);
        }
    }

    add(code) {
        console.log(`Badge ${code} earned`);
        this.earnedBadges.add(code);
        //store all of the earned into local storage
        localStorage.setItem('badges', JSON.stringify(Array.from(this.earnedBadges)));
    }

    allKeys() {
        return this.codeToBadge.keys();
    }

    reset() {
        this.earnedBadges.clear()
        localStorage.removeItem('badges');
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