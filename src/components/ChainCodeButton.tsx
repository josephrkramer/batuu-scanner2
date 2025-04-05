import { Button } from "antd";

function ChainCodeButton({
  setRenderChainCodeValue,
  setRenderAlignmentQuestion,
}: Readonly<{
  setRenderChainCodeValue: React.Dispatch<React.SetStateAction<boolean>>;
  setRenderAlignmentQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <Button
      type="primary"
      size="large"
      onClick={() => {
        setRenderAlignmentQuestion(true);
        setRenderChainCodeValue(true);
      }}
    >
      Upload chain code to Rayk
    </Button>
  );
}

export default ChainCodeButton;
