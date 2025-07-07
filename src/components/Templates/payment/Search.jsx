import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { setPayment_Info } from '../../../store/PaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Search = () => {
   const dispatch = useDispatch();
   const [Student_Id, setStudent_Id] = useState(null);
   const payment = useSelector(state => state.Payment.Payment_Info);

   let Handle_Search = async () => {
      try {
       
         const response = await axios.get(
            `/api/find/student/payment/info?uniqueId=${Student_Id}`,
         );

         const data = response.data.data;

         dispatch(setPayment_Info(data));
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Student Id not found!',
         });
      }
   };

   return (
      <div className='Student_Id_Container w-full bg-[#FAFAFA]  p-4'>
         <label htmlFor='ujnju'>
            <h1 className='text-[1vw] max-[599px]:text-[3vw] font-medium mb-2 ml-1'>
               Student Id
            </h1>
         </label>

         <div className='flex '>
            {/* Student_id */}
            <input
               onInput={e => setStudent_Id(e.target.value)}
               className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 placeholder:text-[.9vw] max-[599px]:placeholder:text-[2.9vw] outline-none w-[88%]'
               type='text'
               name='ijoi'
               placeholder='Student Id'
               id='Student_Id'
            />

            <button
               className='bg-green-600 ml-[2vw] p-[0.7vw] text-white rounded-md font-medium'
               onClick={() => Handle_Search()}
            >
               Search
            </button>
         </div>
      </div>
   );
};

export default Search;
