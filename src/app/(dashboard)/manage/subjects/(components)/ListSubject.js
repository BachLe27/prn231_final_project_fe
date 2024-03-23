import useSubject from '@/data/useSubject'
import { Col, List, Modal, Row, Skeleton, Space, Table, message } from 'antd'
import { useState } from 'react'
import UpdateSubjectModal from './UpdateSubjectModal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import useAuth from '@/hook/useAuth'

const ListSubject = () => {
  const { isLoading, data } = useSubject()
  const [editingId, setEditingId] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { me } = useAuth();
  const { deleteSubjectMutation } = useSubject()

  const { confirm } = Modal;
  const showModal = (id) => {
    setEditingId(id)
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
      title: `Bạn thực sự muốn xoá môn học này?`,
      icon: <ExclamationCircleFilled />,
      content: 'Tất cả các bài thi và bài nộp liên quan đến môn học này sẽ bị xoá!',
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk() {
        deleteSubjectMutation.mutate(id, {
          onSuccess: () => {
            message.success("Xoá môn học thành công");
          },
          onError: (error) => {

            message.success("Có lỗi trong quá trình xoá môn học: " + error.response.data);
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a key="list-loadmore-edit" onClick={() => showModal(record.id)}>Sửa</a>
          <a key="list-loadmore-more" onClick={() => showDeleteConfirm(record.id)}>Xoá</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={me.role === 'teacher' ? columns : columns.slice(0, -1)} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
      <UpdateSubjectModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        subjectId={editingId}
      />
    </>
  )
}

export default ListSubject
