import { Flex, Spin } from 'antd'

const Loading = () => {
  return (
    <Flex align='center' justify='center' style={{ height: '100vh', width: '100vw' }}>
      <Spin />
    </Flex>
  )
}

export default Loading
