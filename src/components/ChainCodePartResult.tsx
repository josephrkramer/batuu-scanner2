import { Card, Image } from "antd";
import Title from "antd/es/typography/Title";
import { ChainCodePart } from "../services/chain-code";

function ChainCodePartResult({
  chainCodePart,
}: Readonly<{ chainCodePart: ChainCodePart | undefined }>) {
  if (chainCodePart) {
    return (
      <Card>
        <Title level={2}>Chain Code Scan Successful</Title>
        <Image
          src={chainCodePart.image}
          preview={false}
        />
        <Title level={3}>Chain Code Piece</Title>
      </Card>
    );
  } else {
    return null;
  }
}

export default ChainCodePartResult;
