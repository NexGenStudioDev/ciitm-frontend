import React, { useState, useEffect } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import Input_Primary from '../../components/Atoms/Input/Input_Primary';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/AuthSlice';
import Swal from 'sweetalert2';
import {
   Assign_Admin_Role_EndPoint,
   Get_All_Admins_EndPoint,
   Delete_Admin_Role_EndPoint,
} from '../../utils/constants';
import Loader from 'react-spinners/ScaleLoader';

const override = {
   display: 'block',
   position: 'absolute',
   top: '40%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   margin: '0 auto',
};

const AdminRoleManagement = () => {
   const user = useSelector(selectUser);
   const [email, setEmail] = useState('');
   const [admins, setAdmins] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
   const [error, setError] = useState('');

   const currentUserEmail = user?.email;

   const fetchAdmins = async () => {
      try {
         setIsLoadingAdmins(true);
         setError('');
         const token = user?.token || localStorage.getItem('token');

         const res = await axios.get(Get_All_Admins_EndPoint, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         setAdmins(res.data.data || res.data || []);
      } catch (err) {
         setError(
            err?.response?.data?.message ||
               err.message ||
               'Failed to fetch admins',
         );
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
               err?.response?.data?.message ||
               err.message ||
               'Failed to fetch admins',
         });
      } finally {
         setIsLoadingAdmins(false);
      }
   };

   useEffect(() => {
      fetchAdmins();
   }, []);

   const handleAssignAdmin = async e => {
      e.preventDefault();
      if (!email.trim()) {
         Swal.fire({
            icon: 'warning',
            title: 'Validation Error',
            text: 'Please enter an email address',
         });
         return;
      }

      try {
         setIsLoading(true);
         setError('');
         const token = user?.token || localStorage.getItem('token');

         if (!token) {
            throw new Error('Missing auth token. Please log in.');
         }

         const res = await axios.post(
            Assign_Admin_Role_EndPoint,
            { email: email.trim() },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            },
         );

         Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.data.message || 'Admin role assigned successfully!',
            confirmButtonText: 'OK',
         });

         setEmail('');
         await fetchAdmins();
      } catch (err) {
         const errorMessage =
            err?.response?.data?.message ||
            err.message ||
            'Failed to assign admin role';
         setError(errorMessage);
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            confirmButtonText: 'OK',
         });
      } finally {
         setIsLoading(false);
      }
   };

   const handleDeleteAdmin = async adminEmail => {
      if (adminEmail === currentUserEmail) {
         Swal.fire({
            icon: 'warning',
            title: 'Cannot Revoke Access',
            text: 'You cannot revoke your own admin access.',
            confirmButtonText: 'OK',
         });
         return;
      }

      const result = await Swal.fire({
         icon: 'warning',
         title: 'Are you sure?',
         text: `Do you want to revoke admin access from ${adminEmail}?`,
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Yes, revoke access',
         cancelButtonText: 'Cancel',
      });

      if (!result.isConfirmed) return;

      try {
         setIsLoading(true);
         setError('');
         const token = user?.token || localStorage.getItem('token');

         if (!token) {
            throw new Error('Missing auth token. Please log in.');
         }

         const res = await axios.delete(
            `${Delete_Admin_Role_EndPoint}/${encodeURIComponent(adminEmail)}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            },
         );

         Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.data.message || 'Admin access revoked successfully!',
            confirmButtonText: 'OK',
         });

         await fetchAdmins();
      } catch (err) {
         const errorMessage =
            err?.response?.data?.message ||
            err.message ||
            'Failed to revoke admin access';
         setError(errorMessage);
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            confirmButtonText: 'OK',
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <title>Admin Role Management</title>
         <meta
            name='description'
            content="CIITM Admin Role Management - Manage admin access and permissions."
         />

         <AdminTemplate pageName='Admin Role Management'>
            <div className='w-[90%] mt-[4vh] flex flex-col gap-8 mb-[18vh]'>
               {/* Assign Admin Section */}
               <FormTemplate_Secondary
                  Title='Assign Admin Role'
                  TitleClassName='w-full bg-[#090909] text-white text-[1.5rem] py-4 px-6'
                  HeadingClassName='text-white text-xl md:text-2xl'
               >
                  <form
                     onSubmit={handleAssignAdmin}
                     className='w-full flex flex-col items-center justify-center px-6 py-8 gap-6'
                  >
                     <div className='w-full flex flex-col gap-2'>
                        <label
                           htmlFor='adminEmail'
                           className='text-white font-medium text-lg'
                        >
                           Email Address
                        </label>
                        <Input_Primary
                           type='email'
                           id='adminEmail'
                           name='adminEmail'
                           placeholder='Enter user email to assign admin role'
                           value={email}
                           onInput={e => setEmail(e.target.value)}
                           className='p-3 rounded-md bg-[#2B2C2B] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                           required
                        />
                     </div>

                     {error && (
                        <p className='text-red-500 text-sm w-full'>{error}</p>
                     )}

                     <button
                        type='submit'
                        disabled={isLoading}
                        className='
                  mt-2
                  px-8 py-3
                  bg-gradient-to-r from-green-500 to-green-700
                  text-white font-semibold rounded-lg shadow-md
                  hover:from-green-600 hover:to-green-800
                  hover:scale-105 active:scale-95 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  w-full md:w-auto
                '
                     >
                        {isLoading ? 'Assigning...' : 'Assign Admin Role'}
                     </button>
                  </form>
               </FormTemplate_Secondary>

               {/* Admin List Section */}
               <FormTemplate_Secondary
                  Title='Current Admin Users'
                  TitleClassName='w-full bg-[#090909] text-white text-[1.5rem] py-4 px-6'
                  HeadingClassName='text-white text-xl md:text-2xl'
               >
                  <div className='w-full px-6 py-8'>
                     {isLoadingAdmins ? (
                        <Loader
                           color='white'
                           loading={isLoadingAdmins}
                           cssOverride={override}
                           size={30}
                           aria-label='Loading Spinner'
                           data-testid='loader'
                        />
                     ) : admins.length === 0 ? (
                        <p className='text-gray-400 text-center py-8'>
                           No admin users found.
                        </p>
                     ) : (
                        <div className='overflow-x-auto'>
                           <table className='w-full border-collapse'>
                              <thead>
                                 <tr className='bg-[#090909] text-white'>
                                    <th className='border border-[#322F2F] px-4 py-3 text-left'>
                                       #
                                    </th>
                                    <th className='border border-[#322F2F] px-4 py-3 text-left'>
                                       Name
                                    </th>
                                    <th className='border border-[#322F2F] px-4 py-3 text-left'>
                                       Email
                                    </th>
                                    <th className='border border-[#322F2F] px-4 py-3 text-left'>
                                       Role
                                    </th>
                                    <th className='border border-[#322F2F] px-4 py-3 text-center'>
                                       Actions
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {admins.map((admin, index) => (
                                    <tr
                                       key={index}
                                       className='text-white hover:bg-[#2B2C2B] transition-colors'
                                    >
                                       <td className='border border-[#322F2F] px-4 py-3'>
                                          {index + 1}
                                       </td>
                                       <td className='border border-[#322F2F] px-4 py-3'>
                                          {admin.name || 'N/A'}
                                       </td>
                                       <td className='border border-[#322F2F] px-4 py-3'>
                                          {admin.email}
                                       </td>
                                       <td className='border border-[#322F2F] px-4 py-3'>
                                          <span className='bg-blue-600 text-white px-2 py-1 rounded text-sm'>
                                             {admin.role || 'admin'}
                                          </span>
                                       </td>
                                       <td className='border border-[#322F2F] px-4 py-3 text-center'>
                                          {admin.email === currentUserEmail ? (
                                             <span className='text-gray-400 text-sm'>
                                                Current User
                                             </span>
                                          ) : (
                                             <button
                                                onClick={() =>
                                                   handleDeleteAdmin(admin.email)
                                                }
                                                disabled={isLoading}
                                                className='
                                    bg-red-600 hover:bg-red-700
                                    text-white px-4 py-2 rounded
                                    transition-all duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    text-sm
                                  '
                                             >
                                                Revoke Access
                                             </button>
                                          )}
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     )}
                  </div>
               </FormTemplate_Secondary>
            </div>
         </AdminTemplate>
      </>
   );
};

export default AdminRoleManagement;

