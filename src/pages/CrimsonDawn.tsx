import { Button, Card, Flex, Form, FormProps, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FieldType = {
  password?: string;
};

function PasswordCheck() {
  //TODO: set password
  const password = "password";

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const [renderPasswordCheck, setRenderPasswordCheck] = useState(true);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (values.password?.toLocaleLowerCase() == password) {
      console.log("PASSWORD CORRECT");
      setRenderPasswordCheck(false);
    } else {
      console.log("PASSWORD INCORRECT");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  if (renderPasswordCheck) {
    return (
      <Flex vertical gap="small">
        <Card>
          <Typography.Title level={2}>Password Required</Typography.Title>
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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
        <Button type="primary" size="large" onClick={() => navigateHome()}>
          Home
        </Button>
      </Flex>
    );
  } else {
    return (
      <Flex vertical gap="small">
        <Card>
          <Typography.Title level={2}>Password Correct</Typography.Title>
          <Typography.Text>
            This is where we put whatever you wanted the playes to see.
          </Typography.Text>
        </Card>
        <Button type="primary" size="large" onClick={() => navigateHome()}>
          Home
        </Button>
      </Flex>
    );
  }
}

export default PasswordCheck;
