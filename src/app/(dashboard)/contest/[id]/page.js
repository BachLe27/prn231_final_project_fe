'use client'
import useAddSubmission from '@/data/useAddSubmission';
import useContestById from '@/data/useContestById';
import useGetSubmission from '@/data/useGetSubmission';
import useSubject from '@/data/useSubject';
import useSubjectById from '@/data/useSubjectById';
import useSubmissionById from '@/data/useSubmissionById';
import useSubmissionsByContest from '@/data/useSubmissionsByContest';
import useAuth from '@/hook/useAuth';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Flex, Form, Input, Modal, Row, Typography, message } from 'antd';
import moment from 'moment';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react'

const page = () => {

  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];

  const { data } = useContestById(id);
  const { data: subject } = useSubjectById(data?.subjectId);
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [loading, setLoading] = useState(false);
  const { me } = useAuth();
  const { data: haveSubmission, refetch } = useGetSubmission({
    contestId: id,
    studentId: me.id
  })

  const [modal, contextHolder] = Modal.useModal();

  const confirm = async () => {
    return await modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn chỉ có thể nộp bài 1 lần duy nhất và không thể sửa bài làm',
      centered: true,
    });
  };


  function getRemainingTime() {
    const endTime = moment(data?.endTime);
    const currentTime = moment();
    const diff = endTime.diff(currentTime);
    const duration = moment.duration(diff);

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds()
    };
  }

  const { submitSolutionMutation } = useAddSubmission()

  const [form] = Form.useForm()
  const onFinish = async (values) => {
    const ok = await confirm();
    if (!ok) return;

    setLoading(true);
    submitSolutionMutation.mutate({
      ...values,
      studentId: me.id,
      contestId: id,
      submissionTime: new Date().toISOString(),
    }, {
      onSuccess: () => {
        message.success("Nộp bài thành công")
        refetch()
      },
      onError: (err) => {
        message.error("Nộp bài thất bại, " + err.response.data)
      }
    })
    setLoading(false);
  }

  useEffect(() => {
    form.setFieldsValue({ ...haveSubmission })
  }, [form, haveSubmission])

  return (
    <Flex vertical gap={32}>
      <Flex gap={100}>
        <Flex vertical gap={16}>
          <Typography.Title>Bài làm</Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Bài thi:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {data?.name}
            </Typography.Text>
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Môn học:{' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {subject?.name}
            </Typography.Text>
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            Từ {moment(data?.startTime).format("HH:mm:ss - DD MMMM, YYYY")} {' '}
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            Đến {moment(data?.endTime).format("HH:mm:ss - DD MMMM, YYYY")}
          </Typography.Title>

          <Typography.Title level={5} style={{ margin: 0 }}>
            <UserOutlined /> {' '}
            <Typography.Text level={5} style={{ color: 'blue', fontSize: 16 }}>
              {me.fullname}
            </Typography.Text>
          </Typography.Title>

        </Flex>
        <Divider type='vertical' style={{ minHeight: '200px' }} />
        <Flex vertical>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Thời gian còn lại: {remainingTime.days} ngày {remainingTime.hours} giờ {remainingTime.minutes} phút {remainingTime.seconds} giây
          </Typography.Title>
          <Typography.Title level={3}>
            Đề bài:
          </Typography.Title>
          <Typography.Text level={3}>
            {data?.question}
          </Typography.Text>
        </Flex>
      </Flex>
      <Divider type='vertical' />
      <Form
        form={form}
        style={{ width: '100%' }}
        name="login"
        onFinish={onFinish}
        scrollToFirstError
        size="large"
        labelCol={{ span: 4 }}
        labelAlign='left'
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="content"
          label="Bài làm"
          rules={[{ required: true, message: 'Vui lòng làm bài!' }]}
        >
          <Input.TextArea readOnly={haveSubmission} style={{ height: 300 }} placeholder="Điền nội dung bài làm vào đây" />
        </Form.Item>

        {
          !haveSubmission ?
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                Nộp bài
              </Button>
            </Form.Item> :
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }} disabled>
                Bạn đã nộp bài
              </Button>
            </Form.Item>
        }
        {contextHolder}
      </Form>
    </Flex >
  )
}

export default page