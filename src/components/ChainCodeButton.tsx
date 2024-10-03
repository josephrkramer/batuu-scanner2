import { Button } from "antd";
import { ChainCodePart, MIN_CHAIN_CODE_SIZE } from "../services/chain-code";

function ChainCodeButton({
  chainCode,
  setRenderChainCodeValue,
}: Readonly<{
  chainCode: ChainCodePart[];
  setRenderChainCodeValue: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  if (chainCode.length >= MIN_CHAIN_CODE_SIZE) {
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
  } else {
    return null;
  }
}

export default ChainCodeButton;
