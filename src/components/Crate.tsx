import { Card, Image } from "antd";
import { CrateContents } from "../services/crate-decoder";
import Title from "antd/es/typography/Title";

function Crate({ crate }: Readonly<{ crate: CrateContents | undefined }>) {
  if (crate) {
    return (
      <Card>
        <Title level={2}>Crate Scan Successful</Title>
        <Image src={crate.image} preview={false} />
        <Title level={3}>{crate.contents}</Title>
      </Card>
    );
  } else {
    return null;
  }
}

export default Crate;