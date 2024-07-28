import { Card } from "antd";
import Title from "antd/es/typography/Title";

function PasswordStatus({
  passwordCorrect: passwordStatus,
}: Readonly<{
  passwordCorrect: boolean | undefined;
}>) {
  if (passwordStatus) {
    return (
      <Card>
        <Title level={2}>Password Correct</Title>
      </Card>
    );
  } else if (passwordStatus === false) {
    return (
      <Card>
        <Title level={2}>Password Incorrect</Title>
      </Card>
    );
  } else {
    return null;
  }
}

export default PasswordStatus;
