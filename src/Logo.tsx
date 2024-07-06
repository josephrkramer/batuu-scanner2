import { Card, Image } from "antd";
import logo from "../public/aarc-aurebesh.jpg";

function Logo() {
  return (
    <Card>
      <Image
        src={logo}
        //width={500}
        preview={false}
      />
    </Card>
  );
}

export default Logo;
