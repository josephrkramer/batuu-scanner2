import { Button } from "antd";
import { MIN_CHAIN_CODE_SIZE } from "./chain-code";

function ChainCodeButton({
  chainCode,
  setRenderChainCodeValue,
}: Readonly<{ chainCode: string[]; setRenderChainCodeValue: Function }>) {
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
