import React from 'react';
import Nav_UserCard from '../../../Molecules/Cards/NavUserCard';
import Open_menu from '../../../Atoms/Icon/Open_menu';
import H3 from '../../../Atoms/Heading/H3';

const Admin_NavBar = ({ text }) => {
   return (
      <div className='nav_bar w-screen z-30 max-[998px]:py-[2.8vh] flex justify-between fixed  items-center mb-[2vh] px-[3vw] md:relative  bg-black top-0   max-[998px]:border-b-[2px] max-[998px]:border-[#2C2C2C]'>
         <div className='Nav_Text_Container w-[25%] h-full flex justify-end items-center'>
            <H3
               className={
                  'text-white text-[1.1vw]   max-[500px]:w-full max-[998px]:mt-[2vh] max-[476px]:text-[3.5vw] max-[1228px]:text-[1.2rem] font-semibold'
               }
            >
               {text ? text : 'Admin Panel'}
            </H3>
         </div>

         <Nav_UserCard textClassName='text-[0.9vw] text-white font-semibold' />
         <Open_menu />
      </div>
   );
};

export default Admin_NavBar;
