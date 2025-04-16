import Admin_NavBar from '../../Organisms/NavBar/Admin/AdminNavBar';
import Admin_SideBar from '../../Organisms/SideBar/Admin/Admin_SideBar';

const AdminTemplate = ({ children, pageName }) => (
   <div className='bg-black w-screen h-[120vh] flex flex-col'>
      <div className='flex'>
         <Admin_NavBar text={pageName} />
      </div>

      <div className='flex flex-col lg:flex-row h-auto min-h-screen'>
         <Admin_SideBar />

         <div className='w-full lg:w-[75%] px-4 mt-4 lg:mt-0'>
            {children}
         </div>
      </div>
   </div>
);

export default AdminTemplate;
