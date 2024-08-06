import { Card, Image, Typography } from "antd";
import Title from "antd/es/typography/Title";
import {
  ChainCodeDecoder,
  MAX_CHAIN_CODE_SIZE,
  MEETING_TIME,
} from "../services/chain-code";
import { CrewManifest } from "../services/crew-manifest";

function ChainCodeValue({
  render,
  chainCodeDecoder,
  crewManifest,
}: Readonly<{ render: boolean; chainCodeDecoder: ChainCodeDecoder, crewManifest: CrewManifest }>) {
  if (render) {
    let derivedAgent = crewManifest.getLeaders().filter(agent => agent.alignment == chainCodeDecoder.chainCodeAlignment())[0];
    let chainCodeAlignmentMessage = `By your actions, you've shown to be aligned with the ${chainCodeDecoder.chainCodeAlignment()}.`;
    let chainCodeMessage = "";
    if (chainCodeDecoder.chainCodeLength() < MAX_CHAIN_CODE_SIZE) {
      chainCodeMessage += `There are still more informants to contact, but make sure you meet with your AARC recruiting agent, ${derivedAgent.name} at LOCATATON, at ${MEETING_TIME}`;
    } else {
      chainCodeMessage += `Well, done! You've met with all of our informants. Be ready to meet with your AARC recruiting agent, ${derivedAgent.name} at LOCATION, at ${MEETING_TIME}`;
    }
    return (
      <Card>
        <Title level={3}>Alignment: {chainCodeDecoder.chainCodeAlignment()}</Title>
        <Typography.Paragraph>{chainCodeAlignmentMessage}</Typography.Paragraph>
        <Image src={derivedAgent.image} preview={false} />
        <Typography.Paragraph>{chainCodeMessage}</Typography.Paragraph>
      </Card>
    );
  } else {
    return null;
  }
}

export default ChainCodeValue;
