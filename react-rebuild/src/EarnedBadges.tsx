import { Card, Image, Typography } from "antd";
import { Badge } from "./badge-decoder";
import Title from "antd/es/typography/Title";

function EarnedBadges(props: Readonly<{ badges: Badge[] | undefined }>) {
  if (props.badges === undefined) {
    return null;
  }

  const displayBadges = [];
  for (const badge of props.badges) {
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
