import React, { useState } from 'react';
import { Modal, Space, Table, Tag, Typography } from 'antd';
import useStudent from '@/data/useStudent';
import moment from 'moment';
import Link from 'next/link';
import useAuth from '@/hook/useAuth';

const ListSubmissions = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [choosingId, setChoosingId] = useState()
  const { confirm } = Modal;
  const { me } = useAuth();
  const showModal = (id) => {
    setChoosingId(id)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Người nộp',
      dataIndex: 'student',
      key: 'student',
      render: (_, record) => (
        <Typography>
          {record?.student.fullname}
        </Typography>
      )
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'studentId',
      key: 'studentId',
      render: (_, record) => (
        <Typography>
          {record?.student.id}
        </Typography>
      )
    },
    {
      title: 'Thời gian nộp bài',
      dataIndex: 'submissionTime',
      key: 'submissionTime',
      render: (_, record) => (
        <Typography>
          {moment(record?.submissionTime).format("HH:mm:ss - DD MMMM, YYYY ")}
        </Typography>
      )
    },
    {
      title: 'Đánh giá của giáo viên',
      dataIndex: 'teacherFeedback',
      key: 'teacherFeedback',
    },
    {
      title: 'Điểm',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/grade/${record.id}`}>Chấm bài </Link>
        </Space>
      ),
    },
  ];

  return <>
    <Table columns={me.role === 'teacher' ? columns : columns.slice(0, -1)} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
    {/* <AddStudentToClass isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} studentId={choosingId} /> */}
  </>
}

export default ListSubmissions;