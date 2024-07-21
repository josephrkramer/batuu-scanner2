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
  type: string;
  image: string;
  alignment: string;
  multipleChoice: CrateContents[] = [];

  constructor({
    code = "",
    contents = "",
    type = "",
    image = "",
    alignment = "",
  }) {
    this.code = code;
    this.contents = contents;
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
        contents: "Evan's Manifesto",
        type: CrateType.Relic,
        image: "./halcyon_cargo.jpeg",
      }),
    );
    this.override(
      new CrateContents({
        code: "JK_TU",
        contents: "Tom's Vape Pen",
        type: CrateType.Relic,
        image: "./ports_of_call.jpeg",
      }),
    );

    //Multiple Choice custom override crates
    const chanceCubes = new CrateContents({
      code: "FG_TU",
      contents: "Chance Cubes",
      type: CrateType.Multiple_Choice,
      image: "./crew/joe.png",
    });
    chanceCubes.multipleChoice.push(
      new CrateContents({
        code: chanceCubes.code,
        contents: "Rigged Chance Cubes",
        type: CrateType.Relic,
        image: "./badge/frequent-flyer-2.jpeg",
        alignment: ChainCodeAlignmentCode.Dark,
      }),
    );
    chanceCubes.multipleChoice.push(
      new CrateContents({
        code: chanceCubes.code,
        contents: "Chance Cubes",
        type: CrateType.Relic,
        image: "./badge/frequent-flyer-5.jpeg",
        alignment: ChainCodeAlignmentCode.Light,
      }),
    );
    this.override(chanceCubes);

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

  sortCargoHold(): Map<string, Set<CrateContents>> {
    const sortedCargoHold = new Map<string, Set<CrateContents>>();

    console.log("Sorting cargo...");

    for (const code of this.scannedCrates) {
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
