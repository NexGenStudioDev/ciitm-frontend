import React from 'react'
import Student_NavBar from '../../Organisms/NavBar/Student/Student_NavBar'
import Student_SideBar from '../../Organisms/NavBar/Student/Student_SideBar'


const StudentTemplate = ({children}) => {
  
  return (
    <div className='w-screen h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 '>
        <div className="sticky top-0 z-50">
            <Student_NavBar />
        </div>

        <div className='flex gap-6 p-6 min-h-[calc(100vh-7vh)]'>
          <Student_SideBar />
          <main className='flex-1 overflow-y-auto'>
            {children}
          </main>
        </div>
    </div>
  )
}

export default StudentTemplate