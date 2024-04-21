export const CrewMemberType = Object.freeze({
  Faction_Leader: "AARC Agent",
  NPC: "Informant",
  Virtual: "Remote",
});

export class CrewMember {
  name: string;
  occupation: string;
  biography: string;
  companion: string;
  vehicle: string;
  homeworld: string;
  species: string;
  affiliation: string;
  type: string;
  image: string;

  constructor({
    name = "",
    occupation = "",
    biography = "",
    companion = "",
    vehicle = "",
    homeworld = "",
    species = "",
    affiliation = "",
    type = "",
    image = "",
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
  }
}

export class CrewManifest {
  crew = new Map();

  constructor() {
    //create empty arrays
    this.crew.set(CrewMemberType.Faction_Leader, new Array<CrewMember>());
    this.crew.set(CrewMemberType.NPC, new Array<CrewMember>());
    this.crew.set(CrewMemberType.Virtual, new Array<CrewMember>());

    this.addCrewMember(
      new CrewMember({
        name: "Lt Rook Darkazanli",
        occupation: "Soldier",
        biography: `Rook was born to Rebel parents and grew up on Hoth. She has never stayed on a single planet for longer than two years, other than a brief attempt to settle down with her family on Chandrila.

After the New Republic government was established and her parents settled down into roles in the ever-smaller New Republic military, Rook took to freelancing to make a name for herself. She became part of the crew of the Icarus and transported cargo across the galaxy.
            
However, the peace was not to last. The First Order soon became a big enough threat that Senator Leia Organa and several other Rebel veterans formed the Resistance. Rook and the Icarus crew offered their services to now General Leia. Rook's parents were killed in the attack on Hosnian Prime by the Starkiller weapon, and ever since she has vowed to see The First Order defeated.`,
        companion: undefined,
        vehicle: "T-70 X wing",
        homeworld: "Hoth",
        species: "Human",
        affiliation: "Rebellion//Resistance",
        type: CrewMemberType.Faction_Leader,
        image: "images/crew/rook.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Jax Volta",
        occupation: undefined,
        biography: `Hailing from the bustling planet of Corellia, Jax Volta was born into a life of comfort and privilege, the son of two upper-middle-class accountant parents who had built a boringly predictable, if stable life within Corellia's financial sector. However, Jax's heart was never in the world of numbers and ledgers. From a young age, he felt a pull toward adventure and speed.

            Jax took up swoop racing and sharpened his skills on Corellia's dangerous underground swoop tracks, eventually winning the Onderon Rally.
            
            Jax was later drawn to the allure of the galactic underworld, and carved out a niche for himself as a respected smuggler.`,
        companion: undefined,
        vehicle: "YT-2500",
        homeworld: "Corellia",
        species: "Human",
        affiliation: "Self",
        type: CrewMemberType.NPC,
        image: "images/crew/jax.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Lias Orion",
        occupation: undefined,
        biography: `At the age of 5. Lias Orion lost his father during the battle of Jakku. His mother disappeared upon receiving the news and Lias was left with his 2 year old sister. A'nah. Lias and A'nah were taken in by Maz Kanata under the condition that Lias would forever work in her castle as a runner to "take care of the things I would do 500 years ago? Lias learned about the galaxy from Maz.

            During the Battle of Takodana with the First Order, A'nah was caught in action and died. The destruction of the castle and his sister’s death left Lias devastated and vengeful! He recalled what Maz taught him about the partisans and Saw Gerrera which inspired Lias to begin a faction of his own entitled "The Cause" to give the galaxy what he calls "True Freedom.”`,
        companion: "BD-72",
        vehicle: "WTK-85A Interstellar transport",
        homeworld: "Takodana",
        species: "Human",
        affiliation: "The Cause",
        type: CrewMemberType.Faction_Leader,
        image: "images/crew/lias.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Tayla Yesmar",
        occupation: undefined,
        biography: `AS A YOUNGLING THE FORCE HAS ALWAYS BEEN SOMETHING I WAS INTERESTED IN AND I SOON DISCOVERED IT WAS A PART OF ME AT THE AGE OF 10.

            DAY IN AND DAY OUT I STUDY THE FORCE AND ITS TEACHINGS BY LEARNING ABOUT ANCIENT RELICS AND THE HISTORY OF THE PAST BOTH GOOD & EVIL. IT'S IMPORTANT THAT I CONTINUE TO LET THE FORCE GUIDE ME TO HELP OTHERS IN NEED AND UNITE THE GALAXY`,
        companion: undefined,
        vehicle: undefined,
        homeworld: "COREILLA",
        species: "HUMAN",
        affiliation: "ANCHORITE AND RUMORS OF ANOTHER AFFILIATION",
        type: CrewMemberType.NPC,
        image: "images/crew/tayla.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Zilla Nir'oz",
        occupation: "Slicer",
        biography: `Zilla's childhood was spent in Canto Bight, shadowing her parents who worked at one of the gaming establishments (and picking up a few skills from the less-reputable patrons). She always admired the well- heeled customers, and hopes to one day own one of their sleek yachts.

            She attracted attention by borrowing one of the ships without permission, and was given her first job by the impressed owner. Since then, her skills have been for rent to the highest bidder, and she'll work for anyone with the credits to spend. Having built up quite a reputation for herself, she finally secured what promised to be a long-term engagement with an established but unsavory organization. But those who know her wonder how long Zilla will be able to take orders…`,
        companion: undefined,
        vehicle: "Nice try, First Order. I rotate vehicles.",
        homeworld: "Cantonica",
        species: "Human",
        affiliation: undefined,
        type: CrewMemberType.NPC,
        image: "images/crew/zilla.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Evant Rilas Verrick",
        occupation: undefined,
        biography: `Before joining the First Order, Evant was instrumental in coordinating recreational and agricultural growth in Hanna City.

            Governor Verrick disagreed with Mon Mothma's decisions to demilitarize the New Republic and to relocate its capital, along with his family, to Hosnian Prime. Because of this, he helped the First Order establish a presence on Chandrila in order to maintain peace, order, and stability.
            
            Through his newly acquired position in the First Order, Evant traveled the galaxy researching how other planets and cultures-such as Lothal, Corellia, Hetzal Prime, Castillon, and Batuu-conduct their recreational and agricultural growth in order to further Chandrila's cultural advancements. In his galactic travels, Evant has even been granted a homestead in Peka on Batuu in conjunction with the work of Officer Anjay, Lt. Kath and, Lt. Agnon of the First Order.
            
            While he is not Force sensitive, Evant studies the Force religiously and is an avid collector of Force related items as he aspires to move through the ranks and become a First Order Relic Raider.`,
        companion: "EB-24",
        vehicle: "TIE Genesis",
        homeworld: "Chandrila",
        species: "Human",
        affiliation: "First Order",
        type: CrewMemberType.Faction_Leader,
        image: "images/crew/evant.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Pyke Rendessa",
        occupation: undefined,
        biography: `Pyke Rendessa is a smuggler who does a lot of import/export work, and one day Dok Ondar asked for his services. Once a shipment of lightsabers came Pyke's way, his curiosity got the best of him. Pyke kept one saber for himself. thinking they were real. When Pyke tried to use the saber in combat, he quickly found out they were training replicas. Pyke ultimately gave up smuggling when his whole crew was murdered by Dok

            Pyke was the sole survivor of the ambush. Once the smoke cleared, Pyke got out of the business and decided to go legit. Dok has called Pyke for a job, not knowing Pyke is out of the "game". Dok is also clueless to the fact that Pyke is looking for revenge against him.`,
        companion: "Porgkins",
        vehicle: "YT-2400 light freighter",
        homeworld: "Alderaan",
        species: "Human",
        affiliation: "None",
        type: CrewMemberType.NPC,
        image: "images/crew/pyke.png",
      }),
    );
    this.addCrewMember(
      new CrewMember({
        name: "Jo Larpe",
        occupation:
          "Not the Character You're Looking For. Sometimes does odd jobs for the CSL ground crew",
        biography: `Jo Larpe spends his days hanging around the cantina and taking whatever jobs suit him. He's familiar with the outpost, and can help you get where you're going if you are lost.`,
        companion: undefined,
        vehicle: "V-35 Courier Landspeeder",
        homeworld: "Nar Shaddaa",
        species: undefined,
        affiliation: "Unaffiliated",
        type: CrewMemberType.NPC,
        image: "images/crew/joe.png",
      }),
    );
    /*this.addCrewMember(new CrewMember({
            name: undefined,
            occupation: undefined,
            biography: undefined,
            companion: undefined,
            vehicle: undefined,
            homeworld: undefined,
            species: undefined,
            affiliation: undefined,
            type: undefined,
            image: undefined,
        }));*/
  }

  addCrewMember(crewMemeber: CrewMember) {
    const typeList = this.crew.get(crewMemeber.type);
    typeList.push(crewMemeber);
  }

  getLeaders() {
    return this.crew.get(CrewMemberType.Faction_Leader);
  }

  getNPCs() {
    return this.crew.get(CrewMemberType.NPC);
  }

  get(crewMemeberType: string) {
    return this.crew.get(crewMemeberType);
  }
}

export function displayCrewManifest(crewMembers: CrewManifest) {
  console.log("Building the crew manifest display");
  const crewMemberTypesToSort = [
    CrewMemberType.Faction_Leader,
    CrewMemberType.NPC,
  ];
  const newCrewManifestList = [];

  for (const crewType of crewMemberTypesToSort) {
    console.log(crewType);

    //create type list
    const crewTypeListItem = document.createElement("li");
    crewTypeListItem.className = "cargo-type-text";
    crewTypeListItem.appendChild(document.createTextNode(crewType));

    const crewTypeList = document.createElement("ul");
    crewTypeListItem.appendChild(crewTypeList);

    //populate type list with each instance of that type
    for (const crewMember of crewMembers.get(crewType)) {
      console.log(crewMember);
      //load the image
      const crewMemberHeadshot = document.createElement("img");
      crewMemberHeadshot.className = "scanned-list-item-image";
      const imgUrl = new URL(`../${crewMember.image}`, import.meta.url).href;
      crewMemberHeadshot.src = imgUrl;

      crewMemberHeadshot.addEventListener("click", () => {
        const crewManifest = document.getElementById("crew-manifest")!;
        const crewMemberDiv = document.getElementById("crew-member")!;
        crewManifest.style.display = "none";
        crewMemberDiv.style.display = "block";

        const crewMemberPicture = document.getElementById(
          "crew-member-picture",
        ) as HTMLImageElement;
        const crewMemberName = document.getElementById("crew-member-name")!;
        const crewMemberDetails = document.getElementById(
          "crew-member-details",
        )!;
        const crewMemberDetailsListItems: HTMLLIElement[] = [];

        //fill in the details
        crewMemberName.textContent = crewMember.name;
        const imgUrl = new URL(`../${crewMember.image}`, import.meta.url).href;
        crewMemberPicture.src = imgUrl;

        function createCrewMemberListItem(text: string, content: string) {
          if (content !== undefined) {
            const crewMemberListItem = document.createElement("li");
            crewMemberListItem.className = "scanned-list-item-text multi-line";
            crewMemberListItem.textContent = `${text}: ` + content;
            crewMemberDetailsListItems.push(crewMemberListItem);
          }
        }

        createCrewMemberListItem("Occupation", crewMember.occupation);
        createCrewMemberListItem("Affiliation", crewMember.affiliation);
        createCrewMemberListItem("Homeworld", crewMember.homeworld);
        createCrewMemberListItem("Companion", crewMember.companion);
        createCrewMemberListItem("Vehicle", crewMember.vehicle);
        createCrewMemberListItem("Species", crewMember.species);
        createCrewMemberListItem("Biography", crewMember.biography);

        crewMemberDetails.replaceChildren(...crewMemberDetailsListItems);
      });

      //add the item to the scanned list
      const crewMemberListItem = document.createElement("li");
      crewMemberListItem.className = "scanned-list-item-text";
      crewMemberListItem.appendChild(crewMemberHeadshot);
      crewMemberListItem.appendChild(
        document.createTextNode("  " + crewMember.name),
      );

      crewTypeList.appendChild(crewMemberListItem);
    }
    newCrewManifestList.push(crewTypeListItem);
  }

  const crewManifestList = document.getElementById("crew-manifests-list")!;
  crewManifestList.replaceChildren(...newCrewManifestList);
}
