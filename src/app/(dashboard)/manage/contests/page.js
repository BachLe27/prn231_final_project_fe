'use client'
import { PlusOutlined } from "@ant-design/icons"
import { Button, Flex, Typography } from "antd"
import { useState } from "react"
import CreateContestModal from "./(components)/CreateContestModal"
import ContestTable from "./(components)/ContestTable"
import useAuth from "@/hook/useAuth"

const Contests = () => {
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
    <Flex vertical gap={32}>
      <Flex vertical>
        <Typography.Title>Danh sách bài thi</Typography.Title>
        <Flex gap={24}>
          {
            me.role === 'teacher' &&
            <Button
              icon={<PlusOutlined />}
              size='large' type='primary'
              style={{ fontWeight: 'bold' }}
              onClick={showModal}
            >
              Tạo bài thi
            </Button>
          }
        </Flex>
      </Flex>
      <CreateContestModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ContestTable />
    </Flex>
  )
}

export default Contests
