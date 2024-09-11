import {
  Button,
  Card,
  Collapse,
  CollapseProps,
  Flex,
  Image,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { CrewManifest } from "../services/crew-manifest";

function AlignmentQuestion({
  crewManifest,
  setAlignment,
}: Readonly<{
  crewManifest: CrewManifest;
  setAlignment: React.Dispatch<React.SetStateAction<string | undefined>>;
}>) {
  return (
    <Card>
      <Title level={2}>Welcome, recruit!</Title>
      <Title level={4}>Who is your recruiting agent?</Title>
      <Flex vertical gap="small">
        {childButtons(crewManifest, setAlignment)}
      </Flex>
    </Card>
  );
}

function childButtons(
  crewManifest: CrewManifest,
  setAlignment: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  const items: CollapseProps["items"] = crewManifest
    .getLeaders()
    .map((crewMember) => ({
      key: crewMember.name,
      label: (
        <Flex justify={"space-evenly"}>
          <Image
            src={crewMember.image}
            width={50}
            height={"auto"}
            preview={false}
          />
          <Typography.Text>{crewMember.name}</Typography.Text>
        </Flex>
      ),
      children: (
        <div>
          <Image
            src={crewMember.image}
            preview={{ toolbarRender: () => null }}
          />
          <Typography.Title level={3}>{crewMember.name}</Typography.Title>
          <Button
            size={"large"}
            key={crewMember.name}
            onClick={() => {
              setAlignment(crewMember.alignment);
            }}
          >
            Select
          </Button>
        </div>
      ),
    }));
  return <Collapse items={items} />;
}

export default AlignmentQuestion;
