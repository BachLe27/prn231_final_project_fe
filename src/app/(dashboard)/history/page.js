'use client'
import { Flex, Typography } from 'antd'
import React from 'react'
import ListHistory from './(components)/ListHistory'

const page = () => {
  return (
    <Flex vertical gap={32}>
      <Flex vertical>
        <Typography.Title>Lịch sử làm bài</Typography.Title>

        <ListHistory />
      </Flex>

    </Flex>
  )
}

export default page