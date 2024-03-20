'use client'
import { useEffect, useState } from 'react'
import { Form, Input, Button, message, Typography } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import useAuth from '@/hook/useAuth'
import { updateProfile } from '@/api/account/profile'
import useProfile from '@/data/useProfile'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { me } = useAuth()

  const { data: profile, updateProfileMutation } = useProfile(me.id)
  useEffect(() => {
    form.setFieldsValue({ ...profile })
  }, [form, profile])

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // Simulate update profile process
      console.log('Received values:', values)
      await updateProfileMutation.mutate(values, {
        onSuccess: () => message.success('Cập nhật thông tin thành công'),
        onError: () => message.error('Cập nhật thông tin thất bại')
      })
    } catch (error) {
      console.error('Error:', error)
      message.error('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div style={{ width: 600, margin: 'auto', marginTop: 100 }}>
      <Typography.Title style={{ textAlign: 'center' }}>Thông tin tài khoản</Typography.Title>
      <Form
        form={form}
        name="updateProfile"
        onFinish={onFinish}
        initialValues={{ ...profile ?? {} }}
        size='large'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="password"
          style={{ display: 'none' }}
        >
          <Input prefix={<UserOutlined />} disabled />
        </Form.Item>
        <Form.Item
          name="id"
          style={{ display: 'none' }}
        >
          <Input prefix={<UserOutlined />} disabled />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}

        >
          <Input prefix={<UserOutlined />} placeholder="Username" disabled />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" disabled />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Họ và tên"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<MailOutlined />} type='email' placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input prefix={<PhoneOutlined />} minLength={10} placeholder="Phone Number" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Profile
