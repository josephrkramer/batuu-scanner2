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
        for (const crewType in CrewMemberType) {
            this.crew.set(crewType, []);
        }
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
            image: 'images/outfit.jpeg'
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
                image: 'images/outfit.jpeg',
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
        typeList = this.crew.get(crewMemeber.type);
        typeList.push(crewMemeber);
    }

    getLeaders() {
        return this.crew.get(CrewMemberType.Faction_Leader);
    }

    getNPCs() {
        return this.crew.get(CrewMemberType.NPC);
    }
}