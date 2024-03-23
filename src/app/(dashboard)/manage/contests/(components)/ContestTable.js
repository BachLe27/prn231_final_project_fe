import React from 'react'
import ContestCard from './ContestCard'
import useContest from '@/data/useContest'
import { Col, Row } from 'antd'

const ContestTable = () => {

  const { data } = useContest()

  return (
    <Row gutter={[32, 32]}>
      {
        data?.map((item) => {
          return <Col lg={8} xs={24} md={12} xl={6}>
            <ContestCard key={item.id} item={item} />
          </Col>
        })
      }
    </Row>
  )
}

export default ContestTable