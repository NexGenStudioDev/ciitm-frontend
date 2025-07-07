import React, { useEffect, useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import Input_Primary from '../../components/Atoms/Input/Input_Primary';
import ValidateUniqueIdInput from '../../components/Atoms/Input/ValidateUniqueIdInput';
import Dropdown from '../../components/Templates/admission/DropDown';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';
import axios from 'axios';
import Swal from 'sweetalert2';
import { use } from 'react';

const fallbackImage = 'https://via.placeholder.com/150';

const FeePay = () => {
   const [studentId, setStudentId] = useState('');
   const [isValidId, setIsValidId] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [paymentMethod, setPaymentMethod] = useState('');
   const [studentData, setStudentData] = useState(null);
   const [amount, setAmount] = useState('');
   const [error, setError] = useState('');

   // Dummy fetch function, replace with real API/socket call
   const fetchStudentData = async () => {
      try {
         let res = await axios.get(
            `/api/v1/Student/FeeInfo?uniqueId=${studentId}`,
         );

         let data = res.data.data.Student_Info;
         console.log('Fetched Student Data:', data);
         if (data) {
            console.log('Student Data:', data.student);
            setStudentData({
               profileImage: data.student.avtar || fallbackImage,
               name:
                  `${data.student.firstName} ${data.student.middleName}  ${data.student.lastName}` ||
                  'Unknown data.student',
               email: data.student.email[0] || 'No Email Provided',
               semester: data.semester || 'N/A',
               totalCourseFee: data.fee.course_Fee || 0,
               totalAmountPaid: data.fee.amount_paid || 0,
               totalAmountDue: data.fee.amount_due || 0,
            });
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
               error.response?.data?.message ||
               'Something went wrong!',
         });
      }
   };

   console.log('Student ID:', studentId);
   console.log('Is Valid ID:', isValidId);

   useEffect(() => {
      if (studentId && isValidId) {
         fetchStudentData();
      } else {
         setStudentData(null);
         setAmount('');
         setError('');
      }
   }, [studentId, isValidId , isLoading]);

   console.log('Pay' , paymentMethod)
   const handlePay = async() => {
     try {
      let res = await axios.patch('/api//v1/Student/FeeUpdate', {
         uniqueId: studentId,
         paymentMethod: paymentMethod,
         Paid_amount: amount, 
      })



      if (res.data.success) {
         Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: res.data.message,
   
         })
         setIsLoading(true);
         setTimeout(() => {
            setIsLoading(false);
         }, 2000);
      }


     } catch (error) {
      Swal.fire({
         icon: 'error',
         title: 'Payment Error',
         text: error.response?.data?.message || 'Payment failed. Please try again.',
   
      })
     }
   };

   return (
      <AdminTemplate pageName='Fee Pay'>
         <div className='findStudent_Container  w-[90%] px-[2vw] h-[10vh] flex items-center justify-stretch gap-4 bg-[#1C1C1C] rounded-lg mb-[3vh]'>
            <ValidateUniqueIdInput
               disabled={false}
               getStudentId={data => {
                  setStudentId(data);
               }}
               getValidationStatus={data => {
                  setIsValidId(data);
               }}
               className='w-[75%] h-[70%] bg-[#1C1C1C] text-white placeholder-white rounded-md p-2 focus:outline-none border-2 border-solid border-[#2C2C2C]'
               placeholder='Enter Student ID'
            />
         </div>

         {error && (
            <div className='w-full flex justify-center text-red-500 font-semibold mb-4'>
               {error}
            </div>
         )}

         <FormTemplate_Secondary>
            {studentData && (
               <div className='w-full h-screen flex flex-col items-center gap-6'>
                  {/* Profile Picture */}
                  <img
                     src={studentData.profileImage}
                     alt='Profile'
                     className='w-32 mt-[6vh] h-32 object-cover rounded-full border-4 border-white shadow-lg mb-2'
                     onError={e => (e.target.src = fallbackImage)}
                  />
                  <div className='StudentFee_Info_Container w-full flex flex-col items-center justify-center gap-4'>
                     {/* Student Info */}
                     <div className='w-full flex flex-col items-center gap-2'>
                        <div className='text-white text-xl font-bold'>
                           {studentData.name}
                        </div>
                        <div className='text-[#C7C0C0]'>
                           {studentData.email}
                        </div>
                        <div className='text-[#C7C0C0]'>
                           Semester:{' '}
                           <span className='font-semibold'>
                              {studentData.semester}
                           </span>
                        </div>
                     </div>
                     {/* Fee Info */}
                     <div className='w-full flex flex-col justify-center px-[2.5vw] md:flex-row  items-center gap-[3vw] mt-4'>
                        <div className='flex flex-col items-center bg-[#2B2C2B] rounded-lg p-4 w-full md:w-fit'>
                           <span className='text-[#C7C0C0]'>
                              Total Course Fee
                           </span>
                           <span className='text-white font-semibold text-lg'>
                              ₹ {studentData.totalCourseFee}
                           </span>
                        </div>
                        <div className='flex flex-col items-center bg-[#2B2C2B] rounded-lg p-4 w-full md:w-fit'>
                           <span className='text-[#C7C0C0]'>
                              Total Amount Paid
                           </span>
                           <span className='text-white font-semibold text-lg'>
                              ₹ {studentData.totalAmountPaid}
                           </span>
                        </div>
                        <div className='flex flex-col items-center bg-[#2B2C2B] rounded-lg p-4 w-full md:w-fit'>
                           <span className='text-[#C7C0C0]'>
                              Total Amount Due
                           </span>
                           <span className='text-white font-semibold text-lg'>
                              ₹ {studentData.totalAmountDue}
                           </span>
                        </div>
                     </div>
                  </div>
                  {/* Pay Section */}

                  <div className='w-full flex flex-col  items-center justify-center gap-4 mt-6'>
                     <div className='w-full  flex flex-col gap-[2rem] items-center justify-center'>
                        <Dropdown_Primary
                           width='85%'
                           height='5vh'
                           optionSelectedData={data => setPaymentMethod(data)}
                           options={[
                              'Cash',
                              'Cheque',
                              'Online Transfer',
                              'UPI',
                              'Card Payment',
                           ]}

                      
                          
                           backgroundColor='#2B2C2B'
                           value='Select Payment Method'
                           border='2px solid #2C2C2C'
                           textColor='#FFFFFF'
                        />

                        <Input_Primary
                           type='number'
                           min='1'
                           value={amount}
                           onInput={e => setAmount(e.target.value)}
                           readOnly={false}
                           placeholder='Enter Amount'
                           className='w-[85%] h-[5vh] bg-[#2B2C2B] text-white placeholder-white rounded-md p-2 text-[2.5vw] min-[600px]:text-[1.5vw]'
                        />
                     </div>

                     <button
                        className='
                  w-full md:w-[20%]
                  px-[2vw] py-[1.2vh]
                  bg-gradient-to-r from-green-500 to-green-700
                  text-white font-semibold rounded-lg shadow-md
                  hover:from-green-600 hover:to-green-800
                  hover:scale-105 active:scale-95 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                  text-[1.1rem] md:text-[1.15vw]
                '
                        onClick={handlePay}
                     >
                        Pay
                     </button>
                  </div>
               </div>
            )}
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default FeePay;
