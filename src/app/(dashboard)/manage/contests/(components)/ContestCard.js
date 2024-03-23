import React, { useState } from 'react';
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Tooltip, Typography } from 'antd';
import moment from 'moment';
import useClassById from '@/data/useClassById';
import 'moment/locale/vi'
import Link from 'next/link';
import UpdateContestModal from './UpdateContestModal';
import { useRouter } from 'next/navigation';
import useAuth from '@/hook/useAuth';
moment.locale('vi')

const { Meta } = Card;

const ContestCard = ({ item }) => {
  const { me } = useAuth();
  const { data } = useClassById(item.classId);
  const router = useRouter();
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
  const isContestActive = moment(item.endTime).isAfter(moment()) && moment(item.startTime).isBefore(moment());

  const actions = [
    isContestActive ? (
      <Button type="primary" onClick={() => router.push(`/contest/${item.id}`)}>
        Tham gia
      </Button>
    ) : (
      <Button type="primary" disabled>
        Đã kết thúc
      </Button>
    ),
    <Tooltip title="Chỉnh sửa bài thi">
      <EditOutlined key="edit" onClick={showModal} />
    </Tooltip>,
    <DeleteOutlined key="delete" />
  ]

  return <Card
    style={{ cursor: 'pointer' }}
    cover={
      <img
        alt="example"
        src="https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"
      />
    }
    actions={me.role === 'teacher' ? actions : actions.slice(0, 1)}
  >
    <Meta
      title={
        <Link href={`/manage/contests/${item.id}`}>
          {item.name} - {data?.name}
        </Link>
      }
      description={
        <>
          <Flex gap={4}>
            <ClockCircleOutlined />
            <Typography> Bắt đầu: {moment(item.startTime).format("DD MMMM, YYYY HH:mm:ss")}</Typography>
          </Flex>
          <Flex gap={4}>
            <ClockCircleOutlined />
            <Typography> Kết thúc: {moment(item.endTime).format("DD MMMM, YYYY HH:mm:ss")}</Typography>
          </Flex>
        </>
      }
    />
    <UpdateContestModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      item={item}
    />
  </Card>
}

export default ContestCard;