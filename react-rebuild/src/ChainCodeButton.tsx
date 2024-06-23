import { Button } from "antd";
import { MIN_CHAIN_CODE_SIZE } from "./chain-code";

function decodeChainCodeButton() {
  console.error("Decoding Chain Code not yet implemented");
}

function ChainCodeButton({ chainCode }: Readonly<{ chainCode: string[] }>) {
  if (chainCode.length > MIN_CHAIN_CODE_SIZE) {
    return (
      <Button type="primary" onClick={() => decodeChainCodeButton()}>
        Decode Chain Code
      </Button>
    );
  } else {
    return null;
  }
}

export default ChainCodeButton;
