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
        onClick={() => {
          setRenderChainCodeValue(true);
        }}
      >
        Decode Chain Code
      </Button>
    );
  } else {
    return null;
  }
}

export default ChainCodeButton;
