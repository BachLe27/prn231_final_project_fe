import useSubject from '@/data/useSubject'
import { Col, List, Modal, Row, Skeleton, message } from 'antd'
import { useState } from 'react'
import UpdateSubjectModal from './UpdateSubjectModal'
import { ExclamationCircleFilled } from '@ant-design/icons'

const ListSubject = () => {
  const { isLoading, data } = useSubject()
  const [editingId, setEditingId] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            message.success("Có lỗi trong quá trình xoá môn học", error.response.message);
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <Row style={{ width: '100%' }}>
      <Col xs={24} xl={12}>
        <List
          className="demo-loadmore-list"
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit" onClick={() => showModal(item.id)}>Sửa</a>,
                <a key="list-loadmore-more" onClick={() => showDeleteConfirm(item.id)}>Xoá</a>
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={<a>{item.name}</a>}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
        >
        </List>
      </Col>
      <UpdateSubjectModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        subjectId={editingId}
      />
      {/* <Pagination defaultCurrent={1} total={50} /> */}
    </Row>
  )
}

export default ListSubject
