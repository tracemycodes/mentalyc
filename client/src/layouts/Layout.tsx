import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar';
import Sidebar from '../components/SideBar/Sidebar';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div>
      <Navbar />
      <div className="flex relative h-[95vh]">
        <Sidebar />
        <div className="border-2 border-orange-600 p-8 pr-16 ml-60 grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
