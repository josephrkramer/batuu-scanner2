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
        name: "Jax Volta - TODO",
        occupation: undefined,
        biography: [
          "Hailing from the bustling planet of Corellia, Jax Volta was born into a life of comfort and privilege, the son of two upper-middle-class accountant parents who had built a boringly predictable, if stable life within Corellia's financial sector. However, Jax's heart was never in the world of numbers and ledgers. From a young age, he felt a pull toward adventure and speed.",
          "Jax took up swoop racing and sharpened his skills on Corellia's dangerous underground swoop tracks, eventually winning the Onderon Rally.",
          "Jax was later drawn to the allure of the galactic underworld, and carved out a niche for himself as a respected smuggler.`",
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
        name: "Lias Orion",
        occupation: "None of your business",
        biography: [
          "Lias Orion was abandoned by his mother after his father died at The Battle of Jakku when Lias was 7. Lias was taken in by Maz Kanata and grew up at her castle. After being shown the galaxy by Maz and watching his sister die at The Battle of Takodana, Lias decided the resistance could not be trusted and the first order must be stopped. Lias established The Cause for people who think different from the norm. Lias continues adding a diverse range of beings from the galaxy into The Cause.",
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
        name: "Tayla Yesmar - TODO",
        occupation: undefined,
        biography: [
          "AS A YOUNGLING THE FORCE HAS ALWAYS BEEN SOMETHING I WAS INTERESTED IN AND I SOON DISCOVERED IT WAS A PART OF ME AT THE AGE OF 10.",
          "DAY IN AND DAY OUT I STUDY THE FORCE AND ITS TEACHINGS BY LEARNING ABOUT ANCIENT RELICS AND THE HISTORY OF THE PAST BOTH GOOD & EVIL. IT'S IMPORTANT THAT I CONTINUE TO LET THE FORCE GUIDE ME TO HELP OTHERS IN NEED AND UNITE THE GALAXY",
        ],
        companion: undefined,
        vehicle: undefined,
        homeworld: "COREILLA",
        species: "HUMAN",
        affiliation: "ANCHORITE AND RUMORS OF ANOTHER AFFILIATION",
        type: CrewMemberType.NPC,
        image: "./crew/tayla.png",
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
        name: "Evant Rilas Verrick - TODO",
        occupation: undefined,
        biography: [
          "Before joining the First Order, Evant was instrumental in coordinating recreational and agricultural growth in Hanna City.",
          "Governor Verrick disagreed with Mon Mothma's decisions to demilitarize the New Republic and to relocate its capital, along with his family, to Hosnian Prime. Because of this, he helped the First Order establish a presence on Chandrila in order to maintain peace, order, and stability.",
          "Through his newly acquired position in the First Order, Evant traveled the galaxy researching how other planets and cultures-such as Lothal, Corellia, Hetzal Prime, Castillon, and Batuu-conduct their recreational and agricultural growth in order to further Chandrila's cultural advancements. In his galactic travels, Evant has even been granted a homestead in Peka on Batuu in conjunction with the work of Officer Anjay, Lt. Kath and, Lt. Agnon of the First Order.",
          "While he is not Force sensitive, Evant studies the Force religiously and is an avid collector of Force related items as he aspires to move through the ranks and become a First Order Relic Raider.`",
        ],
        companion: "EB-24",
        vehicle: "TIE Genesis",
        homeworld: "Chandrila",
        species: "Human",
        affiliation: "First Order",
        type: CrewMemberType.Faction_Leader,
        image: "./crew/evant.png",
        alignment: ChainCodeAlignmentString.Dark,
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Jo Larpe - TODO",
        occupation:
          "Not the Character You're Looking For. Sometimes does odd jobs for the CSL ground crew",
        biography: [
          "Jo Larpe spends his days hanging around the cantina and taking whatever jobs suit him. He's familiar with the outpost, and can help you get where you're going if you are lost.",
        ],
        companion: undefined,
        vehicle: "V-35 Courier Landspeeder",
        homeworld: "Nar Shaddaa",
        species: undefined,
        affiliation: "Unaffiliated",
        type: CrewMemberType.NPC,
        image: "./crew/joe.png",
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
