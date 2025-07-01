import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';

import Image_Form_Title from '../../components/Molecules/Admin/image/Image_Form_Title';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';
import { Helmet } from 'react-helmet-async';
import { IoIosCloudUpload } from 'react-icons/io';

const ImagePage = () => {
   const Album_Name = [
      { id: 1, name: 'Album 1' },
      { id: 2, name: 'Album 2' },
      { id: 3, name: 'Album 3' },
      { id: 4, name: 'Album 4' },
      { id: 5, name: 'Album 5' },
   ];

   return (
      <>
         <Helmet>
            <title>Create Image - CIITM Admin</title>
            <meta
               name='description'
               content="CIITM Admin Create Image Page - Manage your institution's image data efficiently."
            />
         </Helmet>

         <AdminTemplate pageName='Create Image'>
            <FormTemplate_Secondary>
               <div className='Image_Form_Container w-full h-[90vh]  flex flex-col items-center'>
                  <Image_Form_Title Title='Create Image' />

                  <Dropdown_Primary
                     width='70%'
                     height='[8vh]'
                     marginTop='2.8vh'
                     options={[
                        ...Album_Name.map(album => album.name),
                     ]}
                     backgroundColor='#1C1C1C'
                     value='Select Album'
                     border='2px solid #2C2C2C'
                     textColor='#FFFFFF'
                  />

                  <label
                     htmlFor='image-upload'
                     className='bg-[#090909] w-[85%] h-[40%] rounded-md flex flex-col items-center justify-center mx-auto mt-6 relative'
                  >
                     <IoIosCloudUpload className='text-white text-4xl mb-2' />
                     <p className='text-white text-center'>
                        Drag or Upload Image
                     </p>
                  </label>

                  <div className='btn_container flex justify-center mt-4'>
                     <button className='bg-[#322F2F] text-white rounded-lg px-4 py-2'>
                        Upload Image
                     </button>
                  </div>

                  <div className='Image_Upload_Container w-full mt-6'>
                     <input
                        type='file'
                        id='image-upload'
                        accept='image/*'
                        className='hidden'
                     />
                  </div>
               </div>
            </FormTemplate_Secondary>
         </AdminTemplate>
      </>
   );
};

export default ImagePage;
