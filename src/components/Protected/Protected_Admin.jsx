
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ErrorPage from '../Templates/ErrorPage';

const Protected_Admin = () => {
   let student = useSelector(state => state.auth.user);

   if (!student) {
      return <ErrorPage />;
   }

   return (
      <>{student.role !== 'admin' ? <ErrorPage /> : <Outlet />}</>
   );
};

export default Protected_Admin;