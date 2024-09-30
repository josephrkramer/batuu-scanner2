import initializeBaseCrateContents from "../utils/initializeBaseCrateContents";
import { BadgeDecoder } from "./badge-decoder";
import { ChainCodeAlignmentCode } from "./chain-code";

export const CrateType = Object.freeze({
  Halcyon_Cargo: "Halcyon Cargo",
  Outfit: "Outfit",
  Empty: "Empty",
  Weapon: "Weapon",
  Cargo: "Cargo",
  Parts_and_Scraps: "Parts and Scraps",
  Program: "Program",
  Vehicle: "Vehicle",
  Ports_Of_Call: "Ports of Call",
  Relic: "Relic",
  Unknown: "Unknown",
  Multiple_Choice: "Multiple Choice",
});

export class CrateContents {
  code: string;
  contents: string;
  detailedDescription: string;
  locationDescription: string;
  type: string;
  image: string;
  alignment: string;
  multipleChoice: CrateContents[] = [];

  constructor({
    code = "",
    contents = "",
    detailedDescription = "",
    locationDescription = "",
    type = "",
    image = "",
    alignment = "",
  }) {
    this.code = code;
    this.contents = contents;
    this.detailedDescription = detailedDescription;
    this.locationDescription = locationDescription;
    this.type = type;
    this.image = image;
    this.alignment = alignment;
  }
}

export class CrateDecoder {
  contents = new Map<string, CrateContents>();
  scannedCrates: Set<string>;
  setScannedCrates: React.Dispatch<React.SetStateAction<Set<string>>>;
  multipleChoiceScannedCrates: Map<string, CrateContents>;
  setMultipleChoiceScannedCrates: React.Dispatch<
    React.SetStateAction<Map<string, CrateContents>>
  >;
  renderMultipleChoiceCrateCode: string | undefined;
  setRenderMultipleChoiceCrateCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setCrateToDisplay: React.Dispatch<
    React.SetStateAction<CrateContents | undefined>
  >;

  constructor(
    scannedCrates: Set<string>,
    setScannedCrates: React.Dispatch<React.SetStateAction<Set<string>>>,
    multipleChoiceScannedCrates: Map<string, CrateContents>,
    setMultipleChoiceScannedCrates: React.Dispatch<
      React.SetStateAction<Map<string, CrateContents>>
    >,
    renderMultipleChoiceCrateCode: string | undefined,
    setRenderMultipleChoiceCrateCode: React.Dispatch<
      React.SetStateAction<string | undefined>
    >,
    setCrateToDisplay: React.Dispatch<
      React.SetStateAction<CrateContents | undefined>
    >,
  ) {
    this.scannedCrates = scannedCrates;
    this.setScannedCrates = setScannedCrates;
    this.multipleChoiceScannedCrates = multipleChoiceScannedCrates;
    this.setMultipleChoiceScannedCrates = setMultipleChoiceScannedCrates;
    this.renderMultipleChoiceCrateCode = renderMultipleChoiceCrateCode;
    this.setRenderMultipleChoiceCrateCode = setRenderMultipleChoiceCrateCode;
    this.setCrateToDisplay = setCrateToDisplay;

    //Initialize the default based on the official app
    initializeBaseCrateContents(this.contents);

    //Add custom overrides for the event
    this.override(
      new CrateContents({
        code: "JK_RS",
        contents: "Halcyon Pool Access Card",
        locationDescription: "Oga's Halcyon Coaster",
        type: CrateType.Relic,
        image: "./halcyon_pool_keycard.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "1",
        contents: "Bioplaiting Device",
        detailedDescription: "Used by Darth Plagueis",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./darth_plagueis.jpeg",
      }),
    );
    this.override(
      new CrateContents({
        code: "2",
        contents: "Fragment of the Tho Yor",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./tho_yor.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "3",
        contents: "Seed Pod",
        detailedDescription:
          "Seed pod of the Wroshyr Tree leftover from the terraforming of Kashyyk by the Rakata",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./wroshyr_tree.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "4",
        contents: "Durasteel Fragment",
        detailedDescription:
          "Durasteel Fragment of the Great Hall of the Nihil",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./nihil_durasteel.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "5",
        contents: "Holocron Shard",
        detailedDescription:
          "Shard of the Darth Nul Holocron from the Ord Mantell Civil War",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./holocron_shard.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "6",
        contents: "Petrified Wood",
        detailedDescription:
          "From the Primordial Forest on Mustafar, now just a memory",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./mustafar_wood.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "7",
        contents: "Junkyard Wreckage",
        detailedDescription: "Wreckage from the Plutt junkyard on Jakku",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./junkyard_wreckage.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "8",
        contents: "Stone Head",
        detailedDescription:
          "Miniature of a stone head from an ancient civilization of Naboo",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./stone_head.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "9",
        contents: "Mining Equipment",
        detailedDescription:
          "Mining equipment used by Czerka Arms' enslaved workers on Hosnian Prime",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./mining_equipment.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "10",
        contents: "Jedi Temple Piece",
        detailedDescription: "Piece of the Jedi Temple on Ashas Ree",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./jedi_temple_piece.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "11",
        contents: "Omni-communicator",
        detailedDescription:
          "Omni-communicator from an Imperial Star Destroyer",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./omni-communicator.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "12",
        contents: "Cassius Tea Cup",
        detailedDescription:
          "Used during the private meeting between Pre Vizla and Maul",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./tea_cup.jpg",
      }),
    );
    this.override(
      new CrateContents({
        code: "13",
        contents: "Halcyon Coordinates",
        detailedDescription: "Coordinates of a recent sighting of the Halcyon",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./halcyon_coords.jpg",
      }),
    );

    //La'Beth
    //TODO: Place crate on-planet
    this.override(
      new CrateContents({
        code: "14",
        contents: "Loth-cat in carbonite",
        detailedDescription: "Loth-cat locked in carbonite",
        locationDescription: "???",
        type: CrateType.Relic,
        image: "./CarboniteLothCat.png",
      }),
    );
    this.override(
      new CrateContents({
        code: "BC_TU",
        contents: "Loth-wolf in carbonite",
        detailedDescription: "Loth-wolf locked in carbonite",
        locationDescription: "Across from Oga's, white crate",
        type: CrateType.Relic,
        image: "./CarboniteLothWolf.png",
      }),
    );
    this.override(
      new CrateContents({
        code: "DE_LM",
        contents: "Hydrominae in carbonite",
        detailedDescription: "Hydrominae locked in carbonite",
        locationDescription: "Bounty Hunter stand bottom brown crate",
        type: CrateType.Relic,
        image: "./CarboniteHydrominae.png",
      }),
    );

    //Multiple Choice custom override crates
    const bexCrystals = new CrateContents({
      code: "FG_ST",
      contents: "Odessen Crystals",
      type: CrateType.Multiple_Choice,
      image: "./LargeCrystal.jpg",
    });
    bexCrystals.multipleChoice.push(
      new CrateContents({
        code: bexCrystals.code,
        contents: "Vein of Sterre",
        type: CrateType.Relic,
        image: "./Crystal.jpg",
        alignment: ChainCodeAlignmentCode.Dark,
      }),
    );
    bexCrystals.multipleChoice.push(
      new CrateContents({
        code: bexCrystals.code,
        contents: "Tears of Chandra",
        type: CrateType.Relic,
        image: "./LargeCrystal.jpg",
        alignment: ChainCodeAlignmentCode.Light,
      }),
    );
    this.override(bexCrystals);
    //Dupe crate contents descryption. Determine which is correct
    const bexCrystals2 = new CrateContents({
      code: "FAL18",
      contents: "Odessen Crystals",
      type: CrateType.Multiple_Choice,
      image: "./LargeCrystal.jpg",
    });
    bexCrystals2.multipleChoice.push(
      new CrateContents({
        code: bexCrystals2.code,
        contents: "Vein of Sterre",
        type: CrateType.Relic,
        image: "./Crystal.jpg",
        alignment: ChainCodeAlignmentCode.Dark,
      }),
    );
    bexCrystals2.multipleChoice.push(
      new CrateContents({
        code: bexCrystals2.code,
        contents: "Tears of Chandra",
        type: CrateType.Relic,
        image: "./LargeCrystal.jpg",
        alignment: ChainCodeAlignmentCode.Light,
      }),
    );
    this.override(bexCrystals2);

    const schmeSculpture = new CrateContents({
      code: "DE_RS",
      contents: "Alderaanian Memories",
      type: CrateType.Multiple_Choice,
      image: "./sculpture.jpeg",
    });
    schmeSculpture.multipleChoice.push(
      new CrateContents({
        code: schmeSculpture.code,
        contents: "Rock Ore",
        type: CrateType.Relic,
        image: "./ore.jpeg",
        alignment: ChainCodeAlignmentCode.Dark,
      }),
    );
    schmeSculpture.multipleChoice.push(
      new CrateContents({
        code: schmeSculpture.code,
        contents: '"The Winter\'s Heart"',
        type: CrateType.Relic,
        image: "./sculpture.jpeg",
        alignment: ChainCodeAlignmentCode.Light,
      }),
    );
    this.override(schmeSculpture);

    //Override chosen scanned crates loaded from local storage
    this.multipleChoiceScannedCrates.forEach((crate: CrateContents) => {
      this.override(crate);
    });
  }

  decode(code: string): CrateContents {
    if (this.contents.has(code)) {
      const crate = this.contents.get(code)!;
      if (crate.image === undefined || crate.image == "") {
        switch (crate.type) {
          case CrateType.Halcyon_Cargo:
            crate.image = "./halcyon_cargo.jpeg";
            break;
          case CrateType.Outfit:
            crate.image = "./outfit.jpeg";
            break;
          case CrateType.Empty:
            crate.image = "./empty.jpeg";
            break;
          case CrateType.Weapon:
            crate.image = "./weapon.jpeg";
            break;
          case CrateType.Cargo:
            crate.image = "./cargo.jpeg";
            break;
          case CrateType.Parts_and_Scraps:
            crate.image = "./parts_and_scraps.jpeg";
            break;
          case CrateType.Program:
            crate.image = "./program.jpeg";
            break;
          case CrateType.Vehicle:
            crate.image = "./vehicle.jpeg";
            break;
          case CrateType.Ports_Of_Call:
            crate.image = "./ports_of_call.jpeg";
            break;
          default:
            crate.image = "./aarc.jpg";
        }
      }

      return this.contents.get(code)!;
    } else {
      return new CrateContents({
        code: "?????",
        contents: "Unknown contents",
        type: CrateType.Unknown,
      });
    }
  }

  override(crate: CrateContents): void {
    this.contents.set(crate.code, crate);
  }

  hasCrate(code: string): boolean {
    return this.scannedCrates.has(code);
  }

  reset(): void {
    this.scannedCrates = new Set<string>();
    this.setScannedCrates(new Set<string>());
    this.multipleChoiceScannedCrates = new Map<string, CrateContents>();
    this.setMultipleChoiceScannedCrates(new Map<string, CrateContents>());
  }

  sortCargoHold(admin: boolean): Map<string, Set<CrateContents>> {
    const sortedCargoHold = new Map<string, Set<CrateContents>>();

    console.log("Sorting cargo...");

    for (const code of admin ? this.contents.keys() : this.scannedCrates) {
      const crate = this.decode(code);
      if (!sortedCargoHold.has(crate.type)) {
        sortedCargoHold.set(crate.type, new Set<CrateContents>());
      }
      const typeSet = sortedCargoHold.get(crate.type)!;
      typeSet.add(crate);
    }

    console.log(sortedCargoHold);

    return sortedCargoHold;
  }

  getTotalNumberOfType(type: string) {
    const contentsOfType = new Map(
      [...this.contents].filter((element) => element[1].type === type),
    );
    return contentsOfType.size;
  }

  getScannedNumberOfType(type: string) {
    const fullScannedCrates = new Map();
    for (const code of this.scannedCrates) {
      const crate = this.decode(code);
      fullScannedCrates.set(code, crate);
    }
    const contentsOfType = new Map(
      [...fullScannedCrates].filter((element) => element[1].type === type),
    );
    return contentsOfType.size;
  }

  addToScanned(code: string) {
    console.log(`Adding ${code} to the scanned list`);
    //add the item to the scannedCrates internal tracking
    const tempSet = new Set(this.scannedCrates);
    tempSet.add(code);
    this.scannedCrates = tempSet;
    this.setScannedCrates(tempSet);
  }

  addToScannedMultipleChoice(code: string, crate: CrateContents) {
    console.log(`Adding ${code} to the scanned list`);
    //add the item to the scannedCrates internal tracking
    const tempMap = new Map<string, CrateContents>(
      this.multipleChoiceScannedCrates,
    );
    tempMap.set(code, crate);
    this.setMultipleChoiceScannedCrates(tempMap);
    this.override(crate);
  }

  setResult(code: string, badgeDecoder: BadgeDecoder) {
    if (this.contents.get(code)!.type == CrateType.Multiple_Choice) {
      this.setRenderMultipleChoiceCrateCode(code);
    } else {
      this.setCrateToDisplay(this.decode(code));
      //add the item to the scanned list if not previously scanned
      badgeDecoder.checkForCrateRelatedBadges(code, this);
      if (!this.scannedCrates.has(code)) {
        this.addToScanned(code);
      }
      badgeDecoder.checkForEventRelatedBadges();
    }
  }
}
