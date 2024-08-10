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
        "Character_AARC": "pk41z",
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
    }

    @classmethod
    def generate_barcode(cls, filename: str, code: str):
        path = Path(f"{os.getcwd()}/public/aztec/{filename}.png")
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
            cls.generate_barcode(filename, cls.all_codes[filename])

def main():
    gen = AztecGenerator()
    gen.genererate_all()

if __name__ == "__main__":
    main()
