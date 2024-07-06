import { Card, List, Typography, Image } from "antd";
import { CrateContents } from "./crate-decoder";
import { BADGE_DATE_FORMAT, Badge, EarnedBadge } from "./badge-decoder";
import dayjs from "dayjs";
import { ChainCodePart } from "./chain-code";

function CargoHold(
  props: Readonly<{
    render: boolean;
    sortedCargoHold: Map<string, Set<CrateContents>>;
    badgesToDisplay: Badge[];
    earnedBadgesDatesMap: Map<string, EarnedBadge>;
    chainCode: ChainCodePart[];
  }>,
) {
  if (!props.render) {
    return null;
  }

  return (
    <Card>
      <Typography.Title level={3}>Scanned Crates</Typography.Title>
      {crateDisplay(props.sortedCargoHold)}
      {chainCodeDisplay(props.chainCode)}
      {badgeDisplay(props.badgesToDisplay, props.earnedBadgesDatesMap)}
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
  if (cargoHoldList.length == 0) {
    return <List itemLayout="horizontal" dataSource={[]} size="small" />;
  }
  return cargoHoldList;
}

function chainCodeDisplay(chainCode: ChainCodePart[]) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={chainCode}
      size="small"
      //bordered
      header={<Typography.Title level={3}>Chain Code</Typography.Title>}
      renderItem={(item) => (
        <List.Item>
          <Image
            src={item.image}
            width={50}
            preview={{ toolbarRender: () => null }}
          />
          <Typography.Text>Chain Code Fragement</Typography.Text>
        </List.Item>
      )}
    />
  );
}

function badgeDisplay(
  badgesToDisplay: Badge[],
  earnedBadgesDatesMap: Map<string, EarnedBadge>,
) {
  function badgeEarnedDate(badge: Badge) {
    //Check and Format Earned Badges date
    let badgeDateString: string;
    if (earnedBadgesDatesMap.has(badge.code)) {
      const date = dayjs(
        earnedBadgesDatesMap.get(badge.code)!.date,
        BADGE_DATE_FORMAT,
      );
      badgeDateString = "Earned on " + date.format("MMM D, YYYY");
    } else {
      badgeDateString = "Badge not earned";
    }
    return badgeDateString;
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={badgesToDisplay}
      size="small"
      //bordered
      header={<Typography.Title level={3}>Badges</Typography.Title>}
      renderItem={(badge) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Image
                src={badge.image}
                width={50}
                preview={{
                  imageRender: () => (
                    <div>
                      <Image src={badge.image} preview={false} />
                      <Typography.Title level={3}>
                        {badge.name}
                      </Typography.Title>
                      <Typography.Title level={4}>
                        {badge.quote}
                      </Typography.Title>
                      <Typography.Text>{badge.description}</Typography.Text>
                      <Typography.Title level={5}>
                        {badgeEarnedDate(badge)}
                      </Typography.Title>
                    </div>
                  ),
                  toolbarRender: () => null,
                }}
              />
            }
            title={badge.name}
            description={badge.description}
          />
        </List.Item>
      )}
    />
  );
}