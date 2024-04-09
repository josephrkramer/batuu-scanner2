#!/usr/bin/env python3

import treepoem

image = treepoem.generate_barcode(
    barcode_type="azteccode",
    data="LARPE",
)
image.convert("1").save("larpe.png")