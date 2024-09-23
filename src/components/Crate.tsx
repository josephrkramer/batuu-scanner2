import { Card, Image } from "antd";
import { CrateContents } from "../services/crate-decoder";
import Title from "antd/es/typography/Title";

function Crate({
  crate,
  admin,
}: Readonly<{ crate: CrateContents | undefined; admin: boolean }>) {
  if (crate) {
    return (
      <Card>
        <Title level={2}>Crate Scan Successful</Title>
        <Image src={crate.image} preview={false} />
        <Title level={3}>{crate.contents}</Title>
        <Title level={5}>{crate.detailedDescription}</Title>
        {admin ? <Title level={4}>{crate.code}</Title> : null}
      </Card>
    );
  } else {
    return null;
  }
}

export default Crate;
