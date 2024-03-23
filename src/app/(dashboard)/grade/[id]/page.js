'use client'
import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Flex, Row, Typography, message } from 'antd';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import useSubmissionById from '@/data/useSubmissionById';
import 'moment/locale/vi';
import { ClockCircleOutlined, CommentOutlined, MessageOutlined, OpenAIOutlined, SignatureOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import AddGradeModal from './(components)/AddGradeModal';
import useChatGPT from '@/data/useChatGPT';

moment.locale('vi');

const Grade = () => {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];

  const { data, refetch } = useSubmissionById(id);

  const [chatGPTText, setChatGPTText] = useState();

  const { getChatGPTMutation } = useChatGPT()

  const displayTextCharacterByCharacter = (text) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setChatGPTText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust the interval duration (in milliseconds) for the desired typing speed
  };

  const handleOpenChatModal = () => {
    getChatGPTMutation.mutate(
      {
        requirement: `
        Hãy chấm bài sau theo thang điểm 10 một cách khó tính nhất và giải thích tại sao lại cho điểm như thế. 
      `,
        questions: data?.contest.question,
        student_answer: data?.content
      }, {
      onSuccess: (data) => {
        const chatGPTContent = data.data.content;
        displayTextCharacterByCharacter(chatGPTContent);
      },
      onError: () => {
        setChatGPTText("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    }
    )
  };


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
        <Flex vertical gap={16} style={{ width: 500 }}>
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

            Từ {moment(data?.contest?.startTime).format("HH:mm:ss - DD MMMM, YYYY")} {' '}
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            Đến {moment(data?.contest?.endTime).format("HH:mm:ss - DD MMMM, YYYY")}
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
              {moment(data?.submissionTime).format("HH:mm:ss - DD MMMM, YYYY")}
            </Typography.Text>
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            <SignatureOutlined /> Điểm:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {data?.grade ? `${data.grade} / 10` : 'Chưa chấm'}
            </Typography.Text>
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            <CommentOutlined /> Nhận xét:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {data?.teacherFeedback ?? 'Chưa có nhận xét'}
            </Typography.Text>
          </Typography.Title>
          <Button size='large' onClick={showModal} icon={<SmileOutlined />}>
            Chấm bài
          </Button>
        </Flex>
        <Divider type='vertical' style={{ minHeight: '400px' }} />
        <Flex vertical gap={30}>
          <Flex vertical>
            <Typography.Title><OpenAIOutlined /> ChatGPT Support</Typography.Title>
            <Flex>
              <Button size='large' onClick={handleOpenChatModal} loading={getChatGPTMutation.isPending} icon={<MessageOutlined />}>
                Nhận xét của Chat GPT
              </Button>
            </Flex>
          </Flex>
          <Flex style={{ width: 450 }}>
            <Typography.Title level={4}>{chatGPTText}</Typography.Title>
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
          <Typography.Text>
            {data?.content}
          </Typography.Text>
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
  );
};

export default Grade;
