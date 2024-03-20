import { Flex, Spin } from 'antd'

const Loading = () => {
  return (
    <Flex align='center' justify='center' style={{ height: '100%', width: '100%' }}>
      <Spin />
    </Flex>
  )
}

export default Loading
