import { Button, Card } from "antd";

function runThePuzzle(
  setPuzzleSolved: React.Dispatch<React.SetStateAction<boolean>>,
) {
    //TODO: add puzzle here
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
