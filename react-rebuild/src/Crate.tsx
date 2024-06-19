import { Card, Image } from "antd";
import { CrateContents } from "./crate-decoder";
import Title from "antd/es/typography/Title";

function Crate({ crate }: Readonly<{ crate: CrateContents | undefined }>) {
  if (crate) {
    return (
      <Card>
        <Image
          src={crate.image}
          //width={500}
          preview={false}
        />
        <Title level={2}>{crate.contents}</Title>
      </Card>
    );
  } else {
    return null;
  }
}

export default Crate;
