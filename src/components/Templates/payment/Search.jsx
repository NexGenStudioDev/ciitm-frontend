import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { setPayment_Info } from '../../../store/PaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ValidateUniqueIdInput from '../../Atoms/Input/ValidateUniqueIdInput';
import { ToastContainer, toast } from 'react-toastify';

const Search = () => {
   const dispatch = useDispatch();
   const [Student_Id, setStudent_Id] = useState(null);
   const [getValidationStatus, setGetValidationStatus] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const payment = useSelector(state => state.Payment.Payment_Info);





   let Handle_Search = async () => {
      try {
       
        


         
         
         
         if(isLoading){
            
      
         const response = await axios.get(
            `/api/v1/Student/FeeInfoByStudent?uniqueId=${Student_Id}`,
            
         );

  

         if(response.data.success){
          
          
            const data = response.data.data;
           dispatch(setPayment_Info(data));
           
         }
        }
   

        
      } catch (error) {
      
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message,
            showConfirmButton: true,
         });
      }
   };


   useEffect(() => {

       dispatch(setPayment_Info(null));

      if (!payment) {
         setIsLoading(true);
      }
   }, [payment]);





   return (
      <div className='Student_Id_Container w-full bg-[#FAFAFA]  p-4'>
         <label htmlFor='ujnju'>
            <h1 className='text-[1vw] max-[599px]:text-[3vw] font-medium mb-2 ml-1'>
               Student Id
            </h1>
         </label>

         <div className='flex '>

      
            <ValidateUniqueIdInput 
            getValidationStatus={(status) => setGetValidationStatus(status)}
             getStudentId={(id => setStudent_Id(id))}
             className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 placeholder:text-[.9vw] w-full'
           
            


            />



            {/* bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 placeholder:text-[.9vw] */}

            <button
               className='bg-green-600 ml-[2vw] p-[0.7vw] text-white rounded-md font-medium'
               // disabled={getValidationStatus}
               onClick={Handle_Search}
            >
               Search
            </button>
         </div>
      </div>
   );
};

export default Search;
