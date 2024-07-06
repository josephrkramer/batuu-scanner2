import { Card, Image, Typography } from "antd";
import { BADGE_DATE_FORMAT, Badge, EarnedBadge } from "./badge-decoder";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";

function EarnedBadges(
  props: Readonly<{
    badges: Badge[] | undefined;
    earnedBadgesDatesMap: Map<string, EarnedBadge>;
  }>,
) {
  if (props.badges === undefined) {
    return null;
  }

  const displayBadges = [];
  for (const badge of props.badges) {
    //Check and Format Earned Badges date
    let badgeDateString: string;
    if (props.earnedBadgesDatesMap.has(badge.code)) {
      const date = dayjs(
        props.earnedBadgesDatesMap.get(badge.code)!.date,
        BADGE_DATE_FORMAT,
      );
      badgeDateString = "Earned on " + date.format("MMM D, YYYY");
    } else {
      badgeDateString = "Badge not earned";
    }

    displayBadges.push(
      <Card key={badge.code}>
        <Image
          src={badge.image}
          //width={500}
          preview={false}
        />
        <Title level={3}>{badge.name}</Title>
        <Title level={5}>{badge.quote}</Title>
        <Typography.Text>{badge.description}</Typography.Text>
        <Title level={5}>{badgeDateString}</Title>
      </Card>,
    );
  }

  return (
    <Card>
      <Title level={2}>New Badge</Title>
      {displayBadges}
    </Card>
  );
}

export default EarnedBadges;
