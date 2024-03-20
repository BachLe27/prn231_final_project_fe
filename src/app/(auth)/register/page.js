'use client'
import { useState } from 'react'
import { Form, Input, Button, Select, Typography, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useRegister from '@/data/useRegister'

const { Title } = Typography
const { Option } = Select

const Register = () => {
  const [loading, setLoading] = useState(false)
  const { registerMutation } = useRegister()
  const router = useRouter()

  const onFinish = (values) => {
    setLoading(true)

    registerMutation.mutate(values, {
      onSuccess: () => {
        message.success('Đăng ký thành công')
        router.push('/login')
      },
      onError: (err) => {
        console.log(err)
        message.error('Đăng ký thất bại: ' + err.response.data)
      }
    })

    setLoading(false)
  }

  return (
    <div style={{ width: 400, margin: 'auto', marginTop: 100 }}>
      <Title style={{ textAlign: 'center' }}>Đăng ký</Title>
      <Form
        name="register"
        initialValues={{ role: 'student', remember: true }}
        onFinish={onFinish}
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
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="fullname"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input size="large" prefix={<PhoneOutlined />} placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Vui lòng chọn role!' }]}
        >
          <Select size="large" placeholder="Select your role">
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        Đã có tài khoản? <Link href='login'>Đăng nhập</Link>
      </div>
    </div>
  )
}

export default Register
