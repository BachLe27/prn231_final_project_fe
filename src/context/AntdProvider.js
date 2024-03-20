'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, theme } from 'antd'

const { darkAlgorithm } = theme

const AntDesignProvider = ({
  children
}) => {
  return (
    <AntdRegistry>
      <ConfigProvider>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}

export default AntDesignProvider
