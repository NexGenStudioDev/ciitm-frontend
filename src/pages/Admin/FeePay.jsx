import React, { useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import Input_Primary from '../../components/Atoms/Input/Input_Primary';

const fallbackImage = 'https://via.placeholder.com/150';

const FeePay = () => {
   const [studentId, setStudentId] = useState('');
   const [studentData, setStudentData] = useState(null);
   const [amount, setAmount] = useState('');
   const [error, setError] = useState('');

   // Dummy fetch function, replace with real API/socket call
   const fetchStudentData = () => {
      // // Simulate fetching data
      // if (studentId.trim() === "") {
      //   setError("Please enter a Student ID.");
      //   setStudentData(null);
      //   return;
      // }
      // setError('');
      // // Replace this with your real fetch logic
      setStudentData({
         profileImage: fallbackImage,
         name: 'Abhishek Kumar',
         email: 'abhishek.nexgen.dev@gmail.com',
         semester: '1',
         totalCourseFee: 150000,
         totalAmountPaid: 50000,
         totalAmountDue: 100000,
      });
   };

   const handlePay = () => {
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
         setError('Please enter a valid amount.');
         return;
      }
      setError('');
      alert(`Paid ₹${amount} for ${studentData?.name}`);
      setAmount('');
   };

   return (
      <AdminTemplate pageName='Fee Pay'>
         <div className='findStudent_Container  w-[90%] px-[2vw] h-[10vh] flex items-center justify-stretch gap-4 bg-[#1C1C1C] rounded-lg mb-[3vh]'>
            <Input_Primary
               name='studentId'
               type='text'
               value={studentId}
               onChange={e => setStudentId(e.target.value)}
               placeholder='Student ID'
               className='w-[75%] h-[70%] bg-[#1C1C1C] text-white placeholder-white rounded-md p-2 focus:outline-none border-2 border-solid border-[#2C2C2C]'
            />
            <button
               className='w-[20%] h-[70%] bg-[#2C2C2C] text-white rounded-md p-2 hover:bg-[#3C3C3C] transition-colors duration-300'
               onClick={fetchStudentData}
            >
               Search
            </button>
         </div>

         {error && (
            <div className='w-full flex justify-center text-red-500 font-semibold mb-4'>
               {error}
            </div>
         )}

         <FormTemplate_Secondary>
            {studentData && (
               <div className='w-full  flex flex-col items-center gap-6'>
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
                  <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-6'>
                     <Input_Primary
                        type='number'
                        min='1'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder='Enter Amount'
                        className='w-full md:w-[40%] bg-[#2B2C2B] text-white placeholder-white rounded-md p-2'
                     />
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
