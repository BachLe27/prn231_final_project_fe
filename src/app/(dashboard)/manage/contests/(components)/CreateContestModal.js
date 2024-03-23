'use client'
import useClasses from '@/data/useClasses'
import useContest from '@/data/useContest'
import useSubject from '@/data/useSubject'
import { LockOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd'
import { useState } from 'react'

const CreateContestModal = ({
  isModalOpen,
  handleOk,
  handleCancel
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient()
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeDateTime = (date, dateString) => {
    console.log(date, dateString);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const { data } = useSubject()
  const { data: classes } = useClasses()

  const { createContestMutation } = useContest()
  const onFinish = (values) => {
    console.log(values);
    setLoading(true);
    createContestMutation.mutate({
      ...values,
      startTime: startTime.replace(' ', 'T') + '.000Z',
      endTime: endTime.replace(' ', 'T') + '.000Z'
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['Contests']
        })
        message.success('Tạo bài thi thành công')
        handleCancel()
        form.resetFields()
      },
      onError: (err) => {
        message.error('Tạo môn học thất bại: ' + err.response.data)
      }
    })

    setLoading(false);
  }

  return (
    <Modal
      title={'Tạo bài thi mới'}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={'60vw'}
    // style={{ width: '100vw', height: '100vh' }}
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
          label="Tên bài thi"
          rules={[{ required: true, message: 'Vui lòng nhập Tên bài thi!' }]}
        >
          <Input placeholder="Tên bài thi" />
        </Form.Item>

        <Form.Item name="subjectId" label="Môn học" rules={[{ required: true, message: 'Vui chọn môn học!' }]}>
          <Select
            showSearch
            placeholder="Chọn môn học"
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

        <Form.Item name="classId" label="Lớp" rules={[{ required: true, message: 'Vui chọn lớp!' }]}>
          <Select
            showSearch
            placeholder="Chọn lớp"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={classes?.map((item) => {
              return {
                value: item.id,
                label: item.name
              }
            })}
          />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Thời gian bắt đầu"
          rules={[{ required: true, message: 'Vui lòng chọn Thời gian bắt đầu!' }]}
        >
          <DatePicker placeholder='Chọn thời gian bắt đầu' onChange={(date, dateString) => { setStartTime(dateString) }} showTime needConfirm={false} />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="Thời gian kết thúc"
          rules={[{ required: true, message: 'Vui lòng chọn Thời gian kết thúc!' }]}
        >
          <DatePicker placeholder='Chọn thời gian kết thúc' onChange={(date, dateString) => { setEndTime(dateString) }} showTime needConfirm={false} />
        </Form.Item>



        <Form.Item
          name="question"
          label="Đề bài"
          rules={[{ required: true, message: 'Vui lòng nhập Đề bài!' }]}
        >
          <Input.TextArea prefix={<LockOutlined />} placeholder="Đề bài" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Tạo bài thi
          </Button>
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default CreateContestModal
