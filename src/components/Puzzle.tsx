import ReactGodot from "../../public/react-godot";

function Puzzle({
  renderPuzzle,
  //setPuzzleSolved,
}: Readonly<{
  renderPuzzle: boolean;
  //setPuzzleSolved: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  if (renderPuzzle) {
    return (
      <ReactGodot
        script="coolant-stabilizer/index.js"
        pck="coolant-stabilizer/index.pck"
        wasm="coolant-stabilizer/index.wasm"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    );
  } else {
    return null;
  }
}

export default Puzzle;
