import ReactGodot from "../../public/react-godot";
import { trackEvent } from "../services/analytics";

function Puzzle({
  renderPuzzle,
  setPuzzleSolved,
}: Readonly<{
  renderPuzzle: boolean;
  setPuzzleSolved: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  if (renderPuzzle) {
    return (
      <ReactGodot
        script="coolant-stabilizer/index.js"
        pck="coolant-stabilizer/index.pck"
        wasm="coolant-stabilizer/index.wasm"
        width={window.innerWidth}
        height={window.innerHeight}
        onExitFunc={() => {
          setPuzzleSolved(true);
          trackEvent(
            "puzzle_completed",
            "Engagement",
            "Puzzle Completed - Coolant Stabilizer",
          );
        }}
      />
    );
  } else {
    return null;
  }
}

export default Puzzle;
