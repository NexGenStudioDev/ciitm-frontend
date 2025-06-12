import React, { useRef, useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Image_Form_Title from '../../components/Molecules/Admin/image/Image_Form_Title';

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

   const handleOptionClick = (option) => {
      setSelectedOption(option.name);
      setIsOptionOpen(false);
      setFocusedIndex(-1);
   };

   const handleDropdownClick = () => {
      setIsOptionOpen((prev) => !prev);
      setFocusedIndex(-1);
   };

   const handleKeyDown = (e) => {
      if (!isOptionOpen) return;
      if (e.key === 'Escape') {
         setIsOptionOpen(false);
         setFocusedIndex(-1);
      }
      if (e.key === 'ArrowDown') {
         setFocusedIndex((prev) => (prev < Album_Name.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowUp') {
         setFocusedIndex((prev) => (prev > 0 ? prev - 1 : Album_Name.length - 1));
      }
      if (e.key === 'Enter' && focusedIndex !== -1) {
         setSelectedOption(Album_Name[focusedIndex].name);
         setIsOptionOpen(false);
         setFocusedIndex(-1);
      }
   };

   return (
      <AdminTemplate pageName='Create Image'>
         <FormTemplate_Secondary>
         <Image_Form_Title Title="Create Image" />
            <div className='Select_Album_DropDown flex flex-col items-center justify-center w-full max-w-xl mx-auto mt-8'>
               <div
                  className='title w-full rounded-2xl bg-black flex items-center justify-between px-6 py-4 cursor-pointer select-none'
                  onClick={handleDropdownClick}
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  aria-haspopup="listbox"
                  aria-expanded={isOptionOpen}
               >
                  <h1 className='text-white text-lg font-semibold truncate'>
                     {selectedOption ? selectedOption : 'Select Album'}
                  </h1>
                  <MdOutlineArrowDropDown className={`text-white text-3xl transition-transform duration-200 ${isOptionOpen ? 'rotate-180' : ''}`} />
               </div>
               {isOptionOpen && (
                  <div
                     className='options w-full rounded-b-2xl bg-white shadow-lg flex flex-col items-stretch z-10 max-h-60 overflow-y-auto'
                     tabIndex={-1}
                     role="listbox"
                     onKeyDown={handleKeyDown}
                  >
                     {Album_Name.map((option, idx) => (
                        <div
                           key={option.id}
                           className={`option px-6 py-3 cursor-pointer text-gray-800 hover:bg-orange-100 focus:bg-orange-200 outline-none transition 
                              ${focusedIndex === idx ? 'bg-orange-200' : ''}`}
                           tabIndex={0}
                           role="option"
                           aria-selected={selectedOption === option.name}
                           onClick={() => handleOptionClick(option)}
                           onMouseEnter={() => setFocusedIndex(idx)}
                        >
                           <h1 className='truncate'>{option.name}</h1>
                        </div>
                     ))}
                  </div>
               )}

               <div className='Image_Upload_Container w-full mt-6'>
                  <input
                     type='file'
                     accept='image/*'
                     className='w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#3FEF9D] focus:border-transparent'
                  />
               </div>
            </div>
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default ImagePage;
