import os
import treepoem
from pathlib import Path
from src.generate import AztecGenerator

def test_generate_barcode():
    gen = AztecGenerator()
    filename = "test"
    code = "test"
    path = Path(f"/workspaces/batuu-scanner2/images/aztec/{filename}.png")
    if path.exists():
        os.remove(path)
    gen.generate_barcode(filename=filename, code=code)
    assert path.exists()
    os.remove(path)
