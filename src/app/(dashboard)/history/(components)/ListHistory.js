import useHistory from '@/data/useHistory';
import useAuth from '@/hook/useAuth';
import { Table, Typography } from 'antd';
import moment from 'moment';
import React from 'react'

const ListHistory = () => {
  const { me } = useAuth()
  const { data } = useHistory(me.id)

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Bài thi',
      key: 'contestName',
      render: (_, record) => (
        <Typography>
          {record.contest.name}
        </Typography>
      ),
    },
    {
      title: 'Môn',
      key: 'contestName',
      render: (_, record) => (
        <Typography>
          {record.subject}
        </Typography>
      ),
    },
    {
      title: 'Thời gian nộp bài',
      key: 'submissionTime',
      render: (_, record) => (
        <Typography>
          {moment(record.submissionTime).format('HH:mm:ss - DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      title: 'Điểm',
      key: 'grade',
      render: (_, record) => (
        <Typography>
          {record.grade}
        </Typography>
      ),
    },
    {
      title: 'Nhận xét của giáo viên',
      key: 'teacherFeedback',
      render: (_, record) => (
        <Typography>
          {record.teacherFeedback}
        </Typography>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
  )
}

export default ListHistory