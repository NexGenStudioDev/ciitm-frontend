import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BiHomeSmile } from 'react-icons/bi';
import { TbPigMoney } from 'react-icons/tb';
import { SiCoursera } from 'react-icons/si';
import { FaImage } from 'react-icons/fa';
import { GoBellFill } from 'react-icons/go';
import { PiStudentBold } from 'react-icons/pi';
import { GiCash } from "react-icons/gi";
import gsap from 'gsap';
import AdminSidebarLink from '../../../Atoms/Links/AdminSidebarLink';

const links = [
   { name: 'Home', link: '/admin/DashBoard', icon: <BiHomeSmile /> },
   {
      name: 'Earnings',
      link: '/admin/Earnings',
      icon: <TbPigMoney />,
   },
   {
      name: 'Notifications',
      link: '/admin/Notifications',
      icon: <GoBellFill />,
   },
   {
      name: 'Students',
      link: '/admin/Students',
      icon: <PiStudentBold />,
   },
   { name: 'Courses', link: '/admin/Courses', icon: <SiCoursera /> },
   { name: 'Image', link: '/admin/create/Image', icon: <FaImage /> },
   { name: 'Fee Payment', link: '/admin/student/pay/fee', icon: <GiCash /> }
];

const Admin_SideBar = () => {
   const menu = useSelector(state => state.menu.menu);
   const dispatch = useDispatch();
   const sideBarRef = useRef();

   const isMobile = () => window.innerWidth < 1000;

   const handleSidebarOpen = () => {
      if (isMobile()) {
         gsap.to(sideBarRef.current, {
            y: '0%',
            duration: 0.5,
            delay: 0.1,
            ease: 'power3.out',
            display: 'flex',
         });
      }
   };

   const handleSidebarClose = () => {
      if (isMobile()) {
         gsap.to(sideBarRef.current, {
            y: '-100%',
            delay: 0.1,
            duration: 0.5,
            ease: 'power3.in',
         });
      }
   };

   useEffect(() => {
      if (menu) {
         handleSidebarOpen();
      } else {
         handleSidebarClose();
      }
   }, [menu]);

   useEffect(() => {
      if (isMobile()) {
      }
   }, [location.pathname]);

   return (
      <div
         ref={sideBarRef}
         className='Side_bar fixed z-10 w-screen h-screen  ease-in-out  bg-black p-[2vw]  flex-col  overflow-hidden  min-[1000px]:relative md:w-[30%] lg:w-[25%]  md:h-screen  md:bg-[#1C1C1C]  md:ml-[1.5vw]  md:rounded-xl  md:border  md:border-[#322F2F]  min-[999px]:mt-[3.7vh]    
      '
      >
         <div className='w-full h-[70%] flex flex-col mt-[12vh] md:mt-[4vh] gap-[2vh]'>
            {links.map((link, index) => (
               <AdminSidebarLink
                  key={index}
                  icon={link.icon}
                  link={link.link}
                  name={link.name}
               />
            ))}
         </div>
      </div>
   );
};

export default Admin_SideBar;
