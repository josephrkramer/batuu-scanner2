#!/usr/bin/env python3

import treepoem

image = treepoem.generate_barcode(
    barcode_type="azteccode",
    data="DARK1",
)
image.convert("1").save("DARK1.png")

image = treepoem.generate_barcode(
    barcode_type="azteccode",
    data="LIGHT",
)
image.convert("1").save("LIGHT.png")

image = treepoem.generate_barcode(
    barcode_type="azteccode",
    data="NEUTR",
)
image.convert("1").save("NEUTR.png")