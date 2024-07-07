import { Button, Card } from "antd";

function runThePuzzle(
  setPuzzleSolved: React.Dispatch<React.SetStateAction<boolean>>,
) {
    //TODO: add puzzle here
    /*
    setPuzzleSolved will activate the React useState hook to
    syncronize the state across the app and cause the correct
    next steps to happen
    */
  setPuzzleSolved(true);
}

function Puzzle({
  renderPuzzle,
  setPuzzleSolved,
}: Readonly<{
  renderPuzzle: boolean;
  setPuzzleSolved: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  if (renderPuzzle) {
    //TODO: add the display elements here
    return (
      <Card>
        <Button onClick={() => runThePuzzle(setPuzzleSolved)}>
          Solve the puzzle
        </Button>
      </Card>
    );
  } else {
    return null;
  }
}

export default Puzzle;
