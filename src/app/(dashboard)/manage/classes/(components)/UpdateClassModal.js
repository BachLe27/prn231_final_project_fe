import useClasses from '@/data/useClasses'
import { Avatar, Button, Card, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'

const UpdateClassModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  item,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { updateClassMutation } = useClasses()


  const onFinish = (values) => {
    setLoading(true)
    updateClassMutation.mutate(values, {
      onSuccess: () => {
        message.success("Cập nhật lớp học thành công")
        handleCancel()
      },
      onError: (err) => {
        message.error("Cập nhật lớp học thất bại", err.message)
      }
    })
    setLoading(false);

  }

  return <Modal
    title={'Sửa lớp học'}
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
      initialValues={{ ...item }}
    >
      <Form.Item name="id" style={{ display: 'none' }}>
        <Input placeholder="Tên lớp học" />
      </Form.Item>
      <Form.Item name="teacherId" style={{ display: 'none' }}>
        <Input placeholder="Tên lớp học" />
      </Form.Item>
      <Form.Item
        name="name"
        label="Tên lớp học"
        rules={[{ required: true, message: 'Vui lòng nhập Tên lớp học!' }]}
      >
        <Input placeholder="Tên lớp học" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  </Modal>
}

export default UpdateClassModal