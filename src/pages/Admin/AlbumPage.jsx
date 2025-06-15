import React, { useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import { Helmet } from 'react-helmet-async';
import { IoIosCloudUpload } from 'react-icons/io';
import Image_Form_Title from '../../components/Molecules/Admin/image/Image_Form_Title';
import Input_Primary from '../../components/Atoms/Input/Input_Primary';
import TextArea_Primary from '../../components/Atoms/Textarea/TextArea_Primary';

const AlbumPage = () => {
   const [albumName, setAlbumName] = useState('');
   const [albumDescription, setAlbumDescription] = useState('');

   return (
      <>
         <Helmet>
            <title>Create Album - CIITM Admin</title>
            <meta
               name='description'
               content="CIITM Admin Create Album Page - Manage your institution's album data efficiently."
            />
         </Helmet>

         <AdminTemplate pageName='Create Album'>
            <FormTemplate_Secondary>
               <Image_Form_Title Title='Create Album' />

               <Input_Primary
                  className="w-[85%] mx-auto mt-6 bg-[#090909] text-white rounded-md p-4"
                  placeholder="Enter Album Name"
                  value={albumName}
                  onChange={e => setAlbumName(e.target.value)}
               />

               <TextArea_Primary
                  className="w-[85%] mx-auto mt-6 bg-[#090909] text-white rounded-md p-4"
                  placeholder="Enter Your Album Description Here"
                  value={albumDescription}
                  onChange={e => setAlbumDescription(e.target.value)}
                  rows={5}
               />

               <label htmlFor='album-upload' className="bg-[#090909] w-[85%] h-[40%] rounded-md flex flex-col items-center justify-center mx-auto mt-6 relative">
                  <IoIosCloudUpload className='text-white text-4xl mb-2' />
                  <p className='text-white text-center'>Drag or Upload Album Cover</p>
               </label>

               <div className="btn_container flex justify-center mt-4">
                  <button className='bg-[#322F2F] text-white rounded-lg px-4 py-2'>
                     Create Album
                  </button>
               </div>

               <div className='Album_Upload_Container w-full mt-6'>
                  <input
                     type='file'
                     id='album-upload'
                     accept='image/*'
                     className='hidden'
                  />
               </div>
            </FormTemplate_Secondary>
         </AdminTemplate>
      </>
   );
};

export default AlbumPage;