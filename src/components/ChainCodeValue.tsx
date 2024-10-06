import { Card, Image, Typography } from "antd";
import Title from "antd/es/typography/Title";
import {
  ChainCodeDecoder,
  MAX_CHAIN_CODE_SIZE,
  SUN_MEETING_TIME,
  THURS_MEETING_TIME,
} from "../services/chain-code";
import { CrewManifest } from "../services/crew-manifest";
import dayjs from "dayjs";

function ChainCodeValue({
  render,
  chainCodeDecoder,
  crewManifest,
  alignment,
}: Readonly<{
  render: boolean;
  chainCodeDecoder: ChainCodeDecoder;
  crewManifest: CrewManifest;
  alignment: string | undefined;
}>) {
  //if Sunday else Thursday
  const MEETING_TIME =
    dayjs().day() == 0 ? SUN_MEETING_TIME : THURS_MEETING_TIME;
  if (render) {
    if (chainCodeDecoder.chainCodeLength() < MIN_CHAIN_CODE_SIZE) {
      return (
        <div>
          <Card>
            {choiceMessage}
            <Title level={3}>Not enough data for upload</Title>
            <Typography.Paragraph>
              You need to collect more chain code pieces before uploading to
              Rayk.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Check the Dossiers for Sources and their locations for collecting
              more chain code pieces.
            </Typography.Paragraph>
          </Card>
          {originalAlignment}
        </div>
      );
    }
    const derivedAgent = crewManifest
      .getLeaders()
      .filter(
        (agent) => agent.alignment === chainCodeDecoder.chainCodeAlignment(),
      )[0];
    const chainCodeAlignmentMessage = `Your actions have aligned you with the ${chainCodeDecoder.chainCodeAlignment()}.`;
    let chainCodeMessage = "";
    if (chainCodeDecoder.chainCodeLength() < MAX_CHAIN_CODE_SIZE) {
      chainCodeMessage += `We can use all the information we can get and there are more informants to contact. But be sure to meet with your AARC recruiting agent, ${derivedAgent.name}, ${derivedAgent.meetingLocation} at ${MEETING_TIME}`;
    } else {
      chainCodeMessage += `Well, done! You've met with all of our informants. Be ready to meet with your AARC recruiting agent, ${derivedAgent.name}, ${derivedAgent.meetingLocation} at ${MEETING_TIME}`;
    }
    let originalAlignment = null;
    let choiceMessage = null;
    if (alignment !== chainCodeDecoder.chainCodeAlignment()) {
      const originalAgent = crewManifest
        .getLeaders()
        .filter((agent) => agent.alignment === alignment)[0];
      originalAlignment = (
        <Card>
          <Title level={3}>Original Alignment: {alignment}</Title>
          <Typography.Paragraph>{`You have chosen a path different from where you started. You now have a choice. Do you follow the path of your words or your actions?`}</Typography.Paragraph>
          <Image src={originalAgent.image} preview={false} />
          <Typography.Paragraph>{`You may choose to meet with your original AARC recruiting agent, ${originalAgent.name}, ${originalAgent.meetingLocation} at ${MEETING_TIME}`}</Typography.Paragraph>
        </Card>
      );
      choiceMessage = (
        <Card>
          <Title level={3}>Choose your alignment</Title>
          <Typography.Paragraph>
            Your actions today have taken a diffent path from your starting
            alignment. You must choose. Where is your path leading you?
          </Typography.Paragraph>
        </Card>
      );
    }
    return (
      <div>
        <Card>
          {choiceMessage}
          <Title level={3}>
            Alignment: {chainCodeDecoder.chainCodeAlignment()}
          </Title>
          <Typography.Paragraph>
            {chainCodeAlignmentMessage}
          </Typography.Paragraph>
          <Image src={derivedAgent.image} preview={false} />
          <Typography.Paragraph>{chainCodeMessage}</Typography.Paragraph>
        </Card>
        {originalAlignment}
      </div>
    );
  } else {
    return null;
  }
}

export default ChainCodeValue;
