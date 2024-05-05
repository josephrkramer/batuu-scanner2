import os
from pathlib import Path
from src.generate import AztecGenerator

def test_generate_barcode():
    gen = AztecGenerator()
    filename = "test"
    code = "test"
    path = Path(f"{os.getcwd()}/images/aztec/{filename}.png")
    if path.exists():
        os.remove(path)
    gen.generate_barcode(filename=filename, code=code)
    assert path.exists()
    os.remove(path)

def test_generate_all():
    gen = AztecGenerator()
    gen.genererate_all()
    for filename in gen.all_codes.keys():
        path = Path(f"{os.getcwd()}/images/aztec/{filename}.png")
        assert path.exists()
