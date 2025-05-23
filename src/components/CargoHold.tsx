import { Card, List, Typography, Image } from "antd";
import { CrateContents, CrateType } from "../services/crate-decoder";
import {
  BADGE_DATE_FORMAT,
  Badge,
  EarnedBadge,
} from "../services/badge-decoder";
import dayjs from "dayjs";
import { ChainCodePart } from "../services/chain-code";

const { Title, Text } = Typography;

function CargoHold(
  props: Readonly<{
    render: boolean;
    sortedCargoHold: Map<string, Set<CrateContents>>;
    badgesToDisplay: Badge[];
    earnedBadgesDatesMap: Map<string, EarnedBadge>;
    chainCode: ChainCodePart[];
    admin: boolean;
    numRelicsFound: number;
    numTotalRelics: number;
  }>,
) {
  if (!props.render) {
    return null;
  }

  return (
    <Card>
      <Title level={3}>Scanned Crates</Title>
      {crateDisplay(
        props.sortedCargoHold,
        props.admin,
        props.numRelicsFound,
        props.numTotalRelics,
      )}
      {/*
      //Uncomment if restoring Chain Code Functionality
      chainCodeDisplay(props.chainCode, props.admin)
      */}
      {badgeDisplay(
        props.badgesToDisplay,
        props.earnedBadgesDatesMap,
        props.admin,
      )}
    </Card>
  );
}

export default CargoHold;

function crateDisplay(
  sortedCargoHold: Map<string, Set<CrateContents>>,
  admin: boolean,
  numRelicsFound: number,
  numTotalRelics: number,
) {
  const cargoHoldList = [];
  for (const crateType of sortedCargoHold.keys()) {
    const dataSource = Array.from(sortedCargoHold.get(crateType)!.values());
    const list = (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        size="small"
        //bordered
        header={
          <>
            {crateType == CrateType.Relic ? (
              <Title level={4}>
                {crateType} - {numRelicsFound} of {numTotalRelics}
              </Title>
            ) : (
              <Title level={4}>{crateType}</Title>
            )}
          </>
        }
        key={crateType}
        renderItem={(item) => (
          <List.Item>
            <Image
              src={item.image}
              width={50}
              height={"auto"}
              preview={{
                imageRender: () => (
                  <div>
                    <Image
                      src={admin ? `./crate/${item.code}.png` : item.image}
                      preview={false}
                      width={"100vw"}
                      height={"auto"}
                    />
                    <Title level={3}>{item.contents}</Title>
                    <Title level={5}>{item.detailedDescription}</Title>
                    {admin ? <Title level={4}>{item.code}</Title> : null}
                    {admin ? (
                      <Title level={4}>{item.locationDescription}</Title>
                    ) : null}
                  </div>
                ),
                toolbarRender: () => null,
              }}
            />
            <Text>{item.contents}</Text>
            {admin ? <Text>{item.code}</Text> : null}
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

/*
//Uncomment if restoring Chain Code Functionality
function chainCodeDisplay(chainCode: ChainCodePart[], admin: boolean) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={chainCode}
      size="small"
      //bordered
      header={<Title level={3}>Chain Code</Title>}
      renderItem={(item) => (
        <List.Item>
          <Image
            src={admin ? item.aztec : item.image}
            width={50}
            height={"auto"}
            preview={{
              imageRender: () => (
                <div>
                  <Image
                    src={admin ? item.aztec : item.image}
                    preview={false}
                    width={"100vw"}
                    height={"auto"}
                  />
                  <Title level={3}>
                    {admin ? item.description : "Chain Code Fragement"}
                  </Title>
                </div>
              ),
              toolbarRender: () => null,
            }}
          />
          <Text>{admin ? item.description : "Chain Code Fragement"}</Text>
        </List.Item>
      )}
    />
  );
}
*/

function badgeDisplay(
  badgesToDisplay: Badge[],
  earnedBadgesDatesMap: Map<string, EarnedBadge>,
  admin: boolean,
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
                height={"auto"}
                preview={{
                  imageRender: () => (
                    <div>
                      <Image
                        src={admin ? badge.aztec : badge.image}
                        preview={false}
                        width={"100vw"}
                        height={"auto"}
                      />
                      <Title level={3}>{badge.name}</Title>
                      <Title level={4}>{badge.quote}</Title>
                      <Text>{badge.description}</Text>
                      <Title level={5}>{badgeEarnedDate(badge)}</Title>
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
