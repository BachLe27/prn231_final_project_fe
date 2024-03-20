'use client'
import { PlusOutlined } from '@ant-design/icons'
import ClassCard from './(components)/ClassCard'
import Search from 'antd/es/input/Search'
import useClasses from '@/data/useClasses'
import CreateClassModal from './(components)/CreateClassModal'
import { useState } from 'react'

const { Flex, Typography, Button, Row, Col } = require('antd')

const Classes = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value)
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

  const { data } = useClasses()

  return (
    <Flex vertical gap={32}>
      <Flex vertical>
        <Typography.Title>Danh sách lớp học</Typography.Title>
        <Flex gap={24}>
          <Button
            icon={<PlusOutlined />}
            size='large'
            type='primary'
            style={{ fontWeight: 'bold' }}
            onClick={showModal}
          >
            Tạo lớp học mới
          </Button>
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
      <Row gutter={[32, 32]}>
        {
          data?.map((item) => {
            return <Col lg={8} xs={24} md={12} xl={6}>
              <ClassCard key={item.id} item={item} />
            </Col>
          })
        }
      </Row>


      <CreateClassModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Flex>
  )
}

export default Classes
