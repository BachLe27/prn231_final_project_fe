'use client'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import ListSubject from './(components)/ListSubject'
import CreateSubjectModal from './(components)/CreateSubjectModal'
import { useState } from 'react'
import useAuth from '@/hook/useAuth'

const Subjects = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { me } = useAuth();
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
    <Flex vertical gap={24}>
      <Flex vertical>
        <Typography.Title>Danh sách môn học</Typography.Title>
        <Flex gap={24}>
          {
            me.role === 'teacher' && <Button
              icon={<PlusOutlined />}
              size='large' type='primary'
              style={{ fontWeight: 'bold' }}
              onClick={showModal}
            >
              Tạo môn học mới
            </Button>
          }

          <Search
            placeholder="Tìm kiếm lớp học"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            style={{ width: 500 }}
          />
        </Flex>
      </Flex>

      <ListSubject />

      <CreateSubjectModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Flex>
  )
}

export default Subjects
