#!/usr/bin/env python3

import treepoem

all_codes = {
    "DARK1": "DARK1",
    "LIGHT": "LIGHT",
    "NEUTR": "NEUTR",
}

def generate_barcode(filename: str, code: str):
    image = treepoem.generate_barcode(
        barcode_type="azteccode",
        data=code,
    )
    image.convert("1").save(f"{filename}.png")

for filename in all_codes.keys():
    generate_barcode(filename, all_codes[filename])