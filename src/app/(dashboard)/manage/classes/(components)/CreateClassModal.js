import useClasses from '@/data/useClasses'
import useProfile from '@/data/useProfile'
import useSubject from '@/data/useSubject'
import useAuth from '@/hook/useAuth'
import { LockOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'

const CreateClassModal = ({
  isModalOpen,
  handleCancel,
  handleOk
}) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient()

  const { createClassMutation } = useClasses()
  const { me } = useAuth()

  const onFinish = (values) => {
    setLoading(true);
    createClassMutation.mutate({
      ...values,
      teacherId: me.id
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['classes']
        })
        message.success('Tạo lớp học thành công')
        handleCancel()
        form.resetFields()
      },
      onError: () => {
        message.error('Tạo lớp học thất bại')
      }
    })
    setLoading(false);
  }

  return (
    <Modal
      title={'Tạo lớp học'}
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
  )
}

export default CreateClassModal