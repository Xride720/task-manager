import React, { FC, useMemo, useState } from 'react';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { SidebarProps } from './models';
import cl from './Sidebar.module.scss';
import { defaultSidebarProps, menuItems } from './constants';
import { Menu } from '@components/menu';
import store from '@store';

const Sidebar: FC<SidebarProps> = (props) => {
  const { logout } = store.AuthStore;
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const config = useMemo(() => {
    return {
      ...defaultSidebarProps,
      ...props
    };
  }, [props]);

  return (
    <div className={cl.sidebarCont} style={{
      width: collapsed ? config.collapsedWidth : config.fullWidth
    }}>
      <Button type="primary" onClick={toggleCollapsed} className={cl.collapseBtn + " " + cl.btn} >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        sections={menuItems.map(item => ({section: item}))}
        width={ collapsed ? config.collapsedWidth : config.fullWidth }
        collapsed={collapsed}
      />
      <Button type="primary" onClick={logout} className={cl.logoutBtn + " " + cl.btn} >
        <LogoutOutlined /> {!collapsed && "Выйти"}
      </Button>
    </div>
  );
};

export { Sidebar };