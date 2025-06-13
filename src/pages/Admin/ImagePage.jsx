import React, { useRef, useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Image_Form_Title from '../../components/Molecules/Admin/image/Image_Form_Title';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';

const ImagePage = () => {
   const [isOptionOpen, setIsOptionOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState(null);
   const [focusedIndex, setFocusedIndex] = useState(-1);

   const Album_Name = [
      { id: 1, name: 'Album 1' },
      { id: 2, name: 'Album 2' },
      { id: 3, name: 'Album 3' },
      { id: 4, name: 'Album 4' },
      { id: 5, name: 'Album 5' },
   ];

   return (
      <AdminTemplate pageName='Create Image'>
         <FormTemplate_Secondary>
            <Image_Form_Title Title='Create Image' />

            <Dropdown_Primary
               width='70%'
               height='[8vh]'
               marginTop='2.8vh'
               options={[...Album_Name.map(album => album.name)]}
               backgroundColor='#1C1C1C'
               value='Select Album'
               border='2px solid #2C2C2C'
               textColor='#FFFFFF'
            />

            <div className='Image_Upload_Container w-full mt-6'>
               <input
                  type='file'
                  accept='image/*'
                  className='w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#3FEF9D] focus:border-transparent'
               />
            </div>
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default ImagePage;
