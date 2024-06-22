import { Avatar, Card, Flex, List, Space, Typography, Image } from "antd";
import { CrateContents } from "./crate-decoder";
import Item from "antd/es/list/Item";

function CargoHold(
  props: Readonly<{
    render: boolean;
    sortedCargoHold: Map<string, Set<CrateContents>>;
  }>,
) {
  if (!props.render) {
    return null;
  }

  return (
    <Card>
      <Typography.Title level={3}>Scanned Crates</Typography.Title>
      {crateDisplay(props.sortedCargoHold)}
    </Card>
  );
}

export default CargoHold;

function crateDisplay(sortedCargoHold: Map<string, Set<CrateContents>>) {
  const cargoHoldList = [];
  for (const crateType of sortedCargoHold.keys()) {
    const dataSource = Array.from(sortedCargoHold.get(crateType)!.values());
    const list = (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        size="small"
        //bordered
        header={<Typography.Title level={4}>{crateType}</Typography.Title>}
        key={crateType}
        renderItem={(item) => (
          <List.Item>
            <Image src={item.image} width={50} preview={true} />
            <Typography.Text>{item.contents}</Typography.Text>
          </List.Item>
        )}
      />
    );
    cargoHoldList.push(list);
  }
  return cargoHoldList;
}
