
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from './Navbar';

const Layout = () => {
  return (
    <>
      <AppNavbar />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
