'use client'

import { useState } from 'react'
import { Form, Input, Button, Checkbox, Flex, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Link from 'next/link'
import useAuth from '@/hook/useAuth'

const { Title } = Typography

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [form] = Form.useForm()
  const { login } = useAuth()

  const onFinish = (values) => {
    setLoading(true)
    login(values, () => {
      message.success('Đăng nhập thành công')
    }, () => {
      message.error('Mật khẩu hoặc tài khoản không đúng')
      setError(true)
    })
    // Simulate login process
    setTimeout(() => {
      console.log('Received values:', values)
      setLoading(false)
    }, 1000)
  }

  return (
    <Flex style={{ width: 350, marginTop: 100 }} vertical align='center'>
      <Title>Đăng nhập</Title>
      <Form
        form={form}
        style={{ width: '100%' }}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
          validateStatus={error === true ? 'error' : 'success'}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Đăng nhập
          </Button>
        </Form.Item>

        {/* Link to register page */}
        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            Chưa có tài khoản? <Link href="/register">Đăng ký ngay!</Link>
          </div>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default Login
