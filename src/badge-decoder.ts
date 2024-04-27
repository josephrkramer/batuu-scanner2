import { ChainCodeAlignmentCode, ChainCodeDecoder } from "./chain-code";
import { CrateDecoder, CrateType } from "./crate-decoder";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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
  Relic_Archivist: "ph15a",
  Frequent_Flyer_2: "p0mwe",
  Frequent_Flyer_5: "5340m",
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

export const BADGE_DATE_FORMAT = "YYMMDD";
export class EarnedBadge {
  code: string;
  date: string;

  constructor({
    code = "",
    earnedAt = dayjs().startOf("date").format(BADGE_DATE_FORMAT),
  }) {
    this.code = code;
    this.date = earnedAt;
  }
}

export class BadgeDecoder {
  codeToBadge = new Map<string, Badge>();
  unlistedCodeToBadge = new Map<string, Badge>();
  earnedBadges = new Map<string, EarnedBadge>();
  eventDates = new Set<string>([
    dayjs("2024-03-01").startOf("date").format(BADGE_DATE_FORMAT),
    dayjs("2024-10-02").startOf("date").format(BADGE_DATE_FORMAT),
    dayjs("2024-10-06").startOf("date").format(BADGE_DATE_FORMAT),
  ]);

  constructor() {
    //listed badges
    this.codeToBadge.set(
      BadgeCode.Gayas_Microphone,
      new Badge({
        code: BadgeCode.Gayas_Microphone,
        name: "Gaya's Microphone",
        description: `"I'm a Rockstar Queen!" --Gaya
          
          Participated in an event and helped retrieve Gaya's Microphone.`,
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
    this.codeToBadge.set(
      BadgeCode.Relic_Archivist,
      new Badge({
        code: BadgeCode.Relic_Archivist,
        name: "Relic Archivist",
        description: `"Relics of a bygone era." --Bo-Katan Kryze
        
        Collect 10+ relics.`,
        image: "images/badge/relic-archivist.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Frequent_Flyer_2,
      new Badge({
        code: BadgeCode.Frequent_Flyer_2,
        name: "Frequent Flyer",
        description: `"Fly casual." --Han Solo
        
        Attend 2+ events.`,
        image: "images/badge/frequent-flyer-2.jpeg",
      }),
    );
    this.codeToBadge.set(
      BadgeCode.Frequent_Flyer_5,
      new Badge({
        code: BadgeCode.Frequent_Flyer_5,
        name: "Veteran Flyer",
        description: `"I've flown from one side of this galaxy to the other..." --Han Solo
        
        Attend 5+ events.`,
        image: "images/badge/frequent-flyer-5.jpeg",
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
      this.earnedBadges = new Map<string, EarnedBadge>(
        JSON.parse(localStorage.badges),
      );
      console.log(this.earnedBadges);
    }

    const urlParams = new URLSearchParams(window.location.search);
    //load new url params into local storage
    for (const codeAndDate of urlParams.getAll("b")) {
      const badge = this.badgeParamToEarnedBadge(codeAndDate);
      if (
        !this.codeToBadge.has(badge.code) &&
        !this.unlistedCodeToBadge.has(badge.code)
      ) {
        urlParams.delete("b", codeAndDate);
        continue;
      }
      if (!this.earnedBadges.has(badge.code)) {
        this.earnedBadges.set(badge.code, badge);
        //Display badges granted via the URL and/or QR Code Scan
        this.displayBadge(this.decode(badge.code));
        const logo = document.getElementById("logo")!;
        logo.style.display = "none";
      } else {
        this.earnedBadges.set(badge.code, badge);
      }
    }
    localStorage.setItem(
      "badges",
      JSON.stringify(Array.from(this.earnedBadges.entries())),
    );
    //load new local storage badges into the url params
    const urlBadges = new Set(urlParams.getAll("b"));
    const urlBadgesMap = new Map<string, EarnedBadge>();
    for (const badgeParam of urlBadges) {
      const badge = this.badgeParamToEarnedBadge(badgeParam);
      urlBadgesMap.set(badge.code, badge);
    }
    for (const badge of this.earnedBadges.values()) {
      if (!urlBadgesMap.has(badge.code)) {
        urlBadgesMap.set(badge.code, badge);
      }
    }
    //rebuild fresh url params to remove duplicate badge codes
    urlParams.delete("b");
    for (const badge of urlBadgesMap.values()) {
      urlParams.append("b", this.earnedBadgeToBadgeParam(badge));
    }
    history.replaceState(
      null,
      "",
      window.location.href.split("?")[0] + "?" + urlParams.toString(),
    );
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

  add(code: string, date: Dayjs = dayjs().startOf("date")) {
    const badge = new EarnedBadge({
      code: code,
      earnedAt: date.format(BADGE_DATE_FORMAT),
    });

    console.log(`Badge ${badge.code} earned`);
    //adding again is not harmful as it is a set

    this.earnedBadges.set(badge.code, badge);
    localStorage.setItem(
      "badges",
      JSON.stringify(Array.from(this.earnedBadges)),
    );

    //Add the badge to the url if not already in url
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.append("b", this.earnedBadgeToBadgeParam(badge));

    history.replaceState(
      null,
      "",
      window.location.href.split("?")[0] + "?" + urlParams.toString(),
    );
    this.displayBadge(this.decode(badge.code));
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
    return new Set([...this.codeToBadge.keys(), ...this.earnedBadges.keys()]);
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

    //Relic Archivist - Collect 10+ Relics
    if (
      !this.earnedBadges.has(BadgeCode.Relic_Archivist) &&
      crateDecoder.getScannedNumberOfType(CrateType.Relic) >= 10
    ) {
      this.add(BadgeCode.Relic_Archivist);
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

  checkForEventRelatedBadges() {
    /*console.log(
      `Checking for event related badges: attened ${this.eventsAttended().size} events`,
    );
    console.log(this.eventDates);
    console.log(this.eventsAttended());*/
    //Check for Frequent Flyer
    if (
      !this.earnedBadges.has(BadgeCode.Frequent_Flyer_2) &&
      this.eventsAttended().size >= 2
    ) {
      this.add(BadgeCode.Frequent_Flyer_2);
    }

    //Check for Veteran Flyer
    if (
      !this.earnedBadges.has(BadgeCode.Frequent_Flyer_5) &&
      this.eventsAttended().size >= 5
    ) {
      this.add(BadgeCode.Frequent_Flyer_5);
    }
  }

  today() {
    return dayjs().startOf("date").format(BADGE_DATE_FORMAT);
  }

  eventsAttended() {
    const attended = new Set<string>();
    if (this.eventDates.has(this.today())) {
      attended.add(this.today());
    }
    for (const earnedBadge of this.earnedBadges.values()) {
      if (this.eventDates.has(earnedBadge.date)) {
        attended.add(earnedBadge.date);
      }
    }

    return attended;
  }

  badgeParamToEarnedBadge(codeAndDate: string): EarnedBadge {
    const code = codeAndDate.substring(0, 5);
    const date = codeAndDate.substring(5);
    if (date.length < 6) {
      return new EarnedBadge({ code: code });
    } else {
      return new EarnedBadge({ code: code, earnedAt: date });
    }
  }

  earnedBadgeToBadgeParam(earnedBadge: EarnedBadge): string {
    return earnedBadge.code + earnedBadge.date;
  }

  displayBadge(badge: Badge) {
    const badgeText = document.getElementById("badge-text-large")!;
    const badgeDate = document.getElementById("badge-date-large")!;
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
    if (this.earnedBadges.has(badge.code)) {
      const date = dayjs(
        this.earnedBadges.get(badge.code)!.date,
        BADGE_DATE_FORMAT,
      );
      badgeDate.textContent = "Earned on " + date.format("MMM D, YYYY");
    } else {
      badgeDate.textContent = "Badge not earned";
    }
    badgeDiv.style.display = "block";

    //display the image contents
    const imgUrl = new URL(`../${badge.image}`, import.meta.url).href;
    badgeImage.src = imgUrl;
  }
}
