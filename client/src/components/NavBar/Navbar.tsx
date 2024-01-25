import React from 'react';
import logo from '../../assets/mentalyc-logo.png'

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="border-b border-pink-shed p-4 px-5 sm:px-8 py-6">
      <div className="m-auto">
        <div className="h-8 w-12">
          <img src={logo} alt="logo" className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
