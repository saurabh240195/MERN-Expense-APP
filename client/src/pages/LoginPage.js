import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { Button, Form, Input, Flex, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async(values) => {
        // console.log(values);
        try {
            const {data} = await axios.post('/users/login', values);
            messageApi.success('Login Successfull');
            localStorage.setItem('user', JSON.stringify({...data.user,password:'' }))
            // navigate('/');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
        catch (error) {
            messageApi.error(error.response.data);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    },[navigate])

  return (
      <>
          {contextHolder}
      <Layout>
              
          <div className="register-page">
                <h1>Login Page</h1>
                  
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
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
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
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
                    
            <Form.Item>
                <Flex justify="space-between" align="center">
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                <Link to="/register">Not Registered? Click here to register.</Link>
                </Flex>
            </Form.Item>
                      

            </Form>
            </div>
          </Layout>
    </>
  )
}

export default LoginPage
