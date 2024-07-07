import { Card } from "antd";
import Title from "antd/es/typography/Title";
import {
  ChainCodeDecoder,
  MAX_CHAIN_CODE_SIZE,
  MEETING_TIME,
} from "../services/chain-code";

function ChainCodeValue({
  render,
  chainCodeDecoder,
}: Readonly<{ render: boolean; chainCodeDecoder: ChainCodeDecoder }>) {
  if (render) {
    let chainCodeMessage = "";
    if (chainCodeDecoder.chainCodeLength() < MAX_CHAIN_CODE_SIZE) {
      chainCodeMessage = `There are still more informants to contact, but make sure you meet with your AARC Agent at ${MEETING_TIME}`;
    } else {
      chainCodeMessage = `Well, done! You've met with all of our informants. Be ready to meet with your AARC Agent at ${MEETING_TIME}`;
    }
    return (
      <Card>
        <Title level={2}>Chain Code Value: {chainCodeDecoder.rawValue()}</Title>
        <Title level={4}>{chainCodeMessage}</Title>
      </Card>
    );
  } else {
    return null;
  }
}

export default ChainCodeValue;
