import { Button, Card, Flex, Image } from "antd";
import { CrateContents, CrateDecoder } from "../services/crate-decoder";
import Title from "antd/es/typography/Title";
import { BadgeDecoder } from "../services/badge-decoder";

function MultipeChoiceCrate({
  multipleChoiceCrateCode,
  crateDecoder,
  badgeDecoder,
  setCrateToDisplay,
  setRenderMultipleChoiceCrateCode,
}: Readonly<{
  multipleChoiceCrateCode: string | undefined;
  crateDecoder: CrateDecoder;
  badgeDecoder: BadgeDecoder;
  setCrateToDisplay: React.Dispatch<
    React.SetStateAction<CrateContents | undefined>
  >;
  setRenderMultipleChoiceCrateCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}>) {
  if (multipleChoiceCrateCode) {
    const parent = crateDecoder.decode(multipleChoiceCrateCode);
    return (
      <Card>
        <Title level={2}>You Must Choose</Title>
        <Title level={3}>{parent.contents}</Title>
        <Flex vertical gap="small">
          {childButtons(
            parent,
            crateDecoder,
            badgeDecoder,
            setCrateToDisplay,
            setRenderMultipleChoiceCrateCode,
          )}
        </Flex>
      </Card>
    );
  } else {
    return null;
  }
}

function childButtons(
  parent: CrateContents,
  crateDecoder: CrateDecoder,
  badgeDecoder: BadgeDecoder,
  setCrateToDisplay: React.Dispatch<
    React.SetStateAction<CrateContents | undefined>
  >,
  setRenderMultipleChoiceCrateCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >,
) {
  const buttons = [];
  for (const child of parent.multipleChoice) {
    const button = (
      <Button
        size={"large"}
        icon={<Image src={child.image} preview={false} width={35} />}
        key={child.contents}
        onClick={() => {
          crateDecoder.addToScannedMultipleChoice(child.code, child);
          crateDecoder.setResult(child.code, badgeDecoder);
          setCrateToDisplay(child);
          setRenderMultipleChoiceCrateCode(undefined);
        }}
      >
        {child.contents}
      </Button>
    );
    buttons.push(button);
  }
  return buttons;
}

export default MultipeChoiceCrate;
