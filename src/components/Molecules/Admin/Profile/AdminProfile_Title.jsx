import React, { useEffect, useState } from 'react';
import H4 from '../../../Atoms/Heading/H4';
import { MdEditSquare } from 'react-icons/md';
import Input_Primary from '../../../Atoms/Input/Input_Primary';
import {
   addInput,
   setInputValueByIndex,
   setInputValueByName,
} from '../../../../store/InputSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdminProfile_Title = () => {
   let [Title, setTitle] = useState('Profile');
   let [EditMode, setEditMode] = useState(true);
   const dispatch = useDispatch();

   const inputs = useSelector(state => state.Input.inputs);

   useEffect(() => {
      if (inputs.length > 0) {
         const ReadOnly = inputs.find(
            input => input.name === 'Profile_Edit',
         ).value;

         setTitle('Profile');

         if (!ReadOnly) {
            setTitle('Edit Profile');
         }
      }
   }, [inputs]);

   return (
      <div className='bg-[#090909] w-full h-[7.5vh] flex items-center justify-between px-[2vw]'>
         <H4 className='text-white text-[1.2vw] max-[376px]:text-[4vw] max-[640px]:text-[2.5vw] max-[1300px]:text-[1.8vw] font-bold text-center w-[95%]'>
            {Title}
         </H4>

         <Input_Primary
            name={'Profile_Edit'}
            placeholder='EditMode'
            readOnly={false}
            className='hidden'
            type='hidden'
            value={EditMode}
         />

         <MdEditSquare
            className='text-white text-[1.2vw] cursor-pointer'
            onClick={() => {
               const newEditMode = !EditMode;
               setEditMode(newEditMode);

               let data = inputs.findIndex(
                  i => i.name === 'Profile_Edit',
               );
               console.log('data', data);
               dispatch(
                  setInputValueByIndex({
                     index: data,
                     value: newEditMode,
                  }),
               );
            }}
         />
      </div>
   );
};

export default AdminProfile_Title;
