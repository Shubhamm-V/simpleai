import React, { Fragment, useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import { SIDE_MENU_ITEMS } from '@/constants/menu';
import classes from './index.module.scss';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
type Props = {
  content: any;
};
const Sidebar = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1300);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>
      <Sider
        trigger={null}
        collapsible
        width={windowWidth <= 576 ? '80%' : '16rem'}
        collapsed={collapsed}
        collapsedWidth={0}
        className={classes.sidebar}
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
                      {subItem.title}
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
      <Layout>
        <Header className={classes.header}>
          {collapsed ? (
            <Button
              onClick={toggleSidebar}
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
            <Avatar size="small" icon={<UserOutlined />} />
            <span style={{ marginLeft: 8 }}>John Doe</span>
          </div>
        </Header>
        <Content className={classes.content}>{props.content}</Content>
      </Layout>
    </Fragment>
  );
};

export default Sidebar;
