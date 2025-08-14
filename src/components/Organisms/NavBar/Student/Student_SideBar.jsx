import React, { useState } from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { FaUserGroup } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, redirect, useLocation } from 'react-router-dom';

const Student_SideBar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const location = useLocation();

  let user = useSelector(state => state.auth.user)

  if (!user) {
    redirect('/login');
  }

  console.log('User Data:', user);
  const menuItems = [
    {
      id: 'dashboard',
      icon: <AiFillDashboard className="text-xl" />,
      label: 'Dashboard',
      path: '/student/dashboard'
    },
    {
      id: 'group',
      icon: <FaUserGroup className="text-xl" />,
      label: 'Student Group',
      path: '/student/Group'
    }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className='w-80 h-[87vh] mb-[4vh] bg-gradient-to-br from-white/90 via-white/70 to-white/40 backdrop-blur-2xl rounded-3xl flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/30 overflow-hidden relative'>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
      
      {/* Profile Section */}
      <div className="p-8 border-b border-white/30 relative z-10">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            {/* Profile picture without gradient background */}
            <div className="w-24 h-24 rounded-full shadow-2xl">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2arksnbaPf0byiOZJkxTS0G2-5vcJvFKweg&s" 
                alt="Profile" 
                className='w-full h-full rounded-full object-cover border-2 border-white shadow-lg' 
              />
            </div>
            {/* Online status without ping animation */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
          </div>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2'>Student Name</h2>
          <p className='text-sm text-gray-600 font-semibold mb-3 px-4 py-1 bg-white/50 rounded-full backdrop-blur-sm'>Computer Science</p>
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/50">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-700 font-semibold">Online</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-6 relative z-10">
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id || location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleItemClick(item.id)}
                className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 ease-out overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.5)] transform translate-x-1'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-white/80 hover:to-white/40 hover:text-blue-600 hover:shadow-lg hover:transform hover:translate-x-1'
                }`}
              >
                {/* Animated background for active state */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
                )}
                
                <div className={`relative z-10 transition-all duration-500 ${
                  isActive 
                    ? 'text-white transform scale-110' 
                    : 'text-gray-500 group-hover:text-blue-500 group-hover:transform group-hover:scale-110'
                }`}>
                  {item.icon}
                </div>
                
                <span className={`relative z-10 font-semibold transition-all duration-500 ${
                  isActive 
                    ? 'text-white' 
                    : 'group-hover:text-blue-600'
                }`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <div className="ml-auto relative z-10">
                    <div className="w-3 h-3 bg-white rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                )}
                
                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Decorative bottom section */}
      <div className="p-6 relative z-10">
        <div className="h-20 bg-gradient-to-t from-white/20 to-transparent rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-2 animate-bounce"></div>
            <p className="text-xs text-gray-500 font-medium">Student Portal</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student_SideBar