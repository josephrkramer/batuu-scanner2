import { Button } from "antd";

function ChainCodeButton({
  setRenderChainCodeValue,
}: Readonly<{
  setRenderChainCodeValue: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <Button
      type="primary"
      size="large"
      onClick={() => {
        setRenderChainCodeValue(true);
      }}
    >
      Upload chain code to Rayk
    </Button>
  );
}

export default ChainCodeButton;
