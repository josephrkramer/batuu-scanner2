import { ChainCodeAlignmentCode, ChainCodeDecoder } from "./chain-code";
import { CrateDecoder, CrateType } from "./crate-decoder";

export const BadgeCode = Object.freeze({
  Gayas_Microphone: "31nne",
  Relic_Hunter: "5y7ms",
  Well_Connected: "kupy4",
  Slicer: "ocu62",
  Amnesiac: "k9zh0",
  Resistance_Hero: "p35e8",
  We_Have_Cookies: "090xk",
  Bounty: "8tpao",
  Character_AARC: "pk41z",
  Jawa: "ado5t",
  I_Shot_First: "b39i1",
  Outer_Rim_Regalia: "93l9i",
  Its_My_Honor: "0a183",
  The_Best_Teacher: "j3rqx",
  Relic_Enthusiast: "71uia",
});

export class Badge {
  code: string;
  name: string;
  description: string;
  image: string;

  constructor({ code = "", name = "", description = "", image = "" } = {}) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.image = image;
  }
}

export class BadgeDecoder {
  codeToBadge = new Map<string, Badge>();
  unlistedCodeToBadge = new Map<string, Badge>();
  earnedBadges = new Set<string>();

  constructor() {
    //listed badges
    this.codeToBadge.set(
      BadgeCode.Gayas_Microphone,
      new Badge({
        code: BadgeCode.Gayas_Microphone,
        name: "Gaya's Microphone",
        description:
          "You participated in the March 1, 2024 event and helped retrieve Gaya's Microphone.",
        image: "images/badge/gaya-mic.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Relic_Hunter,
      new Badge({
        code: BadgeCode.Relic_Hunter,
        name: "Relic Hunter",
        description:
          "Find all of the AARC relics hidden in the crates on Batuu.",
        image: "images/badge/relic-hunter.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Well_Connected,
      new Badge({
        code: BadgeCode.Well_Connected,
        name: "Well-Connected",
        description: `"You just walk in like you belong." --Cassian Andor
        
        Interact with every informant during the event.`,
        image: "images/badge/well-connected.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Resistance_Hero,
      new Badge({
        code: BadgeCode.Resistance_Hero,
        name: "Resistance Hero",
        description: `"We don't choose the light because we want to win. We choose it because it is the light." --Rael Averross
          
          Make only Light Side choices during an event.`,
        image: "images/badge/resistance-hero.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.We_Have_Cookies,
      new Badge({
        code: BadgeCode.We_Have_Cookies,
        name: "We Have Cookies",
        description: `"Be careful not to choke on your aspirations." --Darth Vader
        
        Make only Dark Side choices during an event.`,
        image: "images/badge/we-have-cookies.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Bounty,
      new Badge({
        code: BadgeCode.Bounty,
        name: "Bounty",
        description: `"You're not hauling rathtars on this freighter, are you?!" --Finn
        
        Scan a crate containing a creature.`,
        image: "images/badge/bounty.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Character_AARC,
      new Badge({
        code: BadgeCode.Character_AARC,
        name: "Character AARC",
        description: `"The future has many paths; choose wisely." --Anakin Skywalker
        
        Make both Light and Dark side choices during an event.`,
        image: "images/badge/character-aarc.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Jawa,
      new Badge({
        code: BadgeCode.Jawa,
        name: "Jawa",
        description: `"UTINNI!" --Dathcha
        
        Scan 20+ crates.`,
        image: "images/badge/jawa.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.I_Shot_First,
      new Badge({
        code: BadgeCode.I_Shot_First,
        name: "I Shot First",
        description: `"I’m a Mandalorian. Weapons are part of my religion." --Din Djarin
        
        Collect more than one weapon.`,
        image: "images/badge/i-shot-first.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.The_Best_Teacher,
      new Badge({
        code: BadgeCode.The_Best_Teacher,
        name: "The Best Teacher",
        description: `"Never tell me the odds." --Han Solo
        
        Scan 20+ non-event crates.`,
        image: "images/badge/the-best-teacher.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Relic_Enthusiast,
      new Badge({
        code: BadgeCode.Relic_Enthusiast,
        name: "Relic Enthusiast",
        description: `"I’m a rogue archaeologist, not a protocol droid." --Dr. Chelli Aphra
        
        Collect 5+ relics.`,
        image: "images/badge/relic-enthusiast.jpeg",
      }),
    );

    //unlisted badges
    this.unlistedCodeToBadge.set(
      BadgeCode.Slicer,
      new Badge({
        code: BadgeCode.Slicer,
        name: "Slicer",
        description: "You sure are a sneaky one. Raithe would be proud.",
        image: "images/badge/slicer.jpeg",
      }),
    );
    this.unlistedCodeToBadge.set(
      BadgeCode.Amnesiac,
      new Badge({
        code: BadgeCode.Amnesiac,
        name: "Amnesiac",
        description: `What were you expecting? It's the same space junk in the box every time.
          
          Scan a single crate for the second time.`,
        image: "images/badge/amnesiac.jpeg",
      }),
    );
    this.unlistedCodeToBadge.set(
      BadgeCode.Outer_Rim_Regalia,
      new Badge({
        code: BadgeCode.Outer_Rim_Regalia,
        name: "Outer Rim Regalia",
        description: `"Do or do not, there is no try" --Yoda
          
          Awarded by the Halcyon: The Legacy Contines team.`,
        image: "images/badge/outer-rim-regalia.jpeg",
      }),
    );
    this.unlistedCodeToBadge.set(
      BadgeCode.Its_My_Honor,
      new Badge({
        code: BadgeCode.Its_My_Honor,
        name: "It's My Honor",
        description: `Starcruiser Cast Member
          
          Awarded by the Halcyon: The Legacy Contines team.`,
        image: "images/badge/its-my-honor.jpeg",
      }),
    );

    if (localStorage.badges !== undefined) {
      this.earnedBadges = new Set(JSON.parse(localStorage.badges));
    }

    const urlParams = new URLSearchParams(window.location.search);
    //load new url params into local storage
    for (const code of urlParams.getAll("b")) {
      if (!this.earnedBadges.has(code)) {
        this.earnedBadges.add(code);
        //Display badges granted via the URL and/or QR Code Scan
        displayBadge(this.decode(code));
        const logo = document.getElementById("logo")!;
        logo.style.display = "none";
      }
    }
    localStorage.setItem(
      "badges",
      JSON.stringify(Array.from(this.earnedBadges)),
    );
    //load new local storage badges into the url params
    let modifiedParams = false;
    for (const code of this.earnedBadges) {
      const urlBadges = new Set(urlParams.getAll("b"));
      if (!urlBadges.has(code)) {
        urlParams.append("b", code);
        modifiedParams = true;
      }
    }
    if (modifiedParams) {
      history.replaceState(
        null,
        "",
        window.location.href.split("?")[0] + "?" + urlParams.toString(),
      );
    }
  }

  decode(code: string): Badge {
    console.log(`Decoding ${code}`);
    if (this.codeToBadge.has(code)) {
      //Cloning the badge so we can overwrite the image value without altering the original
      const cloneBadge = structuredClone(this.codeToBadge.get(code))!;
      if (!this.earnedBadges.has(code)) {
        cloneBadge.image = "images/badge/unearned-bw.jpeg";
      }
      return cloneBadge;
    } else if (this.unlistedCodeToBadge.has(code)) {
      return this.unlistedCodeToBadge.get(code)!;
    } else {
      throw new Error(`${code} is an unknown badge`);
    }
  }

  add(code: string) {
    console.log(`Badge ${code} earned`);
    //adding again is not harmful as it is a set
    this.earnedBadges.add(code);
    localStorage.setItem(
      "badges",
      JSON.stringify(Array.from(this.earnedBadges)),
    );

    //Add the badge to the url if not already in url
    const urlParams = new URLSearchParams(window.location.search);
    const urlCodes = new Set(urlParams.getAll("b"));
    if (!urlCodes.has(code)) {
      urlParams.append("b", code);
      history.replaceState(
        null,
        "",
        window.location.href.split("?")[0] + "?" + urlParams.toString(),
      );
    }
    displayBadge(this.decode(code));
  }

  remove(code: string) {
    console.log(`Badge ${code} revoked`);
    //deleting again is not harmful as it is a set
    this.earnedBadges.delete(code);
    localStorage.setItem(
      "badges",
      JSON.stringify(Array.from(this.earnedBadges)),
    );

    //Add the badge to the url if not already in url
    const urlParams = new URLSearchParams(window.location.search);
    const urlCodes = new Set(urlParams.getAll("b"));
    if (urlCodes.has(code)) {
      urlParams.delete("b", code);
      history.replaceState(
        null,
        "",
        window.location.href.split("?")[0] + "?" + urlParams.toString(),
      );
    }
  }

  allKeys() {
    //all possible listed badges + all earned unlisted badges
    return new Set([...this.codeToBadge.keys(), ...this.earnedBadges]);
  }

  reset() {
    this.earnedBadges.clear();
    localStorage.removeItem("badges");
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("b");
    history.replaceState(
      null,
      "",
      window.location.href.split("?")[0] + "?" + urlParams.toString(),
    );
  }

  checkForCrateRelatedBadges(crateCode: string, crateDecoder: CrateDecoder) {
    //Relic Hunter - all Relic "overridden" crates
    function isLastRelicCrate(crateCode: string, crateDecoder: CrateDecoder) {
      //hasn't been scanned previously
      return (
        !crateDecoder.hasCrate(crateCode) &&
        //is of type Relic
        crateDecoder.decode(crateCode).type === CrateType.Relic &&
        //The player has scanned all other Relics
        crateDecoder.getTotalNumberOfType(CrateType.Relic) - 1 ===
          crateDecoder.getScannedNumberOfType(CrateType.Relic)
      );
    }
    console.log(`Checking for ${CrateType.Relic} badge`);
    if (
      !this.earnedBadges.has(BadgeCode.Relic_Hunter) &&
      isLastRelicCrate(crateCode, crateDecoder)
    ) {
      this.add(BadgeCode.Relic_Hunter);
    }

    //Amnesiac - Scan the same crate again
    if (
      !this.earnedBadges.has(BadgeCode.Amnesiac) &&
      crateDecoder.hasCrate(crateCode)
    ) {
      this.add(BadgeCode.Amnesiac);
    }

    //Bounty - animal crates "GI_QR", "KL_QR", or "FAL26"
    const bountySet = new Set(["GI_QR", "KL_QR", "FAL26"]);
    if (!this.earnedBadges.has(BadgeCode.Bounty) && bountySet.has(crateCode)) {
      this.add(BadgeCode.Bounty);
    }

    //Jawa - Scan 20+ crates
    if (
      !this.earnedBadges.has(BadgeCode.Jawa) &&
      crateDecoder.scannedCrates.size >= 20
    ) {
      this.add(BadgeCode.Jawa);
    }

    //I Shot First - Scan more than one weapon
    if (
      !this.earnedBadges.has(BadgeCode.I_Shot_First) &&
      //current scann is a weapon
      crateDecoder.decode(crateCode).type === CrateType.Weapon &&
      //at least 1 past weapon scan
      crateDecoder.getScannedNumberOfType(CrateType.Weapon) >= 1
    ) {
      this.add(BadgeCode.I_Shot_First);
    }

    //The Best Teacher - 20+ non-event crates
    if (
      !this.earnedBadges.has(BadgeCode.The_Best_Teacher) &&
      crateDecoder.scannedCrates.size -
        crateDecoder.getScannedNumberOfType(CrateType.Relic) >=
        20
    ) {
      this.add(BadgeCode.The_Best_Teacher);
    }

    //Relic Enthusiast - Collect 5+ Relics
    if (
      !this.earnedBadges.has(BadgeCode.Relic_Enthusiast) &&
      crateDecoder.getScannedNumberOfType(CrateType.Relic) >= 5
    ) {
      this.add(BadgeCode.Relic_Enthusiast);
    }
  }

  checkForChainCodeRelatedBadges(chainCodeDecoder: ChainCodeDecoder) {
    //Well Connected - all NPCs visited
    if (
      !this.earnedBadges.has(BadgeCode.Well_Connected) &&
      chainCodeDecoder.chainCodeLength() >= chainCodeDecoder.MAX_CHAIN_CODE_SIZE
    ) {
      this.add(BadgeCode.Well_Connected);
    }

    //Resistance Hero - only light side codes
    if (
      chainCodeDecoder.chainCodeLength() >=
        chainCodeDecoder.MIN_CHAIN_CODE_SIZE &&
      chainCodeDecoder.rawValue() === chainCodeDecoder.chainCodeLength()
    ) {
      this.add(BadgeCode.Resistance_Hero);
    } else {
      this.remove(BadgeCode.Resistance_Hero);
    }

    //We Have Cookies - only dark side codes
    if (
      chainCodeDecoder.chainCodeLength() >=
        chainCodeDecoder.MIN_CHAIN_CODE_SIZE &&
      chainCodeDecoder.rawValue() * -1 === chainCodeDecoder.chainCodeLength()
    ) {
      this.add(BadgeCode.We_Have_Cookies);
    } else {
      this.remove(BadgeCode.We_Have_Cookies);
    }

    //Character AARC - make both light and dark side choices
    if (
      chainCodeDecoder.chainCodeLength() >=
        chainCodeDecoder.MIN_CHAIN_CODE_SIZE &&
      chainCodeDecoder.chainCode.includes(ChainCodeAlignmentCode.Dark) &&
      chainCodeDecoder.chainCode.includes(ChainCodeAlignmentCode.Light)
    ) {
      this.add(BadgeCode.Character_AARC);
    } else {
      this.remove(BadgeCode.Character_AARC);
    }
  }
}

export function displayBadge(badge: Badge) {
  const badgeText = document.getElementById("badge-text-large")!;
  const badgeImage = document.getElementById(
    "badge-image-large",
  )! as HTMLImageElement;
  const badgeDiv = document.getElementById("badge-large")!;

  //update the display text for the item
  console.log(badge);
  //read parameters from the url
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("debug")) {
    badgeText.textContent =
      badge.code + " - " + badge.name + ": " + badge.description;
  } else {
    badgeText.textContent = badge.name + ": " + badge.description;
  }
  badgeDiv.style.display = "block";

  //display the image contents
  const imgUrl = new URL(`../${badge.image}`, import.meta.url).href;
  badgeImage.src = imgUrl;
}
