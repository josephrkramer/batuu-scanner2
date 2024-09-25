import { Card, Image } from "antd";

function Logo({ admin }: Readonly<{ admin: boolean }>) {
  return (
    <Card>
      {admin ? (
        <Image
          src={"./url.png"}
          width={"100%"}
          height={"auto"}
          preview={false}
        />
      ) : (
        <Image src={"./aarc-aurebesh.jpg"} preview={false} />
      )}
    </Card>
  );
}

export default Logo;
