'use client'
import useChatGPT from '@/data/useChatGPT'
import useGrade from '@/data/useGrade'
import useSubmissionById from '@/data/useSubmissionById'
import { ClockCircleOutlined, CommentOutlined, HighlightOutlined, MessageOutlined, OpenAIOutlined, SignatureOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Input, Row, Select, Typography, message } from 'antd'
import moment from 'moment'
import 'moment/locale/vi'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CopyBlock } from 'react-code-blocks'
import AddGradeModal from './(components)/AddGradeModal'

moment.locale('vi')

const Grade = () => {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const id = segments[segments.length - 1]

  const { data, refetch } = useSubmissionById(id)

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { updateSubmissionsMutation } = useGrade()

  useEffect(() => {
    form.setFieldsValue({ ...data })
  }, [form, data])

  const onFinish = (values) => {
    setLoading(true)
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
    setLoading(false)
  }

  const [chatGPTText, setChatGPTText] = useState()

  const { getChatGPTMutation } = useChatGPT()

  const displayTextCharacterByCharacter = (text) => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setChatGPTText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 10) // Adjust the interval duration (in milliseconds) for the desired typing speed
  }

  const handleOpenChatModal = () => {
    getChatGPTMutation.mutate(
      {
        requirement: `
        Hãy chấm bài sau theo thang điểm 10 và trả về nhận xét theo những phần nội dung như sau: 
        - Phân tích chi tiết:
          + Ưu điểm: ...
          + Nhược điểm: ...
          + Các lỗi cú pháp: ...
          + Các lỗi logic có thể xảy ra khi chạy chương trình: ...
          - Lý do trừ điểm: ...
          + Mức độ đáp ứng yêu cầu: ...
        - Số điểm(theo thang điểm 10): ...
      `,
        questions: data?.contest.question,
        student_answer: data?.content
      }, {
      onSuccess: (data) => {
        const chatGPTContent = data.data.textContent
        displayTextCharacterByCharacter(chatGPTContent)
      },
      onError: () => {
        setChatGPTText('Đã có lỗi xảy ra, vui lòng thử lại sau')
      }
    }
    )
  }

  const [language, setLanguage] = useState('C')

  const handleChange = (value) => {
    setLanguage(value)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Flex vertical gap={32}>
      <Flex gap={32}>
        <Flex vertical gap={16} style={{ width: 750 }}>
          <Typography.Title>Thông tin bài nộp</Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Bài thi:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {data?.contest?.name}
            </Typography.Text>
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Môn học:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {data?.subjectName}
            </Typography.Text>
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>

            Từ {moment(data?.contest?.startTime).format('HH:mm:ss - DD MMMM, YYYY')} {' '}
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            Đến {moment(data?.contest?.endTime).format('HH:mm:ss - DD MMMM, YYYY')}
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            <UserOutlined /> Người nộp:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {data?.student?.fullname}
            </Typography.Text>
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            <ClockCircleOutlined />{' '}Thời gian nộp:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {moment(data?.submissionTime).format('HH:mm:ss - DD MMMM, YYYY')}
            </Typography.Text>
          </Typography.Title>

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
              <Input.TextArea placeholder="Nhận xét" style={{ height: 250 }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                Cập nhật
              </Button>
            </Form.Item>
          </Form>

        </Flex>
        <Divider type='vertical' style={{ minHeight: '400px' }} />
        <Flex vertical gap={30}>
          <Flex vertical>
            <Typography.Title><OpenAIOutlined /> ChatGPT Support</Typography.Title>
            <Flex gap={16}>
              <Button size='large' onClick={handleOpenChatModal} loading={getChatGPTMutation.isPending} icon={<MessageOutlined />}>
                Nhận xét của Chat GPT
              </Button>
              {
                chatGPTText && <Button size='large' icon={<HighlightOutlined />} onClick={
                  () => {
                    form.setFieldValue('teacherFeedback', chatGPTText)
                  }
                } >Lấy nhận xét</Button>
              }

            </Flex>
          </Flex>
          <Flex style={{ width: 450 }}>
            <Typography.Title level={4} style={{ whiteSpace: 'pre-line' }}>{chatGPTText}</Typography.Title>
          </Flex>
        </Flex>
      </Flex>

      <Divider type='vertical' />
      <Row>
        <Col span={9}>
          <Flex vertical>
            <Typography.Title level={3}>
              Đề bài:
            </Typography.Title>
            <Typography.Text>
              {data?.contest?.question}
            </Typography.Text>
          </Flex>
        </Col>

        <Col span={12}>
          <Typography.Title level={3}>
            Bài làm của thí sinh:
          </Typography.Title>

          <Flex align='center' gap={4} style={{ marginBottom: 16 }}>
            <Typography>Chọn ngôn ngữ: </Typography>
            <Select
              defaultValue="C"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'C', label: 'C' },
                { value: 'java', label: 'Java' },
                { value: 'javascript', label: 'JavaScript' },
                { value: 'python', label: 'Python' }
              ]}
            />
          </Flex>

          <CopyBlock
            text={data?.content}
            language={language}
            showLineNumbers={true}
            wrapLines
          />
        </Col>
      </Row>

      <AddGradeModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        id={data?.id}
        refetch={refetch}
      />
    </Flex>
  )
}

export default Grade
