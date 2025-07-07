import React from 'react';
import Input_Primary from '../../../Atoms/Input/Input_Primary';
import Link_btn from '../../../Atoms/Button/Link_btn';
import TextArea_Primary from '../../../Atoms/Textarea/TextArea_Primary';
import H3 from '../../../Atoms/Heading/H3';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Contact_view = ({ data = {} }) => {
   let Navigator = useNavigate();
   const handleDelete = async () => {
      const result = await Swal.fire({
         title: 'Are you sure?',
         text: 'You will not be able to recover this contact!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Yes, delete it!',
         cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
         try {
            let res = await axios.delete(
               '/api/v1/contact/admin/deleteContact/' + data?._id,
            );

            if (res.data.success) {
               Swal.fire({
                  icon: 'success',
                  title: 'Deleted',
                  text: 'Your contact has been deleted successfully!',
               });

               setTimeout(() => {
                  Navigator('/admin/contact');
               }, 1000);
            }
         } catch (error) {
            console.error('Error deleting contact:', error);
            Swal.fire({
               icon: 'error',
               title: 'Error',
               text:
                  error.response?.data?.message ||
                  'Something went wrong!',
            });
         }
      }
   };

   return (
      <div className='relative flex flex-col gap-4 max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw]'>
         <div className='Name_Container flex flex-col gap-2  px-[1.8vw]'>
            <label htmlFor='contact_name' className='text-white'>
               Contact Name
            </label>
            <Input_Primary
               type='text'
               id='contact_name'
               placeholder='Contact Name'
               readOnly={true}
               value={data?.cName || ''}
               className='w-[95%] bg-[#2B2C2B] rounded-md text-[#C7C0C0] h-fit p-[1vh] pl-[1vw]'
            />
         </div>
         <div className='flex flex-col gap-2 px-[1.8vw]'>
            <label htmlFor='contact_email' className='text-white'>
               Contact Email
            </label>
            <Input_Primary
               type='text'
               id='contact_email'
               placeholder='Contact Email'
               value={data?.cEmail || ''}
               readOnly={true}
               className='w-[95%] bg-[#2B2C2B] rounded-md text-[#C7C0C0] h-fit p-[1vh] pl-[1vw]'
            />
         </div>
         <div className='flex flex-col gap-2 px-[1.8vw]'>
            <label htmlFor='contact_number' className='text-white'>
               Contact Mobile Number
            </label>
            <Input_Primary
               type='text'
               id='contact_number'
               placeholder='Contact Mobile Number'
               readOnly={true}
               value={data?.cNumber || ''}
               className='w-[95%] bg-[#2B2C2B] rounded-md text-[#C7C0C0] h-fit p-[1vh] pl-[1vw]'
            />
         </div>
         <div className='flex flex-col gap-2 px-[1.8vw]'>
            <label htmlFor='contact_message' className='text-white'>
               Contact Message
            </label>
            <TextArea_Primary
               id='contact_message'
               value={data?.cMessage || ''}
               readOnly={true}
               placeholder='Contact Message'
               className='w-[95%] bg-[#2B2C2B] rounded-md text-[#C7C0C0] h-[20vh] p-[1vh] pl-[1vw]'
            />
         </div>

         <div className='Contact_btn_Container flex flex-wrap gap-4 mt-6 items-center justify-center'>
            <Link_btn
               link='/admin/contact'
               className='
              flex items-center gap-2
              px-[2vw] py-[1.2vh]
              bg-gradient-to-r from-gray-700 to-gray-900
              text-white  font-semibold rounded-lg shadow-md
              hover:from-gray-800 hover:to-black
              hover:scale-105 active:scale-95 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
            max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw]
            '
               buttonText='⬅️ Back'
            />

            {/* Reply Button */}
            <button
               className='
              flex items-center gap-2
              px-[2vw] py-[1.2vh]
              bg-gradient-to-r from-blue-500 to-blue-700
              text-white font-semibold rounded-lg shadow-md
              hover:from-blue-600 hover:to-blue-800
              hover:scale-105 active:scale-95 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw]
            '
               onClick={() =>
                  (window.location.href = `mailto:${data?.cEmail}`)
               }
            >
               💬 Reply
            </button>

            {/* Delete Button */}
            <button
               className='
              flex items-center gap-2
              px-[2vw] py-[1.2vh]
              bg-gradient-to-r from-red-500 to-red-700
              text-white font-semibold rounded-lg shadow-md
              hover:from-red-600 hover:to-red-800
              hover:scale-105 active:scale-95 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
             max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw]
            '
               onClick={handleDelete}
            >
               🗑️ Delete
            </button>
         </div>
      </div>
   );
};

export default Contact_view;
