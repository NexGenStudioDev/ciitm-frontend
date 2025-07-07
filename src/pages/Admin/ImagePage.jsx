import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';

import Image_Form_Title from '../../components/Molecules/Admin/image/Image_Form_Title';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';
import { Helmet } from 'react-helmet-async';
import { IoIosCloudUpload } from 'react-icons/io';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ImagePage = () => {
   const [selectedAlbum, setSelectedAlbum] = useState('');
   

   const [Album_Name, setAlbumName] = useState([]);


   let fetchAlbumName = async () => {
      try {
        let res = await axios.get('/api/v1/admin/get/all/albumName')
 
        setAlbumName(res.data.data.map(album => album.aName));
     
     
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to fetch album names.',
        });
      }
   
         return [];
      }
   };


   useEffect(()=>{
    
   fetchAlbumName()
   },[])
 
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
                     options={Album_Name}
                     optionSelectedData={data => selectedAlbum(data)}
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
