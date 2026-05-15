import { ChainCodeAlignmentString } from "./chain-code";

export const CrewMemberType = Object.freeze({
  Faction_Leader: "Starting Contacts",
  NPC: "Sources",
  Support: "Blue Crew",
  Virtual: "Remote",
});

export class CrewMember {
  name: string;
  occupation: string;
  biography: string[];
  companion: string;
  vehicle: string;
  homeworld: string;
  species: string;
  affiliation: string;
  type: string;
  image: string;
  alignment: string;
  meetingLocation: string;
  npcLocation: string;

  constructor({
    name = "",
    occupation = "",
    biography = new Array<string>(),
    companion = "",
    vehicle = "",
    homeworld = "",
    species = "",
    affiliation = "",
    type = "",
    image = "",
    alignment = "",
    meetingLocation = "",
    npcLocation = "",
  }) {
    this.name = name;
    this.occupation = occupation;
    this.biography = biography;
    this.companion = companion;
    this.vehicle = vehicle;
    this.homeworld = homeworld;
    this.species = species;
    this.affiliation = affiliation;
    this.type = type;
    this.image = image;
    this.alignment = alignment;
    this.meetingLocation = meetingLocation;
    this.npcLocation = npcLocation;
  }
}

export class CrewManifest {
  crew = new Map();

  constructor() {
    //create empty arrays
    this.crew.set(CrewMemberType.Faction_Leader, new Array<CrewMember>());
    this.crew.set(CrewMemberType.NPC, new Array<CrewMember>());
    //this.crew.set(CrewMemberType.Virtual, new Array<CrewMember>());
    this.crew.set(CrewMemberType.Support, new Array<CrewMember>());

    this.addCrewMember(
      new CrewMember({
        name: "Major Shur Karrde",
        occupation: "First Order Trade Overseer of Batuu",
        biography: [
          "Born on Takodana, a Mid Rim planet on the border between civilization and frontier living. Went to school for trade negotiations. Upon graduation, was assigned to Thyferra. Due to undisclosed reasons, Karrde has been assigned to the backwater planet of Batuu.",
          "Likes include: rules, paperwork, negotiating, black-and-white vintage holodramas, and a well-written schedule. Dislikes include: beings with no ambition, beings who lack manners, and milk of any color.",
        ],
        companion: undefined,
        vehicle: undefined,
        homeworld: "Takodana",
        species: "Human",
        affiliation: "First Order",
        type: CrewMemberType.NPC,
        image: "./crew/shur-karrde.png",
        alignment: ChainCodeAlignmentString.Dark,
        meetingLocation: "between Oga's and the First Order Cargo.",
        npcLocation:
          "You may find Major Shur Karrde between Oga's and the First Order Cargo.",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Lias Orion",
        occupation: "None of your business",
        biography: [
          "After losing his sister and father due to the war, Lias Orion was left to fend for himself at a young age. He established The Cause as a means to give beings of the galaxy another choice that wasn’t the First Order or the Resistance.",
        ],
        companion: "BD-72",
        vehicle: "“The Ktulu” a Y-Wing",
        homeworld: "Takodana",
        species: "Human",
        affiliation: "The Cause",
        type: CrewMemberType.NPC,
        image: "./crew/lias.jpg",
        alignment: ChainCodeAlignmentString.Neutral,
        meetingLocation:
          "Under the far side of the Millennium Falcon on Batuu.",
        npcLocation: "Under the far side of the Millennium Falcon on Batuu.",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Zilla Nir'Oz",
        occupation: "Slicer",
        biography: [
          "Zilla's childhood was spent in Canto Bight, shadowing her parents who worked at one of the gaming establishments (and picking up a few skills from the less-reputable patrons). She always admired the well- heeled customers, and hopes to one day own one of their sleek yachts.",
          "She attracted attention by borrowing one of the ships without permission, and was given her first job by the impressed owner. Since then, her skills have been for rent to the highest bidder. Having built up quite a reputation for herself, she finally secured what promised to be a long-term engagement with an established but unsavory organization. But due to a difference of opinion regarding some porg eggs and a lot of Spice, Zilla has found herself on the run - and in need of help.",
        ],
        companion: undefined,
        vehicle: "Nice try, First Order. I rotate vehicles.",
        homeworld: "Cantonica",
        species: "Human",
        affiliation: undefined,
        npcLocation: "You'll find Zilla nosing around the antiquities.",
        type: CrewMemberType.NPC,
        image: "./crew/zilla.jpg",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Evant Darrow",
        occupation:
          "Not the Character You're Looking For. Sometimes does odd jobs for the CSL ground crew",
        biography: [
          "Evant spends his days hanging around the cantina and taking whatever jobs suit him. He's familiar with the outpost, and can help you get where you're going if you are lost.",
        ],
        companion: undefined,
        vehicle: "V-35 Courier Landspeeder",
        homeworld: "Kuat",
        species: "Human",
        affiliation: "Unaffiliated",
        type: CrewMemberType.Support,
        image: "./crew/evant-darrow.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Resh Drolik",
        occupation: "Droidsmith",
        biography: [
          "Born on Batuu to a family of lichen gatherers, he became fascinated with the droids of Black Spire Outpost as a youngling.",
          "Resh has very little formal training, and he learned most of what he knows from talking to the droids themselves about how they function. He's well-known around the Outpost, and can usually be found speaking fluent binary with one of his droid friends (or trying to barter his services for a discount at Ronto Roasters).",
          "Not content to learn about their mechanics, Resh has made a study of the droids' cultures and myths as well. He's particularly interested in the legend of the First Droid: FD-01, and is hoping to learn more.",
        ],
        companion: "SL-V6 (Sal), a salvaged seeker droid",
        vehicle: undefined,
        homeworld: "Batuu",
        species: "Human",
        affiliation: undefined,
        npcLocation:
          "You will find Resh checking up on his friends, particularly where they're born.",
        type: CrewMemberType.Faction_Leader,
        image: "./crew/resh.jpg",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Bex Malbeth",
        occupation: "Does it pay? Yeah, I can do that.",
        biography: [
          "Bex was born on Odessen. From a young age, she found it difficult to stay out of trouble. She has been traveling from job to job, eking out a living doing whatever will keep yobshrimp on the table - and keep her out of trouble. Mostly.",
          "She's found passage on everything from cargo transports to pleasure barges, picking up a variety of acquaintances, skills, and disguises. Along the way, she acquired some engineering skills. That brought her to the attention of the First Order - and left her stranded in the Outer Rim.",
          "She is looking for work. Best case, it's scavenging. She is vying for the attention of Savi, but always keeping an eye on the exits. Her loyalty? Make an offer.",
        ],
        companion: undefined,
        vehicle: "Whatever she can barter transport on",
        homeworld: "Odessen",
        species: "Human",
        affiliation: "Unaffiliated",
        npcLocation:
          "You might find Bex looking for a quick way to grab a few credits, even if she has to turn someone in.",
        type: CrewMemberType.Faction_Leader,
        image: "./crew/bex.jpg",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Schme Wilaka",
        occupation: "Owner/Operator of MB Shipping and Transport",
        biography: [
          "Schme was born and raised aboard shipping vessels, an apprentice in her parents' transport company. Her father, a proud Alderaanian, encouraged Schme to come to love the culture and customs of his former home, while her mother taught her everything she knew about the perils and profits of work in the Outer Rim and Wild Space.",
          "Before the 275th anniversary flight of the Halcyon, Schme's parents retired to Lysatra, and left MB Shipping and Transport in her capable hands. While sympathetic to the Rebellion and the Resistance, Schme was more focused on the family business and taking good care of my crew than on galactic politics.",
          "Schme may appear as an Alderaanian noblewoman, but her experience in Wild Space has left her with more skills than meet the eye.",
          "Inspired by her experiences aboard the Halcyon, Schme formalized her loyalty to the Resistance. She now works for both the interests of the Alderaanian people and the galaxy she hopes to see for all peoples.",
        ],
        companion: undefined,
        vehicle: undefined,
        homeworld: "Alderaan",
        species: "Human",
        affiliation: "Alderaan first, then Resistance",
        npcLocation:
          "You can find Schme where the Outpost's favorite food is sold.",
        type: CrewMemberType.Faction_Leader,
        image: "./crew/schme.jpeg",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Jax Volta",
        occupation: "Little bit of this, little bit of that",
        biography: [
          "Hailing from the bustling planet of Corellia, Jax Volta was born into a life of comfort and privilege, the son of two upper-middle-class accountant parents who had built a boringly predictable, if stable life within Corellia's financial sector. However, Jax's heart was never in the world of numbers and ledgers. From a young age, he felt a pull toward adventure and speed.",
          "Jax took up swoop racing and sharpened his skills on Corellia's dangerous underground swoop tracks, eventually winning the Onderon Rally.",
          "Jax was later drawn to the allure of the galactic underworld, and carved out a niche for himself as a respected smuggler.",
        ],
        companion: undefined,
        vehicle: "YT-2500",
        homeworld: "Corellia",
        species: "Human",
        affiliation: "Self",
        type: CrewMemberType.NPC,
        image: "./crew/jax.png",
        npcLocation:
          "You may find Jax trying to make a deal among the rocks at the edge of the outpost, across from a troupe of droids and across the way from a crator.",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Porgkins",
        occupation: "Pilot",
        biography: [
          "A little known hero of the Rebel Alliance and the New Republic, the small statured Porg from Ahco-To is one of the very few to survive the Battle of Yavin. Porkins, call sign Squawk, was crucial at the battle of Endor. While the Falcon took out the power generator, and Wedge got the power regulator on the north tower, who do you think took out the southern tower? Why, Porkins, of course, in his size appropriate X-wing. He later co-founded Wraith Squadron along with Wedge Antilles. He fit right in with all the misfits and miscreants and ended his career with that unit, but not before engaging in many shenanigans to dog the remants of the Empire at every step.",
        ],
        companion: undefined,
        vehicle: "X-wing (custom)",
        homeworld: "Ahco-To",
        species: "Porg",
        affiliation: "New Republic",
        type: CrewMemberType.Support,
        image: "./crew/porgkins.png",
      }),
    );
  }

  addCrewMember(crewMemeber: CrewMember) {
    const typeList = this.crew.get(crewMemeber.type);
    typeList.push(crewMemeber);
  }

  getLeaders(): CrewMember[] {
    return this.crew.get(CrewMemberType.Faction_Leader);
  }

  getNPCs() {
    return this.crew.get(CrewMemberType.NPC);
  }

  get(crewMemeberType: string) {
    return this.crew.get(crewMemeberType);
  }
}
