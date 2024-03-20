'use client'

import useProfile from '@/data/useProfile'
import useAuth from '@/hook/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { ReadOutlined, ReconciliationOutlined, SolutionOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Flex, Layout, Menu, Typography, message, theme } from 'antd'
import { useMemo } from 'react'

const { Header, Content, Sider } = Layout

const DashboardLayout = ({ children }) => {
  const router = useRouter()
  const { logout, isAuthenticated, me } = useAuth()

  const { data } = useProfile(me?.id)

  const siderMenu = useMemo(() => {
    return [
      {
        key: '/manage/classes',
        icon: <SolutionOutlined />,
        label: 'Lớp học',
        href: '/manage/classes'
      },
      {
        key: '/manage/contests',
        icon: <ReconciliationOutlined />,
        label: 'Bài thi',
        href: '/manage/contests'
      },
      {
        key: '/manage/subjects',
        icon: <ReadOutlined />,
        label: 'Môn học',
        href: '/manage/subjects'
      },
      {
        key: '/manage/students',
        icon: <TeamOutlined />,
        label: 'Sinh viên',
        href: '/manage/students'
      }
    ].map((option) => {
      return {
        ...option,
        onClick: () => { router.push(option.href) }
      }
    })
  }, [])

  const accountItems = useMemo(
    () => [
      {
        label: 'Thông tin cá nhân',
        href: '/profile'
      },
      {
        label: 'Lịch sử làm bài',
        href: '/history'
      },
      {
        label: 'Đăng xuất',
        href: '/logout'
      }
    ].map((key) => ({
      key: key.href,
      label: key.label,
      onClick: () => {
        if (key.href === '/logout') {
          logout()
          message.success('Đã đăng xuất')
        } else {
          router.push(key.href)
        }
      }
    })),
    [router]
  )

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  if (!isAuthenticated) {
    return router.push('/login')
  }
  const pathname = usePathname()

  console.log(pathname)

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Flex style={{ flex: 1, minWidth: 0 }}>
          <Typography.Text style={{ color: 'white' }}>Hello {data?.fullname ?? ''}!</Typography.Text>
        </Flex>
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
        <Dropdown
          trigger={['click']}
          menu={{
            theme: 'dark',
            items: accountItems,
            mode: 'vertical',
            style: { flex: 1, minWidth: 0 }
          }}
        >
          <a>
            <Avatar size="large" icon={<UserOutlined />} />
          </a>
        </Dropdown>
      </Header>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={siderMenu}
          />
        </Sider>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content
            style={{
              padding: 32,
              margin: 0,
              minHeight: 'calc(87vh)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
