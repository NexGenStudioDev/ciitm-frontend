import React from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { FaUserGroup } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Student_SideBar = () => {
  return (
    <div className='w-[25%] h-screen mb-[4vh] bg-[#DDDDDD] rounded-md flex flex-col items-center justify-between p-3 border-2 border-black'>
        <div className="Profile_Pic h-fit">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2arksnbaPf0byiOZJkxTS0G2-5vcJvFKweg&s" alt="Profile" className='w-[90%] h-[70%] rounded-full mx-auto mt-5' />
            <h2 className='text-center mt-2 text-lg font-semibold'>Student Name</h2>
        </div>
        <div className="bg-[#C6C6C6] w-[90%] h-[70%] rounded-md">
            <ul className='flex flex-col items-start p-3 text-[1.5vw]'>
                <li className='py-2 px-4 hover:bg-gray-200 rounded-md w-full text-left flex items-center gap-2'>
                    <AiFillDashboard />
                     Dashboard
                    
                    </li>
                    <li className='py-2 px-4 hover:bg-gray-200 rounded-md w-full text-left flex items-center gap-2'>
                  <Link to="/student/Group" className='flex items-center gap-2'>
                    <FaUserGroup />
                    Student Group
                  </Link>
                    
                    </li>


            </ul>
        </div>
    </div>
  )
}

export default Student_SideBar