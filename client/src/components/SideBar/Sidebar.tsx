import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoFileTrayFull } from "react-icons/io5";

import { Link, useLocation } from 'react-router-dom';

type Props = {};

const Sidebar = (props: Props) => {
 const location = useLocation()

  return (
    <div className="w-60 border-b border-r border-[#DE0D6F] absolute h-full py-10 px-10 hidden lg:block">
      <ul className="h-full w-full">
        <li className="flex items-center">
          <Link to={'/'} className={`flex items-center space-x-3 ${location.pathname === '/' ? 'text-[#DE0D6F] bg-[#FFF0F7]' : 'text-[#292D32]'} w-full py-2 px-4`}>
            <AiFillHome className='text-3xl' /> <p>Home</p>
          </Link>
        </li>

        <li className="flex items-center my-6">
          <Link to={'/records'} className={`flex items-center space-x-3 ${location.pathname === '/records' ? 'text-[#DE0D6F] bg-[#FFF0F7]' : 'text-[#292D32]'} w-full py-2 px-4`}>
          <IoFileTrayFull className='text-3xl' /> <p>Records</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
