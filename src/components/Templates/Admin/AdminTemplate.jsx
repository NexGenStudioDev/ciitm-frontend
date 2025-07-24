import Admin_NavBar from '../../Organisms/NavBar/Admin/AdminNavBar';

import Admin_SideBar from '../../Organisms/SideBar/Admin/Admin_SideBar';

const AdminTemplate = ({ children, pageName }) => (
   <div className='bg-black w-screen  flex flex-col '>
      <div className='flex text-white'>
         <Admin_NavBar text={pageName} />
      </div>

      <div className='flex h-full w-screen'>
         <Admin_SideBar />

         <div className='Page1_right_Admin_Template w-[74%] max-[999px]:w-full  max-[500px]:bg-black h-full py-[18vh] md:py-0 flex  relative justify-between'>
            <div className='w-full h-full flex  flex-col items-center'>
               {children}
            </div>
         </div>
      </div>
   </div>
);

export default AdminTemplate;
