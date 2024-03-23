'use client'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import React from 'react'
import StudentTable from './(components)/StudentTable'
import useAuth from '@/hook/useAuth'
import { redirect } from 'next/navigation'

const Students = () => {

  const { me } = useAuth();

  if (me.role === 'student') {
    return redirect('/manage/classes')
  }

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
      <StudentTable />
    </Flex>
  )
}

export default Students