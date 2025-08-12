import React from 'react'
import Student_NavBar from '../../Organisms/NavBar/Student/Student_NavBar'
import Student_SideBar from '../../Organisms/NavBar/Student/Student_SideBar'

const StudentTemplate = ({children}) => {
  return (
    <div className='w-screen'>
        <div className="">
            <Student_NavBar />
        </div>

        <div className='flex p-5'>
        <Student_SideBar />
          {children}
        </div>



    </div>
  )
}

export default StudentTemplate