'use client'
import useClassById from '@/data/useClassById'
import useStudentClass from '@/data/useStudentClass'
import { Flex, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { usePathname } from 'next/navigation'
import React from 'react'
import StudentTable from '../(components)/StudentTable'

const page = () => {
  const pathname = usePathname()
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];

  const { data } = useStudentClass(id);
  const { data: classInfo } = useClassById(id);

  console.log('data', data);
  return (
    <Flex vertical gap={32}>
      <Flex vertical>
        <Typography.Title>Danh sách sinh viên lớp {classInfo?.name}</Typography.Title>
      </Flex>
      <StudentTable data={data} />
    </Flex>
  )
}

export default page