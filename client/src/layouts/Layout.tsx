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
        <div className="px-5 py-8 sm:p-8 xl:pr-16 lg:ml-64 ml-0 grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
