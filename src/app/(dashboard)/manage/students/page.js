'use client'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import React from 'react'

const Students = () => {
  return (
    <Flex vertical gap={32}>
      <Flex vertical>
        <Typography.Title>Danh sách sinh viên</Typography.Title>
        <Flex gap={24}>
          <Search
            placeholder="Tìm kiếm sinh viên"
            allowClear
            enterButton="Search"
            size="large"
            style={{ width: 500 }}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Students