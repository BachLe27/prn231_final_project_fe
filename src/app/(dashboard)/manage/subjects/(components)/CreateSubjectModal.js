'use client'
import useSubject from '@/data/useSubject'
import { LockOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'

const CreateSubjectModal = ({
  isModalOpen,
  handleOk,
  handleCancel
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient()

  const { createSubjectMutation } = useSubject()

  const onFinish = (values) => {
    setLoading(true);
    createSubjectMutation.mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['subjects']
        })
        message.success('Tạo môn học thành công')
        handleCancel()
        form.resetFields()
      },
      onError: () => {
        message.error('Tạo môn học thất bại')
      }
    })
    setLoading(false);
  }

  return (
    <Modal
      title={'Thêm môn học'}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        style={{ width: '100%' }}
        name="login"
        onFinish={onFinish}
        scrollToFirstError
        size="large"
        labelCol={{ span: 6 }}
        labelAlign='left'
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="name"
          label="Tên môn học"
          rules={[{ required: true, message: 'Vui lòng nhập Tên môn học!' }]}
        >
          <Input placeholder="Tên môn học" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập Mô tả!' }]}
        >
          <Input.TextArea prefix={<LockOutlined />} placeholder="Mô tả" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Tạo môn học
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateSubjectModal
