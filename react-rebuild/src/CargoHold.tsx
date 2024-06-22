import { Avatar, Card, Flex, List, Space, Typography, Image } from "antd";
import { CrateContents } from "./crate-decoder";
import Item from "antd/es/list/Item";
import { Badge } from "./badge-decoder";

function CargoHold(
  props: Readonly<{
    render: boolean;
    sortedCargoHold: Map<string, Set<CrateContents>>;
    badgesToDisplay: Badge[];
  }>,
) {
  if (!props.render) {
    return null;
  }

  return (
    <Card>
      <Typography.Title level={3}>Scanned Crates</Typography.Title>
      {crateDisplay(props.sortedCargoHold)}
      {badgeDisplay(props.badgesToDisplay)}
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
            <Image
              src={item.image}
              width={50}
              preview={{ toolbarRender: () => null }}
            />
            <Typography.Text>{item.contents}</Typography.Text>
          </List.Item>
        )}
      />
    );
    cargoHoldList.push(list);
  }
  return cargoHoldList;
}

function badgeDisplay(badgesToDisplay: Badge[]) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={badgesToDisplay}
      size="small"
      //bordered
      header={<Typography.Title level={3}>Badges</Typography.Title>}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Image
                src={item.image}
                width={50}
                preview={{
                  imageRender: () => (
                    <div>
                      <Image src={item.image} preview={false} />
                      <Typography.Title level={3}>{item.name}</Typography.Title>
                      <Typography.Title level={4}>
                        {item.quote}
                      </Typography.Title>
                      <Typography.Text>{item.description}</Typography.Text>
                    </div>
                  ),
                  toolbarRender: () => null,
                }}
              />
            }
            title={item.name}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}
