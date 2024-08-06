import { Button, Card, Flex, Image } from "antd";
import Title from "antd/es/typography/Title";
import { CrewManifest } from "../services/crew-manifest";

function AlignmentQuestion({
  crewManifest,
  setAlignment,
}: Readonly<{
  crewManifest: CrewManifest;
  setAlignment: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}>) {
    return (
      <Card>
        <Title level={2}>Welcome to AARC!</Title>
        <Title level={4}>Who is your recruiting agent?</Title>
        <Flex vertical>
          {childButtons(
            crewManifest,
            setAlignment,
          )}
        </Flex>
      </Card>
    );
}

function childButtons(
    crewManifest: CrewManifest,
    setAlignment: React.Dispatch<
        React.SetStateAction<string | undefined>
    >,
) {
  const buttons = [];
  for (const agent of crewManifest.getLeaders()) {
    const button = (
      <Button
        size={"large"}
        icon={<Image src={agent.image} preview={false} width={35} />}
        key={agent.name}
        onClick={() => {
          setAlignment(agent.alignment);
        }}
      >
        {agent.name}
      </Button>
    );
    buttons.push(button);
  }
  return buttons;
}

export default AlignmentQuestion;
