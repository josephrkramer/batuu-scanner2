import { Button, Card } from "antd";

function PasswordCheck({
  renderPasswordCheck,
  setRenderPasswordCheck,
  passwordToCheck,
  setPostPasswordCheck,
}: Readonly<{
  renderPasswordCheck: boolean;
  setRenderPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
  passwordToCheck: string;
  setPostPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  if (renderPasswordCheck) {
    return (
      <Card>
        <Button
          onClick={() => {
            setRenderPasswordCheck(false);
            setPostPasswordCheck(true);
          }}
        >
          {passwordToCheck}
        </Button>
      </Card>
    );
  } else {
    return null;
  }
}

export default PasswordCheck;
