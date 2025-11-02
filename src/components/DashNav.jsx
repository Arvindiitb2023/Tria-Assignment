import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const baseItem =
    'flex items-center gap-4 px-3 py-2 mb-6 rounded-md text-sm font-normal text-white transition-all duration-200 ease-in-out';

  const activeItem =
    'bg-[#1A205B] text-white backdrop-blur-sm shadow-md';

  const defaultItem =
    'hover:bg-[#1A205B] hover:text-white hover:pl-2 ';


  return (
    <div className={"fixed top-0 left-0 z-40 min-h-screen bg-[#212762] p-4 transition-all duration-300 ease-in-out w-[240px]"}>


      {/* Menu Items */}
      {[
        { to: "/contact-list", label: "Contact List" },
        { to: "/", label: "About Us" },
      ].map(({ to,label }) => (
        <NavLink
          to={to}
          key={label}
          className={({ isActive }) =>
            `${baseItem} ${isActive ? activeItem : defaultItem}`
          }
        >
          <span>{label}</span>
        </NavLink>
      ))}
    </div>

  );
};

export default Sidebar;

