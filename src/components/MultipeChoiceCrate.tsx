import {
  Button,
  Card,
  Collapse,
  CollapseProps,
  Flex,
  Image,
  Typography,
} from "antd";
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
  const items: CollapseProps["items"] = parent.multipleChoice.map((crate) => ({
    key: crate.contents,
    label: (
      <Flex justify={"space-evenly"}>
        <Image src={crate.image} width={50} height={"auto"} preview={false} />
        <Typography.Text>{crate.contents}</Typography.Text>
      </Flex>
    ),
    children: (
      <div>
        <Image src={crate.image} preview={{ toolbarRender: () => null }} />
        <Typography.Title level={3}>{crate.contents}</Typography.Title>
        <Button
          size={"large"}
          key={crate.contents}
          onClick={() => {
            crateDecoder.addToScannedMultipleChoice(crate.code, crate);
            crateDecoder.setResult(crate.code, badgeDecoder);
            setCrateToDisplay(crate);
            setRenderMultipleChoiceCrateCode(undefined);
          }}
        >
          Select
        </Button>
      </div>
    ),
  }));
  return <Collapse items={items} />;
}

export default MultipeChoiceCrate;
