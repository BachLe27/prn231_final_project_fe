'use client'
import useClassById from '@/data/useClassById'
import useContestById from '@/data/useContestById'
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Spin, Typography } from 'antd'
import moment from 'moment'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'moment/locale/vi'
import UpdateContestModal from '../(components)/UpdateContestModal'
import ListSubmissions from './(components)/ListSubmissions'
import useSubmissionsByContest from '@/data/useSubmissionsByContest'
import useAuth from '@/hook/useAuth'
moment.locale('vi')

const page = () => {
  const { me } = useAuth();
  const pathname = usePathname()
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];

  const { isLoading, data } = useContestById(id);
  const { data: classInfo } = useClassById(id);
  const { data: submissions } = useSubmissionsByContest(id);

  useEffect(() => {

  }, [submissions, data])

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
    <>
      <Flex vertical gap={32}>
        <Flex vertical>
          <Flex vertical>
            <Flex justify='space-between'>
              <Typography.Title level={3} style={{ margin: 0 }}>Bài thi {data?.name}</Typography.Title>
              {
                me.role === 'teacher' &&
                <Flex gap={8}>
                  <Button icon={<EditOutlined />} onClick={showModal}>Chỉnh sửa bài thi</Button>
                  <Button danger icon={<DeleteOutlined />}>Xoá bài thi</Button>
                </Flex>
              }

            </Flex>
            <Typography.Title level={4} style={{ marginTop: 8, marginBottom: 8 }}>Lớp: {classInfo?.name}</Typography.Title>
            <Typography.Text level={5}><ClockCircleOutlined /> Bắt đầu lúc: {moment(data?.startTime).format("HH:mm:ss - DD MMMM, YYYY")} </Typography.Text>
            <Typography.Text level={5}><ClockCircleOutlined /> Kết thúc lúc: {moment(data?.endTime).format("HH:mm:ss - DD MMMM, YYYY ")} </Typography.Text>
            <Divider />
          </Flex>
          <Flex vertical>

            <Typography.Title level={3} style={{ textAlign: 'center' }}>Đề bài</Typography.Title>

            <Typography.Text style={{ textAlign: 'left' }}>{data?.question}</Typography.Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>Danh sách bài nộp</Typography.Title>
        </Flex>

        <ListSubmissions data={submissions} />
        <UpdateContestModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          item={data}
        />
      </Flex>
    </>
  )
}

export default page