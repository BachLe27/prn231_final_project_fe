import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import useStudent from '@/data/useStudent';
import AddStudentToClass from './AddStudentToClassModal';

// "id": 2,
//     "username": "user2",
//     "password": "password2",
//     "fullname": "Jane Smith",
//     "role": "student",
//     "email": "jane.smith@example.com",
//     "phone": "9876543210",

const StudentTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [choosingId, setChoosingId] = useState()

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { showModal(record.id) }}>Thêm sinh viên vào lớp...  </a>
          <a>Xem danh sách lớp</a>
        </Space>
      ),
    },
  ];


  const { data } = useStudent()
  return <>
    <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
    <AddStudentToClass isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} studentId={choosingId} />
  </>
}

export default StudentTable;