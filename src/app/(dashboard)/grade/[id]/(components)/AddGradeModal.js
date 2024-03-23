import useClasses from '@/data/useClasses'
import useGrade from '@/data/useGrade'
import useProfile from '@/data/useProfile'
import useSubject from '@/data/useSubject'
import useSubmissionById from '@/data/useSubmissionById'
import useAuth from '@/hook/useAuth'
import { LockOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, message } from 'antd'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import { useState } from 'react'

const AddGradeModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  id,
  refetch
}) => {

  const { data } = useSubmissionById(id)

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const { updateSubmissionsMutation } = useGrade()

  const onFinish = (values) => {
    setLoading(true);
    updateSubmissionsMutation.mutate({
      studentId: data.student.id,
      contestId: data.contest.id,
      ...data,
      grade: Number(values.grade),
      ...values
    },
      {
        onSuccess: async (data) => {
          message.success('Chấm bài thành công')
          form.setFieldsValue({ ...data.data })
          refetch()
          handleCancel()
        },
        onError: () => {
          message.error('Chấm bài thất bại')
        }
      })
    setLoading(false);
  }

  return (
    <Modal
      title={'Chấm điểm'}
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
        initialValues={{
          ...data
        }}
      >
        <Form.Item
          name="grade"
          label="Điểm"
          rules={[{ required: true, message: 'Vui lòng nhập Điểm!' }]}
        >
          <Input type='number' placeholder="Điểm" />
        </Form.Item>

        <Form.Item
          name="teacherFeedback"
          label="Nhận xét"
        >
          <Input.TextArea placeholder="Nhận xét" />
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

export default AddGradeModal