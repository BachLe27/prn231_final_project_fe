import useClassOfStudent from '@/data/useClassOfStudent'
import useClasses from '@/data/useClasses'
import useProfile from '@/data/useProfile'
import useStudentClass from '@/data/useStudentClass'
import useSubject from '@/data/useSubject'
import useAuth from '@/hook/useAuth'
import { LockOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Flex, Form, Input, Modal, Select, Typography, message } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

const AddStudentToClass = ({
  isModalOpen,
  handleCancel,
  handleOk,
  studentId
}) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient()

  const { data } = useClasses()

  const { addStudentToClassMutation } = useStudentClass()

  const { data: classOfStudent } = useClassOfStudent(studentId)

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onFinish = (values) => {
    setLoading(true);

    addStudentToClassMutation.mutate({
      ...values,
      studentId: studentId
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['classes']
        })
        await queryClient.invalidateQueries({
          queryKey: ['class-of-student', studentId]
        })
        message.success('Thêm sinh viên vào lớp học thành công')
        handleCancel()
        form.resetFields()
      },
      onError: (err) => {
        console.log(err);
        message.error('Thêm sinh viên vào lớp học thất bại: ' + err.response.data)
      }
    })

    setLoading(false);
  }

  return (
    <Modal
      title={'Thêm sinh viên vào lớp học'}
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
        <Flex style={{ marginBottom: 16 }}>
          {
            classOfStudent ?
              <Flex vertical>
                <Typography>Những lớp học đã tham gia: </Typography>
                <Flex gap={16}>
                  {classOfStudent?.map((item) => {
                    return <Link href={`/manage/classes/${item.id}`}>{item.name}</Link>
                  })}
                </Flex>
              </Flex> : <Typography>Sinh viên chưa tham gia lớp học nào! </Typography>
          }


        </Flex>
        <Form.Item name="classId" label="Lớp học" rules={[{ required: true, message: 'Vui chọn lớp học!' }]}>
          <Select
            showSearch
            placeholder="Chọn lớp"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={data?.map((item) => {
              return {
                value: item.id,
                label: item.name
              }
            })}
          />
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

export default AddStudentToClass