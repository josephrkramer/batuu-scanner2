import { ChainCodeAlignmentString } from "./chain-code";

export const CrewMemberType = Object.freeze({
  Faction_Leader: "AARC Agents",
  NPC: "Sources",
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
  }
}

export class CrewManifest {
  crew = new Map();

  constructor() {
    //create empty arrays
    this.crew.set(CrewMemberType.Faction_Leader, new Array<CrewMember>());
    this.crew.set(CrewMemberType.NPC, new Array<CrewMember>());
    //this.crew.set(CrewMemberType.Virtual, new Array<CrewMember>());

    this.addCrewMember(
      new CrewMember({
        name: "Vesper Grey",
        occupation: "Freelancer",
        biography: [
          "Vesper Grey is a daughter of Dathomir, even though she has never set foot on its surface. Her 3 mothers were born and raised on planet and fled together during the Battle of Dathomir. Vesper joined the Rebel Alliance after a troubling incident during her adolescence. One of her mothers disappeared without a trace, seemingly in search of a mysterious artifact. Vesper earned a spot in the Alliance Special Forces or SpecForce and served for years in the Pathfinders, specializing in infiltration and guerrilla tactics. After the overthrow of the Galactic Empire and the formation of the New Republic Vesper left the military and has been operating as a lone freelancer ever since, becoming consumed by the search for ancient Dathomiri artifacts.",
        ],
        companion: "Loner",
        vehicle: "Kom'rk-class fighter named The Erso",
        homeworld: "Dathomir",
        species: undefined,
        affiliation: "Freelancer but in the past Rebel Alliance",
        type: CrewMemberType.Faction_Leader,
        image: "./crew/vesper.png",
        alignment: ChainCodeAlignmentString.Light,
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Lias Orion",
        occupation: "None of your business",
        biography: [
          "Lias Orion was abandoned by his mother after his father died at the Battle of Jakku when Lias was 7. Lias was taken in by Maz Kanata and grew up at her castle. After being shown the galaxy by Maz, and watching his sister die at the Battle of Takodana, Lias decided the Resistance could not be trusted and the First Order must be stopped. Lias established The Cause for people who think differently from the norm. Lias continues to add a diverse range of beings from the galaxy into The Cause.",
        ],
        companion: "BD-72",
        vehicle: "WTK-85A interstellar transport called 'The Ktulu'",
        homeworld: "Takodana",
        species: "Human",
        affiliation: "The Cause",
        type: CrewMemberType.Faction_Leader,
        image: "./crew/lias.jpg",
        alignment: ChainCodeAlignmentString.Neutral,
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Tayla Yesmar",
        occupation: "Student of the Force",
        biography: [
          "Tayla Yesmar of Coreilla returns to the three hot suns of Batuu but this time she’s trying to stay low and not draw too much attention. Something is up and she can feel it, and she’s there to get to the bottom of it, but as she is doing so, she explores more wonders of the planet spire to spire breaking it down to learn new things as she moves and even the history behind it.",
        ],
        companion: undefined,
        vehicle: undefined,
        homeworld: "Corellia",
        species: "Human",
        affiliation: "Anchorite",
        type: CrewMemberType.NPC,
        image: "./crew/tayla.jpg",
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
        type: CrewMemberType.NPC,
        image: "./crew/zilla.jpg",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Evant Rilas Verrick",
        occupation: undefined,
        biography: [
          "After disagreeing with Mon Mothma's decisions to demilitarize the New Republic and to relocate its capital (along with his family) to Hosnian Prime, then-Regional Governor Evant Verrick helped the First Order establish a presence on Chandrila in order to maintain peace, order, and stability.",
          "In his exploratory galactic travels, Evant was granted a homestead in Peka on Batuu in conjunction with the work of Officer Anjay, Lt. Kath and Lt. Agnon of the First Order.",
          "While he is not Force sensitive, Evant studies the Force religiously and is a collector of Force-related items. This passion led him to pursue the role of First Order Relic Raider. After assembling a covert team and successfully identifying a mysterious artifact in Black Spire Outpost that was (falsely) rumored to have the power to communicate to the galaxy, Evant attained his coveted promotion.",
          "That success also caught the attention of a mysterious organization known only as AARC.",
          "His position in The Order, his passion for galactic relics, and his interest in this mysterious AARC has led him to pursue a mission once again on the planet Batuu, at the edge of the galaxy...",
        ],
        companion: "EB-24",
        vehicle: "TIE Genesis",
        homeworld: "Chandrila",
        species: "Human",
        affiliation: "First Order",
        type: CrewMemberType.Faction_Leader,
        image: "./crew/evant.jpg",
        alignment: ChainCodeAlignmentString.Dark,
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
        type: CrewMemberType.NPC,
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
        type: CrewMemberType.NPC,
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
        type: CrewMemberType.NPC,
        image: "./crew/schme.jpeg",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "La'Beth",
        occupation: "Chemist",
        biography: [
          "La'Beth was once a lead chemist aboard the Halcyon after escaping servitude to Oga. Now, she traverses the galaxy aboard the Perihelion L1-T3, a Solara-Class Star Freighter, with her loyal droid, R1-B1. She opened and maintains hyperspace comms channels, ensuring vital information flows across the universe.",
          "Known for her discretion, La'Beth has access to various channels hidden from broader galactic knowledge. With a keen understanding of countless species, her impeccable intuition helps her to excel in social situations. Her services are available to those who can meet her price—whether it's delivering a message, securing an outcome, or hosting a dazzling party.",
        ],
        companion: "R1-B1",
        vehicle: "Perihelion L1-T3, a Solara-Class Star Freighter",
        homeworld: undefined,
        species: undefined,
        affiliation: undefined,
        type: CrewMemberType.NPC,
        image: "./crew/labeth.jpg",
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
        type: CrewMemberType.NPC,
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
