export const CrewMemberType = Object.freeze({
    Faction_Leader: 'AARC Agent',
    NPC: 'Informant',
    Virtual: 'Remote',
});

export class CrewMember {
    constructor({name, occupation, biography, companion, vehicle, homeworld, species, affiliation, type, image}) {
        this.name=name;
        this.occupation=occupation;
        this.biography=biography;
        this.companion=companion;
        this.vehicle=vehicle;
        this.homeworld=homeworld;
        this.species=species;
        this.affiliation=affiliation;
        this.type=type;
        this.image=image;
    }
}

export class CrewManifest {
    crew = new Map();

    constructor() {
        //create empty arrays
        this.crew.set(CrewMemberType.Faction_Leader, new Array());
        this.crew.set(CrewMemberType.NPC, new Array());
        this.crew.set(CrewMemberType.Virtual, new Array());

        console.log("Empty crew manifest");
        console.log(this.crew);
        this.addCrewMember(new CrewMember({
            name: 'Lt Rook Darkazanli',
            occupation: 'Soldier',
            biography: `Rook was born to Rebel parents and grew up on Hoth. She has never stayed on a single planet for longer than two years, other than a brief attempt to settle down with her family on Chandrila.

After the New Republic government was established and her parents settled down into roles in the ever-smaller New Republic military, Rook took to freelancing to make a name for herself. She became part of the crew of the Icarus and transported cargo across the galaxy.
            
However, the peace was not to last. The First Order soon became a big enough threat that Senator Leia Organa and several other Rebel veterans formed the Resistance. Rook and the Icarus crew offered their services to now General Leia. Rook's parents were killed in the attack on Hosnian Prime by the Starkiller weapon, and ever since she has vowed to see The First Order defeated.`,
            companion: undefined,
            vehicle: 'T-70 X wing',
            homeworld: 'Hoth',
            species: 'Human',
            affiliation: 'Rebellion//Resistance',
            type: CrewMemberType.Faction_Leader,
            image: 'images/crew/rook.png'
        }));
        this.addCrewMember(new CrewMember({
            name: 'Pyke Rendessa',
            occupation: undefined,
            biography: `Pyke Rendessa is a smuggler who does a lot of import/export work, and one day Dok Ondar asked for his services. Once a shipment of lightsabers came Pyke's way, his curiosity got the best of him. Pyke kept one saber for himself. thinking they were real. When Pyke tried to use the saber in combat, he quickly found out they were training replicas. Pyke ultimately gave up smuggling when his whole crew was murdered by Dok

            Pyke was the sole survivor of the ambush. Once the smoke cleared, Pyke got out of the business and decided to go legit. Dok has called Pyke for a job, not knowing Pyke is out of the "game". Dok is also clueless to the fact that Pyke is looking for revenge against him.`,
            companion: 'Porgkins',
            vehicle: 'YT-2400 light freighter',
            homeworld: 'Alderaan',
            species: 'Human',
            affiliation: 'None',
            type: CrewMemberType.NPC,
            image: 'images/crew/pyke.png',
        }));
        this.addCrewMember(new CrewMember({
            name: 'Jo Larpe',
            occupation: 'Not the Character You\'re Looking For. Sometimes does odd jobs for the CSL ground crew',
            biography: `Jo Larpe spends his days hanging around the cantina and taking whatever jobs suit him. He's familiar with the outpost, and can help you get where you're going if you are lost.`,
            companion: undefined,
            vehicle: 'V-35 Courier Landspeeder',
            homeworld: 'Nar Shaddaa',
            species: undefined,
            affiliation: 'Unaffiliated',
            type: CrewMemberType.NPC,
            image: 'images/crew/joe.png',
        }));
        this.addCrewMember(new CrewMember({
            name: 'Jax Volta',
            occupation: undefined,
            biography: `Hailing from the bustling planet of Corellia, Jax Volta was born into a life of comfort and privilege, the son of two upper-middle-class accountant parents who had built a boringly predictable, if stable life within Corellia's financial sector. However, Jax's heart was never in the world of numbers and ledgers. From a young age, he felt a pull toward adventure and speed.

            Jax took up swoop racing and sharpened his skills on Corellia's dangerous underground swoop tracks, eventually winning the Onderon Rally.
            
            Jax was later drawn to the allure of the galactic underworld, and carved out a niche for himself as a respected smuggler.`,
            companion: undefined,
            vehicle: 'YT-2500',
            homeworld: 'Corellia',
            species: 'Human',
            affiliation: 'Self',
            type: CrewMemberType.NPC,
            image: 'images/crew/jax.png',
        }));
        this.addCrewMember(new CrewMember({
            name: 'Lias Orion',
            occupation: 'BD-72',
            biography: `At the age of 5. Lias Orion lost his father during the battle of Jakku. His mother disappeared upon receiving the news and Lias was left with his 2 year old sister. A'nah. Lias and A'nah were taken in by Maz Kanata under the condition that Lias would forever work in her castle as a runner to "take care of the things I would do 500 years ago? Lias learned about the galaxy from Maz.

            During the Battle of Takodana with the First Order, A'nah was caught in action and died. The destruction of the castle and his sister’s death left Lias devastated and vengeful! He recalled what Maz taught him about the partisans and Saw Gerrera which inspired Lias to begin a faction of his own entitled "The Cause" to give the galaxy what he calls "True Freedom.”`,
            companion: undefined,
            vehicle: 'WTK-85A Interstellar transport',
            homeworld: 'Takodana',
            species: 'Human',
            affiliation: 'The Cause',
            type: CrewMemberType.Faction_Leader,
            image: 'images/crew/lias.png',
        }));
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

    addCrewMember(crewMemeber) {
        const typeList = this.crew.get(crewMemeber.type);
        console.log("PRINTING TYPELIST");
        console.log(crewMemeber.type);
        console.log(typeList);
        typeList.push(crewMemeber);
    }

    getLeaders() {
        return this.crew.get(CrewMemberType.Faction_Leader);
    }

    getNPCs() {
        return this.crew.get(CrewMemberType.NPC);
    }

    get(crewMemeberType) {
        return this.crew.get(crewMemeberType);
    }
}