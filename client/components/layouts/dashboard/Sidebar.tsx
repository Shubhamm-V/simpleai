import React, { Fragment, useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Button, Affix } from 'antd';
import { SIDE_MENU_ITEMS } from '@/constants/menu';
import classes from './index.module.scss';
import { useSelector } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CloseOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
type Props = {
  content: any;
};
const Sidebar = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1300);
  const [screenLoad, setScreenLoad] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const userInfo = useSelector((state: any) => state.userReducer.user);
  const user = userInfo.data.user;
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      if (newWidth <= 576) toggleSidebar();

      setWindowWidth(newWidth);
    };
    if (!screenLoad) {
      updateWindowDimensions();
      setScreenLoad(true);
    }
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>
      <Affix>
        <Sider
          trigger={null}
          collapsible
          width={windowWidth <= 1100 ? '85vw' : '17vw'}
          collapsed={collapsed}
          collapsedWidth={0}
          className={`${showSidebar ? classes.show : classes.hide} ${
            classes.sidebar
          }`}
        >
          <div className={classes.logoContainer}>
            <h1>SimpleAI</h1>
            <CloseOutlined className={classes.close} onClick={toggleSidebar} />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            className={classes.menu}
          >
            {SIDE_MENU_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {item.children.map((subItem) => (
                      <Menu.Item key={subItem.key} className={classes.subMenu}>
                        <Link href={`/${item.key}/${subItem.key}`}>
                          {subItem.title}
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              }

              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
      </Affix>

      <Layout className={classes.sideLayout}>
        <Affix>
          <Header className={classes.header}>
            {collapsed ? (
              <Button
                onClick={() => {
                  setShowSidebar(true);
                  toggleSidebar();
                }}
                className={classes.toggle}
                icon={<MenuUnfoldOutlined />}
              />
            ) : (
              <Button
                onClick={toggleSidebar}
                className={classes.toggle}
                icon={<MenuFoldOutlined />}
              />
            )}
            <div className="profile">
              {/* Profile section content */}
              <Avatar
                size="small"
                src={user.profileImage}
                icon={<UserOutlined />}
              />
              <span style={{ marginLeft: 8 }}>{user.name}</span>
            </div>
          </Header>
        </Affix>
        <Content className={classes.content}>{props.content}</Content>
      </Layout>
    </Fragment>
  );
};

export default Sidebar;
