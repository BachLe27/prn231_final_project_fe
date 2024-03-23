'use client'
import useClasses from '@/data/useClasses'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleFilled, SettingOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Form, Input, Modal, message } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import UpdateClassModal from './UpdateClassModal'
import useAuth from '@/hook/useAuth'

const { Meta } = Card

const ClassCard = ({
  item
}) => {

  const { me } = useAuth();

  const { deleteClassMutation } = useClasses()
  const { confirm } = Modal;
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



  const showDeleteConfirm = (id) => {
    confirm({
      title: `Bạn thực sự muốn xoá lớp học này?`,
      icon: <ExclamationCircleFilled />,
      content: 'Tất cả các bài thi và bài nộp liên quan đến môn học này sẽ bị xoá!',
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk() {
        deleteClassMutation.mutate(id, {
          onSuccess: () => {
            message.success("Xoá lớp học thành công");
          },
          onError: (error) => {
            message.success("Có lỗi trong quá trình xoá lớp học: " + error.response.data);
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };



  return (
    <>
      <Card
        style={{ width: '100%', cursor: 'pointer' }}
        cover={
          <img
            alt="example"
            src="https://assets.leetcode.com/contest/weekly-contest-374/card_img_1700975397.png"
          />
        }
        actions={me.role === 'teacher' && [
          <EditOutlined key="edit" onClick={showModal} />,
          <DeleteOutlined key="delete" onClick={() => { showDeleteConfirm(item.id) }} />
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={<Link href={`/manage/classes/${item.id}`}>{item.name}</Link>}
          description={`Giảng viên: ${item.teacherName}`}
        />
      </Card>
      <UpdateClassModal isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} item={item} />
    </>
  )
}

export default ClassCard
