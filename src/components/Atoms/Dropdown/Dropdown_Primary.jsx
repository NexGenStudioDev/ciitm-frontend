import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const Dropdown_Primary = ({
   options = [],
   backgroundColor = '#1C1C1C',
   textColor = '#FFFFFF',
   height = '5vh',
   width = '20vw',
   marginTop = '1vh',
   marginBottom = '1vh',
   marginLeft = '1vw',
   marginRight = '1vw',
   border = '1px solid red',
   value = 'Select an option',
}) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState(value || '');
   const dropdownRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = event => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setIsDropdownOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener(
            'mousedown',
            handleClickOutside,
         );
      };
   }, []);

   const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

   const handleOptionClick = option => {
      setSelectedOption(option);
      setIsDropdownOpen(!false);
   };

   //  use redux to manage the selected option if needed

   return (
      <div
         ref={dropdownRef}
         style={{
            backgroundColor,
            color: textColor,
            height,
            width,
            minWidth: 120,
            border,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
         }}
         className='relative flex items-center justify-between rounded-lg cursor-pointer'
         tabIndex={0}
         onClick={toggleDropdown}
         onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') toggleDropdown();
         }}
      >
         <div className='flex items-center justify-between w-full h-full px-[1vw] py-[1vh]'>
            <span className='truncate'>
               {selectedOption || value}
            </span>
            <IoMdArrowDropdown className='ml-2 text-xl' />
         </div>
         {isDropdownOpen && (
            <div
               className='absolute top-full left-0 w-full rounded-lg border border-[#1C1C1C] z-20 shadow-lg'
               style={{ backgroundColor, border }}
            >
               {options.length === 0 ? (
                  <div className='p-2 text-gray-400'>No options</div>
               ) : (
                  options.map((option, index) => (
                     <div
                        key={index}
                        className='p-2 hover:bg-[#333] transition-colors cursor-pointer'
                        style={{ color: textColor }}
                        onClick={() => handleOptionClick(option)}
                     >
                        {option}
                     </div>
                  ))
               )}
            </div>
         )}
      </div>
   );
};

export default Dropdown_Primary;
