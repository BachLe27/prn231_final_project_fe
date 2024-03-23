import React, { useState } from 'react';
import { Modal, Space, Table, Tag } from 'antd';
import useStudent from '@/data/useStudent';
import useAuth from '@/hook/useAuth';
// import AddStudentToClass from './AddStudentToClassModal';

// "id": 2,
//     "username": "user2",
//     "password": "password2",
//     "fullname": "Jane Smith",
//     "role": "student",
//     "email": "jane.smith@example.com",
//     "phone": "9876543210",

const StudentTable = ({ data }) => {
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
          <a>Xoá khỏi lớp </a>
        </Space>
      ),
    },
  ];

  return <>
    <Table columns={me.role === 'teacher' ? columns : columns.slice(0, -1)} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
    {/* <AddStudentToClass isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} studentId={choosingId} /> */}
  </>
}

export default StudentTable;