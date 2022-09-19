import React, { FC } from 'react';
import { LayoutProps } from './models';
import cl from './Layout.module.scss';
import { Sidebar } from '@components/sidebar';
import { Outlet } from 'react-router-dom';

const Layout: FC<LayoutProps> = ({ }) => {
  return (
  <div className={cl.layout}>
    <div className={cl.sidebar}><Sidebar /></div>
    
    <div className={cl.layout_content}>
      <Outlet />
    </div>
</div>
  );
};

export { Layout };
