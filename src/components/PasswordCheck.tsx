import { Button, Card, Form, FormProps, Input } from "antd";
import Title from "antd/es/typography/Title";

type FieldType = {
  password?: string;
};

function PasswordCheck({
  renderPasswordCheck,
  setRenderPasswordCheck,
  passwordToCheck,
  setPostPasswordCheck,
  setScanResultForPuzzle,
  setPasswordCorrect,
}: Readonly<{
  renderPasswordCheck: boolean;
  setRenderPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
  passwordToCheck: string;
  setPostPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setScanResultForPuzzle: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setPasswordCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}>) {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    console.log("Password to check:", passwordToCheck);
    if (
      values.password?.toLocaleLowerCase() ==
      passwordToCheck.toLocaleLowerCase()
    ) {
      console.log("PASSWORD CORRECT");
      setPostPasswordCheck(true);
      setPasswordCorrect(true);
    } else {
      console.log("PASSWORD INCORRECT");
      setScanResultForPuzzle(undefined);
      setPasswordCorrect(false);
    }
    setRenderPasswordCheck(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  if (renderPasswordCheck) {
    return (
      <Card>
        <Title level={2}>Password Required</Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  } else {
    return null;
  }
}

export default PasswordCheck;
