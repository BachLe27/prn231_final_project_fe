'use client'

import { Flex, Layout, theme } from 'antd'

const { Header, Content } = Layout

const AuthenticationLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
      </Header>

      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Flex align='center' justify='center'>
            {children}
          </Flex>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AuthenticationLayout
