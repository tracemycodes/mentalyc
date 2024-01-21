import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
