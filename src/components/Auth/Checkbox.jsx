import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInput, UpdateInput } from '../../store/AuthSlice';

const Checkbox = ({ label, name }) => {
   const [Value, setValue] = useState(null);
   const [Name, setName] = useState(name);

   let array = useSelector(state => state.auth.data);
   let find_index = array.findIndex(item => item.name === Name);

   let dispatch = useDispatch();

   let HandleCheckbox = e => {
      console.log(e.target.checked);

      setValue(e.target.checked);

      let data = {
         name: Name,
         value: e.target.checked,
      };

      if (find_index !== -1) {
         dispatch(UpdateInput(data));
      } else {
         dispatch(setInput(data));
      }
   };

   return (
      <>
         <input
            onClick={e => HandleCheckbox(e)}
            value={Value}
            type='checkbox'
            name={name}
            className='mr-2 transform scale-150 accent-[#FF6603]'
         />

         {label && (
            <label
               htmlFor='remember'
               className='text-[1.05vw] text-[#5F5F5F] max-[999px]:text-[3.05vw]'
            >
               {label}
            </label>
         )}
      </>
   );
};

export default Checkbox;
