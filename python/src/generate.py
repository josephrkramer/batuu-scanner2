#!/usr/bin/env python3

import os
import treepoem
from pathlib import Path

class AztecGenerator:
    all_codes = {
        "DARK1": "DARK1",
        "LIGHT": "LIGHT",
        "NEUTR": "NEUTR",
        "Gayas_Microphone": "31nne",
        "Relic_Hunter": "5y7ms",
        "Well_Connected": "kupy4",
        "Slicer": "ocu62",
        "Amnesiac": "k9zh0",
        "Resistance_Hero": "p35e8",
        "We_Have_Cookies": "090xk",
        "Bounty": "8tpao",
        "Its_Complicated": "pk41z",
        "Jawa": "ado5t",
        "I_Shot_First": "b39i1",
        "Outer_Rim_Regalia": "93l9i",
        "Its_My_Honor": "0a183",
        "The_Best_Teacher": "j3rqx",
        "Relic_Enthusiast": "71uia",
        "Relic_Archivist": "ph15a",
        "Frequent_Flyer_2": "p0mwe",
        "Frequent_Flyer_5": "5340m",
        "Chewie_Were_Home": "g0tja",
        "Rose_Tico": "xh9g3",
        "First_Step": "tznoi",
        "Pathway_to_AARC": "ft4at",
        "Character_AARC": "v14h0",
        "The_Legacy_Continues": "h6nb8",
        "Hoth_Icebreaker": "nju5h",
        "D3_O9": "d3-o9",
    }

    crates = {
        "CAST09": "CAST09",
        "BC_ST": "BC_ST",
        "AB_PQ": "AB_PQ",
        "AB_ST": "AB_ST",
        "BC_TU": "BC_TU",
        "FAL13": "FAL13",
        "JK_ST": "JK_ST",
        "FG_RS": "FG_RS",
        "AB_OP": "AB_OP",
        "FG_QR": "FG_QR",
        "FAL16": "FAL16",
        "FAL09": "FAL09",
        "FAL12": "FAL12",
        "GI_QR": "GI_QR",
        "FG_ST": "FG_ST",
        "CD_ST": "CD_ST",
        "GI_NO": "GI_NO",
        "GI_LM": "GI_LM",
        "FAL15": "FAL15",
        "FAL14": "FAL14",
        "CAST07": "CAST07",
        "FAL10": "FAL10",
        "EF_TU": "EF_TU",
        "CD_LM": "CD_LM",
        "AB_LM": "AB_LM",
        "AB_QR": "AB_QR",
        "BC_PQ": "BC_PQ",
        "FG_TU": "FG_TU",
        "JK_QR": "JK_QR",
        "KL_QR": "KL_QR",
        "DE_TU": "DE_TU",
        "DE_UV": "DE_UV",
        "FAL11": "FAL11",
        "KL_OP": "KL_OP",
        "CAST19": "CAST19",
        "CAST02": "CAST02",
        "EF_LM": "EF_LM",
        "IJ_RS": "IJ_RS",
        "JK_MN": "JK_MN",
        "CAST20": "CAST20",
        "CD_TU": "CD_TU",
        "FAL01": "FAL01",
        "FG_LM": "FG_LM",
        "FAL30": "FAL30",
        "AB_UV": "AB_UV",
        "KL_PQ": "KL_PQ",
        "AB_NO": "AB_NO",
        "FAL07": "FAL07",
        "FAL18": "FAL18",
        "CAST14": "CAST14",
        "DE_QR": "DE_QR",
        "CAST15": "CAST15",
        "FAL20": "FAL20",
        "CAST11": "CAST11",
        "JK_OP": "JK_OP",
        "KL_NO": "KL_NO",
        "FAL02": "FAL02",
        "CAST08": "CAST08",
        "CAST06": "CAST06",
        "AB_TU": "AB_TU",
        "FAL17": "FAL17",
        "IJ_MN": "IJ_MN",
        "FAL21": "FAL21",
        "FG_OP": "FG_OP",
        "BC_LM": "BC_LM",
        "EF_QR": "EF_QR",
        "AB_RS": "AB_RS",
        "GI_MN": "GI_MN",
        "FAL23": "FAL23",
        "FAL06": "FAL06",
        "FG_NO": "FG_NO",
        "IJ_ST": "IJ_ST",
        "FAL03": "FAL03",
        "BC_MN": "BC_MN",
        "IJ_UV": "IJ_UV",
        "KL_ST": "KL_ST",
        "BC_OP": "BC_OP",
        "KL_LM": "KL_LM",
        "JK_TU": "JK_TU",
        "CAST18": "CAST18",
        "CAST17": "CAST17",
        "JK_LM": "JK_LM",
        "KL_TU": "KL_TU",
        "EF_PQ": "EF_PQ",
        "CD_QR": "CD_QR",
        "JK_NO": "JK_NO",
        "EF_MN": "EF_MN",
        "GI_OP": "GI_OP",
        "BC_RS": "BC_RS",
        "JK_UV": "JK_UV",
        "DE_MN": "DE_MN",
        "EF_ST": "EF_ST",
        "FAL24": "FAL24",
        "JK_RS": "JK_RS",
        "EF_UV": "EF_UV",
        "IJ_NO": "IJ_NO",
        "FAL05": "FAL05",
        "EF_RS": "EF_RS",
        "FAL25": "FAL25",
        "CAST03": "CAST03",
        "FAL19": "FAL19",
        "IJ_PQ": "IJ_PQ",
        "CAST10": "CAST10",
        "FAL22": "FAL22",
        "KL_RS": "KL_RS",
        "GI_PQ": "GI_PQ",
        "CAST12": "CAST12",
        "DE_PQ": "DE_PQ",
        "FAL04": "FAL04",
        "FAL29": "FAL29",
        "KL_UV": "KL_UV",
        "IJ_TU": "IJ_TU",
        "EF_OP": "EF_OP",
        "DE_NO": "DE_NO",
        "CAST05": "CAST05",
        "CAST01": "CAST01",
        "FAL28": "FAL28",
        "CAST16": "CAST16",
        "DE_LM": "DE_LM",
        "FG_PQ": "FG_PQ",
        "CD_RS": "CD_RS",
        "JK_PQ": "JK_PQ",
        "DE_ST": "DE_ST",
        "EF_NO": "EF_NO",
        "BC_NO": "BC_NO",
        "IJ_QR": "IJ_QR",
        "FG_MN": "FG_MN",
        "FAL26": "FAL26",
        "FG_UV": "FG_UV",
        "DE_OP": "DE_OP",
        "DE_RS": "DE_RS",
        "IJ_LM": "IJ_LM",
        "CAST13": "CAST13",
        "FAL08": "FAL08",
        "FAL27": "FAL27",
        "AB_MN": "AB_MN",
        "IJ_OP": "IJ_OP",
        "CAST04": "CAST04",
        "JA_X1": "JA_X1",
    }

    @classmethod
    def generate_barcode(cls, filename: str, code: str, folder: str):
        path = Path(f"{os.getcwd()}/public/{folder}/{filename}.png")
        if path.exists():
            print(f"{filename} already exists. Skipping")
        else:
            print(f"Generating {filename}")
            image = treepoem.generate_barcode(
                barcode_type="azteccode",
                data=code,
            )
            image.convert("1").save(path)

    @classmethod
    def genererate_all(cls):
        for filename in cls.all_codes.keys():
            cls.generate_barcode(filename, cls.all_codes[filename], "aztec")
        for filename in cls.crates.keys():
            cls.generate_barcode(filename, cls.crates[filename], "crate")

def main():
    gen = AztecGenerator()
    gen.genererate_all()

    filename = "url"
    path = Path(f"{os.getcwd()}/public/{filename}.png")
    if path.exists():
        print(f"{filename} already exists. Skipping")
    else:
        print(f"Generating {filename}")
        image = treepoem.generate_barcode(
            barcode_type="qrcode",
            data="https://datapad.halcyonthelegacycontinues.com/",
        )
        image.convert("1").save(path)

if __name__ == "__main__":
    main()
