export const CrateType = Object.freeze({
    Halcyon_Cargo: 'Halcyon Cargo',
    Outfit: 'Outfit',
    Empty: 'Empty',
    Weapon: 'Weapon',
    Cargo: 'Cargo',
    Parts_and_Scraps: 'Parts and Scraps',
    Program: 'Program',
    Vehicle: 'Vehicle',
    Ports_Of_Call: 'Ports of Call',
    Relic: 'Relic',
});

export class CrateContents {
    constructor({code, contents, type, image}) {
        this.code=code;
        this.contents=contents;
        this.type=type;
        this.image=image;
    }
}

export class CrateDecoder {
    contents = new Map();

    constructor() {
        this.contents.set('CAST09', new CrateContents({code: 'CAST09', contents: 'Training Remote', type: CrateType.Halcyon_Cargo}));
        this.contents.set('BC_ST', new CrateContents({code: 'BC_ST', contents: 'Ewok Disguise', type: CrateType.Outfit}));
        this.contents.set('BC_ST', new CrateContents({code: 'BC_ST', contents: 'Ewok Disguise', type: CrateType.Outfit}));
        this.contents.set('AB_PQ', new CrateContents({code: 'AB_PQ', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('AB_ST', new CrateContents({code: 'AB_ST', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('BC_TU', new CrateContents({code: 'BC_TU', contents: 'Batuu Sun Outfit', type: CrateType.Outfit}));
        this.contents.set('FAL13', new CrateContents({code: 'FAL13', contents: 'Stormtrooper Armor', type: CrateType.Outfit}));
        this.contents.set('JK_ST', new CrateContents({code: 'JK_ST', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('FG_RS', new CrateContents({code: 'FG_RS', contents: 'Gungan Personal Energy Shield', type: CrateType.Weapon}));
        this.contents.set('AB_OP', new CrateContents({code: 'AB_OP', contents: '7-PrG Proton Grenade', type: CrateType.Weapon}));
        this.contents.set('FG_QR', new CrateContents({code: 'FG_QR', contents: 'Condiments', type: CrateType.Cargo}));
        this.contents.set('FAL16', new CrateContents({code: 'FAL16', contents: 'DUM-series Pit droid, Class 2 Heads', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL09', new CrateContents({code: 'FAL09', contents: 'Osteo Fragmenter', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL12', new CrateContents({code: 'FAL12', contents: 'Droid Holoprojector', type: CrateType.Parts_and_Scraps}));
        this.contents.set('GI_QR', new CrateContents({code: 'GI_QR', contents: 'Plush Toys', type: CrateType.Cargo}));
        this.contents.set('FG_ST', new CrateContents({code: 'FG_ST', contents: 'Data Chip', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CD_ST', new CrateContents({code: 'CD_ST', contents: 'Embo-style Outfit', type: CrateType.Outfit}));
        this.contents.set('GI_NO', new CrateContents({code: 'GI_NO', contents: 'Loth-cat Chow', type: CrateType.Cargo}));
        this.contents.set('GI_LM', new CrateContents({code: 'GI_LM', contents: 'A99 Aquata Breather', type: CrateType.Cargo}));
        this.contents.set('FAL15', new CrateContents({code: 'FAL15', contents: 'Imperial E-11 Blaster Rifle', type: CrateType.Weapon}));
        this.contents.set('FAL14', new CrateContents({code: 'FAL14', contents: 'Computer Probe Arm (R-unit)', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CAST07', new CrateContents({code: 'CAST07', contents: 'Jedi Testing Viewscreen', type: CrateType.Halcyon_Cargo}));
        this.contents.set('FAL10', new CrateContents({code: 'FAL10', contents: 'Kyber Crystals - Green', type: CrateType.Parts_and_Scraps}));
        this.contents.set('EF_TU', new CrateContents({code: 'EF_TU', contents: 'DL-44 Heavy Blaster Pistol', type: CrateType.Weapon}));
        this.contents.set('CD_LM', new CrateContents({code: 'CD_LM', contents: 'First Order Outfit', type: CrateType.Outfit}));
        this.contents.set('AB_LM', new CrateContents({code: 'AB_LM', contents: 'Imperial E-11 Blaster Rifle', type: CrateType.Weapon}));
        this.contents.set('AB_QR', new CrateContents({code: 'AB_QR', contents: 'Concussion Disc', type: CrateType.Weapon}));
        this.contents.set('BC_PQ', new CrateContents({code: 'BC_PQ', contents: 'Mon Calamari Outfit', type: CrateType.Outfit}));
        this.contents.set('FG_TU', new CrateContents({code: 'FG_TU', contents: 'Gaming Kit', type: CrateType.Cargo}));
        this.contents.set('JK_QR', new CrateContents({code: 'JK_QR', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('KL_QR', new CrateContents({code: 'KL_QR', contents: 'Porg Toys', type: CrateType.Halcyon_Cargo}));
        this.contents.set('DE_TU', new CrateContents({code: 'DE_TU', contents: 'DUM-series Pit droid, Class 2 Heads', type: CrateType.Parts_and_Scraps}));
        this.contents.set('DE_UV', new CrateContents({code: 'DE_UV', contents: 'Magnetic Field Condenser', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL11', new CrateContents({code: 'FAL11', contents: 'Diatium Power Core', type: CrateType.Parts_and_Scraps}));
        this.contents.set('KL_OP', new CrateContents({code: 'KL_OP', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('CAST19', new CrateContents({code: 'CAST19', contents: 'Ship Shutdown Data', type: CrateType.Program}));
        this.contents.set('CAST02', new CrateContents({code: 'CAST02', contents: 'Coaxium Coordinates', type: CrateType.Program}));
        this.contents.set('EF_LM', new CrateContents({code: 'EF_LM', contents: 'Droid Holoprojector', type: CrateType.Parts_and_Scraps}));
        this.contents.set('IJ_RS', new CrateContents({code: 'IJ_RS', contents: '7-PrG Proton Grenade', type: CrateType.Weapon}));
        this.contents.set('JK_MN', new CrateContents({code: 'JK_MN', contents: 'Food Ration Packs', type: CrateType.Cargo}));
        this.contents.set('CAST20', new CrateContents({code: 'CAST20', contents: 'Hyperspace Tracking Schematic', type: CrateType.Program}));
        this.contents.set('CD_TU', new CrateContents({code: 'CD_TU', contents: 'Ohnaka Transport Solutions Uniform', type: CrateType.Outfit}));
        this.contents.set('FAL01', new CrateContents({code: 'FAL01', contents: 'Imperial E-11 Blaster Rifle', type: CrateType.Weapon}));
        this.contents.set('FG_LM', new CrateContents({code: 'FG_LM', contents: 'MSE-6 Series "Mouse Droid" Casing', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL30', new CrateContents({code: 'FAL30', contents: 'Loth-cat Chow', type: CrateType.Cargo}));
        this.contents.set('AB_UV', new CrateContents({code: 'AB_UV', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('KL_PQ', new CrateContents({code: 'KL_PQ', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('AB_NO', new CrateContents({code: 'AB_NO', contents: 'Bowcaster', type: CrateType.Weapon}));
        this.contents.set('FAL07', new CrateContents({code: 'FAL07', contents: '7-PrG Proton Grenade', type: CrateType.Weapon}));
        this.contents.set('FAL18', new CrateContents({code: 'FAL18', contents: 'Data Chip', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CAST14', new CrateContents({code: 'CAST14', contents: 'Cargo Anomalies', type: CrateType.Program}));
        this.contents.set('DE_QR', new CrateContents({code: 'DE_QR', contents: 'Kyber Crystals - Green', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CAST15', new CrateContents({code: 'CAST15', contents: 'First Order Transmitter', type: CrateType.Halcyon_Cargo}));
        this.contents.set('FAL20', new CrateContents({code: 'FAL20', contents: 'Magnetic Field Condenser', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CAST11', new CrateContents({code: 'CAST11', contents: 'Halcyon', type: CrateType.Vehicle}));
        this.contents.set('JK_OP', new CrateContents({code: 'JK_OP', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('KL_NO', new CrateContents({code: 'KL_NO', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('FAL02', new CrateContents({code: 'FAL02', contents: 'NN-14 Blaster Pistol', type: CrateType.Weapon}));
        this.contents.set('CAST08', new CrateContents({code: 'CAST08', contents: 'Lost Holocron', type: CrateType.Halcyon_Cargo}));
        this.contents.set('CAST06', new CrateContents({code: 'CAST06', contents: 'Autopilot Override Program', type: CrateType.Program}));
        this.contents.set('AB_TU', new CrateContents({code: 'AB_TU', contents: 'NN-14 Blaster Pistol', type: CrateType.Weapon}));
        this.contents.set('FAL17', new CrateContents({code: 'FAL17', contents: 'Security Enhanced Comlink', type: CrateType.Parts_and_Scraps}));
        this.contents.set('IJ_MN', new CrateContents({code: 'IJ_MN', contents: 'Tracer Beacon', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL21', new CrateContents({code: 'FAL21', contents: 'Bowcaster', type: CrateType.Weapon}));
        this.contents.set('FG_OP', new CrateContents({code: 'FG_OP', contents: 'Salvage Cleaning Kit', type: CrateType.Cargo}));
        this.contents.set('BC_LM', new CrateContents({code: 'BC_LM', contents: 'Resistance Flight Uniform', type: CrateType.Outfit}));
        this.contents.set('EF_QR', new CrateContents({code: 'EF_QR', contents: 'Diatium Power Core', type: CrateType.Parts_and_Scraps}));
        this.contents.set('AB_RS', new CrateContents({code: 'AB_RS', contents: 'T-47 Airspeeder Harpoon Gun', type: CrateType.Weapon}));
        this.contents.set('GI_MN', new CrateContents({code: 'GI_MN', contents: 'Spice', type: CrateType.Cargo}));
        this.contents.set('FAL23', new CrateContents({code: 'FAL23', contents: 'Neuro-Saav TE4.4 Field Quadnoculars', type: CrateType.Cargo}));
        this.contents.set('FAL06', new CrateContents({code: 'FAL06', contents: 'Z-6 Jetpack', type: CrateType.Weapon}));
        this.contents.set('FG_NO', new CrateContents({code: 'FG_NO', contents: 'Food Ration Packs', type: CrateType.Cargo}));
        this.contents.set('IJ_ST', new CrateContents({code: 'IJ_ST', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('FAL03', new CrateContents({code: 'FAL03', contents: 'Kyber Crystals - Blue', type: CrateType.Parts_and_Scraps}));
        this.contents.set('BC_MN', new CrateContents({code: 'BC_MN', contents: 'Resistance Ground Forces Outfit', type: CrateType.Outfit}));
        this.contents.set('IJ_UV', new CrateContents({code: 'IJ_UV', contents: 'Coded Communicator', type: CrateType.Cargo}));
        this.contents.set('KL_ST', new CrateContents({code: 'KL_ST', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('BC_OP', new CrateContents({code: 'BC_OP', contents: 'Death Star Gunner Uniform', type: CrateType.Outfit}));
        this.contents.set('KL_LM', new CrateContents({code: 'KL_LM', contents: 'Jedi Crusader Necklace', type: CrateType.Halcyon_Cargo}));
        this.contents.set('JK_TU', new CrateContents({code: 'JK_TU', contents: 'Hayananeya Data', type: CrateType.Program}));
        this.contents.set('CAST18', new CrateContents({code: 'CAST18', contents: 'Ports of Call Anomalies', type: CrateType.Ports_Of_Call}));
        this.contents.set('CAST17', new CrateContents({code: 'CAST17', contents: 'All-Kit [Halcyon Cargo]', type: CrateType.Halcyon_Cargo}));
        this.contents.set('JK_LM', new CrateContents({code: 'JK_LM', contents: 'Medical Equipment Bags', type: CrateType.Cargo}));
        this.contents.set('KL_TU', new CrateContents({code: 'KL_TU', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('EF_PQ', new CrateContents({code: 'EF_PQ', contents: 'Osteo Fragmenter [Parts & Scraps]', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CD_QR', new CrateContents({code: 'CD_QR', contents: 'Marauder Armor', type: CrateType.Outfit}));
        this.contents.set('JK_NO', new CrateContents({code: 'JK_NO', contents: 'Tank Containing Bacta Fluid', type: CrateType.Cargo}));
        this.contents.set('EF_MN', new CrateContents({code: 'EF_MN', contents: 'Tracer Beacon', type: CrateType.Parts_and_Scraps}));
        this.contents.set('GI_OP', new CrateContents({code: 'GI_OP', contents: 'Medical Equipment Bags', type: CrateType.Cargo}));
        this.contents.set('BC_RS', new CrateContents({code: 'BC_RS', contents: 'Batuu Rain Outfit', type: CrateType.Outfit}));
        this.contents.set('JK_UV', new CrateContents({code: 'JK_UV', contents: 'Tool Demagnetizer', type: CrateType.Halcyon_Cargo}));
        this.contents.set('DE_MN', new CrateContents({code: 'DE_MN', contents: 'Vaporator Blades', type: CrateType.Parts_and_Scraps}));
        this.contents.set('EF_ST', new CrateContents({code: 'EF_ST', contents: 'Security Enhanced Comlink', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL24', new CrateContents({code: 'FAL24', contents: 'Spice', type: CrateType.Cargo}));
        this.contents.set('JK_RS', new CrateContents({code: 'JK_RS', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('EF_UV', new CrateContents({code: 'EF_UV', contents: 'F-11D Blaster Rifle', type: CrateType.Weapon}));
        this.contents.set('IJ_NO', new CrateContents({code: 'IJ_NO', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('FAL05', new CrateContents({code: 'FAL05', contents: 'Resistance Flight Uniform', type: CrateType.Outfit}));
        this.contents.set('EF_RS', new CrateContents({code: 'EF_RS', contents: 'Hang Glider', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL25', new CrateContents({code: 'FAL25', contents: 'RA-7 Personal Servant Droid Arm', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CAST03', new CrateContents({code: 'CAST03', contents: 'Droid Unbolting Program', type: CrateType.Program}));
        this.contents.set('FAL19', new CrateContents({code: 'FAL19', contents: 'Tracer Beacon', type: CrateType.Parts_and_Scraps}));
        this.contents.set('IJ_PQ', new CrateContents({code: 'IJ_PQ', contents: 'Glie-44 Blaster Pistol', type: CrateType.Weapon}));
        this.contents.set('CAST10', new CrateContents({code: 'CAST10', contents: 'First Order Credentials', type: CrateType.Program}));
        this.contents.set('FAL22', new CrateContents({code: 'FAL22', contents: 'A99 Aquata Breather', type: CrateType.Cargo}));
        this.contents.set('KL_RS', new CrateContents({code: 'KL_RS', contents: 'All-Kit', type: CrateType.Halcyon_Cargo}));
        this.contents.set('GI_PQ', new CrateContents({code: 'GI_PQ', contents: 'Star Destroyer Capacitor Bearing', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CAST12', new CrateContents({code: 'CAST12', contents: 'Decoy Stone', type: CrateType.Halcyon_Cargo}));
        this.contents.set('DE_PQ', new CrateContents({code: 'DE_PQ', contents: 'Kyber Crystals - Blue', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL04', new CrateContents({code: 'FAL04', contents: 'Carbon Chisel', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL29', new CrateContents({code: 'FAL29', contents: 'Medical Equipment Bags', type: CrateType.Cargo}));
        this.contents.set('KL_UV', new CrateContents({code: 'KL_UV', contents: 'No immediate reward. -- likely part of challenge', type: CrateType.Empty}));
        this.contents.set('IJ_TU', new CrateContents({code: 'IJ_TU', contents: 'Neuro-Saav TE4.4 Field Quadnoculars', type: CrateType.Cargo}));
        this.contents.set('EF_OP', new CrateContents({code: 'EF_OP', contents: 'Carbon Chisel', type: CrateType.Parts_and_Scraps}));
        this.contents.set('DE_NO', new CrateContents({code: 'DE_NO', contents: 'AT-AT Targeting Computer', type: CrateType.Parts_and_Scraps}));
        this.contents.set('CAST05', new CrateContents({code: 'CAST05', contents: 'Datatapes', type: CrateType.Halcyon_Cargo}));
        this.contents.set('CAST01', new CrateContents({code: 'CAST01', contents: 'Coaxium', type: CrateType.Halcyon_Cargo}));
        this.contents.set('FAL28', new CrateContents({code: 'FAL28', contents: 'Jawa Outfit', type: CrateType.Outfit}));
        this.contents.set('CAST16', new CrateContents({code: 'CAST16', contents: 'Personnel Anomalies', type: CrateType.Program}));
        this.contents.set('DE_LM', new CrateContents({code: 'DE_LM', contents: 'RA-7 Personal Servant Droid Arm', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FG_PQ', new CrateContents({code: 'FG_PQ', contents: 'Sewing Thread', type: CrateType.Cargo}));
        this.contents.set('CD_RS', new CrateContents({code: 'CD_RS', contents: 'Leather Armor', type: CrateType.Outfit}));
        this.contents.set('JK_PQ', new CrateContents({code: 'JK_PQ', contents: 'Engineering Tools', type: CrateType.Halcyon_Cargo}));
        this.contents.set('DE_ST', new CrateContents({code: 'DE_ST', contents: 'Kyber Crystals - Purple', type: CrateType.Parts_and_Scraps}));
        this.contents.set('EF_NO', new CrateContents({code: 'EF_NO', contents: 'Computer Probe Arm (R-unit)', type: CrateType.Parts_and_Scraps}));
        this.contents.set('BC_NO', new CrateContents({code: 'BC_NO', contents: 'Stormtrooper Armor', type: CrateType.Outfit}));
        this.contents.set('IJ_QR', new CrateContents({code: 'IJ_QR', contents: 'Pyro Denton Explosive', type: CrateType.Weapon}));
        this.contents.set('FG_MN', new CrateContents({code: 'FG_MN', contents: 'First Order Binders', type: CrateType.Parts_and_Scraps}));
        this.contents.set('FAL26', new CrateContents({code: 'FAL26', contents: 'Plush Toys', type: CrateType.Cargo}));
        this.contents.set('FG_UV', new CrateContents({code: 'FG_UV', contents: 'Neuro-Saav TE4.4 Field Quadnoculars', type: CrateType.Cargo}));
        this.contents.set('DE_OP', new CrateContents({code: 'DE_OP', contents: 'Jawa Outfit [Outfit]', type: CrateType.Outfit}));
        this.contents.set('DE_RS', new CrateContents({code: 'DE_RS', contents: 'Kyber Crystals - Red', type: CrateType.Parts_and_Scraps}));
        this.contents.set('IJ_LM', new CrateContents({code: 'IJ_LM', contents: 'Concussion Disc', type: CrateType.Weapon}));
        this.contents.set('CAST13', new CrateContents({code: 'CAST13', contents: 'Hayananeya Schematic', type: CrateType.Program}));
        this.contents.set('FAL08', new CrateContents({code: 'FAL08', contents: 'Concussion Disc', type: CrateType.Weapon}));
        this.contents.set('FAL27', new CrateContents({code: 'FAL27', contents: 'AT-AT Targeting Computer', type: CrateType.Parts_and_Scraps}));
        this.contents.set('AB_MN', new CrateContents({code: 'AB_MN', contents: 'Z-6 Jetpack', type: CrateType.Weapon}));
        this.contents.set('IJ_OP', new CrateContents({code: 'IJ_OP', contents: 'Batuu Sun Outfit', type: CrateType.Outfit}));
        this.contents.set('CAST04', new CrateContents({code: 'CAST04', contents: 'Resistance Coordinates', type: CrateType.Program}));
    }

    decode(code) {
        if (this.contents.has(code)) {
            let crate = this.contents.get(code);
            if (crate.image === undefined || crate.image == "") {
                if (crate.type == CrateType.Halcyon_Cargo) {
                    crate.image = "images/halcyon_cargo.jpeg";
                } else if (crate.type == CrateType.Outfit) {
                    crate.image = "images/outfit.jpeg";
                } else if (crate.type == CrateType.Empty) {
                    crate.image = "images/empty.jpeg";
                } else if (crate.type == CrateType.Weapon) {
                    crate.image = "images/weapon.jpeg"
                } else if (crate.type == CrateType.Cargo) {
                    crate.image = "images/cargo.jpeg"
                } else if (crate.type == CrateType.Parts_and_Scraps) {
                    crate.image = "images/parts_and_scraps.jpeg"
                } else if (crate.type == CrateType.Program) {
                    crate.image = "images/program.jpeg"
                } else if (crate.type == CrateType.Vehicle) {
                    crate.image = "images/vehicle.jpeg"
                } else if (crate.type == CrateType.Ports_Of_Call) {
                    crate.image = "images/ports_of_call.jpeg"
                } else {
                    crate.image = "images/aarc.jpg"
                }
            }

            return this.contents.get(code);
        } else {
            return new CrateContents({code: '?????', contents: 'Unknown contents', type: CrateType.Empty});
        }
    }

    override(crate) {
        this.contents.set(crate.code, crate);
    }

    sortCargoHold(cargoHold) {
        const sortedCargoHold = new Map();

        console.log("Sorting cargo...")

        for (const code of cargoHold) {
            const crate = this.decode(code);
            if (!sortedCargoHold.has(crate.type)) {
                sortedCargoHold.set(crate.type, new Set());
            }
            const typeSet = sortedCargoHold.get(crate.type);
            typeSet.add(crate);
        }

        console.log(sortedCargoHold);

        return sortedCargoHold;
    }
}