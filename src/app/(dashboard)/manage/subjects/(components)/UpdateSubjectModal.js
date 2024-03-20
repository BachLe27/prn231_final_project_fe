'use client'
import { getSubjectById } from '@/api/subjects/subjects'
import useSubject from '@/data/useSubject'
import { LockOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'

const UpdateSubjectModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  subjectId
}) => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ['class', subjectId],
    queryFn: () => getSubjectById(subjectId),
    select: (data) => (data.data)
  })

  const { updateSubjectMutation } = useSubject()

  useEffect(() => {
    form.setFieldsValue({ ...data })
  }, [form, data])

  const onFinish = (values) => {
    setLoading(true);
    updateSubjectMutation.mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['subjects']
        })
        message.success('Cập nhật thành công')
        handleCancel()
      },
      onError: () => {
        message.error('Cập nhật thất bại')
      }
    })

    setLoading(false);
    // Simulate login process
  }

  return (
    <Modal
      title={'Sửa thông tin môn học'}
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
        initialValues={{ ...data }}
      >
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input placeholder="Tên lớp học" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên lớp học"
          rules={[{ required: true, message: 'Vui lòng nhập Tên lớp học!' }]}
        >
          <Input placeholder="Tên lớp học" />
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateSubjectModal
