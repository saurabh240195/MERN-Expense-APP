import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
// import type { FormProps } from 'antd';
import { Button, Form, Input, Flex, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      // console.log(values);
      await axios.post("/users/register", values);
      messageApi.success("Registration Successfull");
      // navigate("/login");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      messageApi.error("invalid username or password");
    }
  };

  const success = () => {
    messageApi.success("Registration Successfull");
  };

  // prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {contextHolder}

      <Layout>
        <Button onClick={success}>Success</Button>
        <div className="register-page">
          <h1>Register Page</h1>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  type: "text",
                },
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between" align="center">
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Link to="/login">Already Register? Click here to login.</Link>
              </Flex>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;
