import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';

const PaymentCard = () => {
   const [formData, setFormData] = useState({
      studentId: '',
      fatherName: '',
      email: '',
      totalAmount: '',
   });

   const [errors, setErrors] = useState({});
   const show = useRef(null)

   const validateForm = () => {
      const newErrors = {};
      if (!formData.studentId.trim()) {
         newErrors.studentId = 'Student ID is required';
      }
      if (!formData.fatherName.trim()) {
         newErrors.fatherName = "Father's Name is required";
      }
      if (!formData.email.trim()) {
         newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = 'Invalid email format';
      }
      if (!formData.totalAmount.trim()) {
         newErrors.totalAmount = 'Amount is required';
      } else if (isNaN(formData.totalAmount)) {
         newErrors.totalAmount = 'Amount must be a number';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const fetchStudentData = async studentId => {
      try {
         const response = await fetch(
            `GET /api/find/student/status/${studentId}`,
         );
         if (!response.ok) {
            throw new Error('Student not found');
         }
         const data = await response.json();
         setFormData({
            studentId: data.studentId,
            fatherName: data.fatherName,
            email: data.email,
            totalAmount: data.totalAmount,
         });
         setErrors({});
      } catch (error) {
         setErrors(prev => ({
            ...prev,
            studentId: 'Invalid Student ID',
         }));
         setFormData({
            studentId,
            fatherName: '',
            email: '',
            totalAmount: '',
         });
      }
   };

   const handleChange = e => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      if (name === 'studentId' && value.trim().length > 4) {
         fetchStudentData(value.trim());
      }
   };

   const handleSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
         Swal.fire({
            icon: 'success',
            title: 'Form Submitted',
            text: 'Your payment information has been received',
         });
         console.log(formData);
         setFormData({
            studentId: '',
            fatherName: '',
            email: '',
            totalAmount: '',
         });
         setErrors({});
      } else {
         Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please fix the errors in the form',
         });
      }
   };

   const showCard = () => {
      show.current.classList.toggle("hidden");
   };

   return (
      <>
         <div className='w-[40%] max-[999px]:w-full bg-white rounded-t-2xl overflow-hidden'>
            <div className='head-top w-full p-4 rounded-t-2xl bg-[#E9A3FF1F] border-[#D7D7D79E] border-[0.62px]'>
               <h3 className='heading text-[1.3vw] max-[599px]:text-[3.3vw] flex items-center gap-2'>
                  <span className='inline-block w-2.5 h-2.5 bg-[#C300FF] rounded-full'></span>
                  Student Information
               </h3>
            </div>
            <form
               onSubmit={handleSubmit}
               className='w-full flex flex-col my-8 mb-6 px-8'
            >
               <div>
                  <label className='block mb-1' htmlFor='studentId'>
                     Student ID:
                  </label>
                  <input
                     id='studentId'
                     name='studentId'
                     className={`w-full px-4 py-3 rounded-lg border-[0.62px] outline-none placeholder:text-[1vw] max-[599px]:placeholder:text-[3vw] font-[Poppins] ${
                        errors.studentId
                           ? 'border-red-500'
                           : 'border-[#D7D7D79E]'
                     }`}
                     type='text'
                     placeholder='Enter Student ID'
                     value={formData.studentId}
                     onChange={handleChange}
                  />
                  {errors.studentId && (
                     <p className='text-red-500 text-sm mt-1'>
                        {errors.studentId}
                     </p>
                  )}
               </div>

               <div>
                  <label
                     className='block mb-1 my-4'
                     htmlFor='fatherName'
                  >
                     Father Name:
                  </label>
                  <input
                     id='fatherName'
                     name='fatherName '
                     className={`w-full px-4 py-3 rounded-lg border-[0.62px] outline-none placeholder:text-[1vw] max-[599px]:placeholder:text-[3vw] ${
                        errors.fatherName
                           ? 'border-red-500'
                           : 'border-[#D7D7D79E]'
                     }`}
                     type='text'
                     placeholder="Enter Father's Name"
                     value={formData.fatherName}
                     onChange={handleChange}
                     disabled
                  />
               </div>

               <div>
                  <label className='block mb-1 my-4' htmlFor='email'>
                     Email:
                  </label>
                  <input
                     id='email'
                     name='email'
                     className={`w-full px-4 py-3 rounded-lg border-[0.62px] outline-none placeholder:text-[1vw] max-[599px]:placeholder:text-[3vw] ${
                        errors.email
                           ? 'border-red-500'
                           : 'border-[#D7D7D79E]'
                     }`}
                     type='email'
                     placeholder='Ex. example@gmail.com'
                     value={formData.email}
                     onChange={handleChange}
                     disabled
                  />
               </div>

               <div>
                  <label
                     className='block mb-1 my-4'
                     htmlFor='totalAmount'
                  >
                     Total Amount:
                  </label>
                  <input
                     id='totalAmount'
                     name='totalAmount'
                     className={`w-full px-4 py-3 mb-2 rounded-lg border-[0.62px] outline-none placeholder:text-[1vw] max-[599px]:placeholder:text-[3vw] ${
                        errors.totalAmount
                           ? 'border-red-500'
                           : 'border-[#D7D7D79E]'
                     }`}
                     type='text'
                     placeholder='Enter Amount'
                     value={formData.totalAmount}
                     onChange={handleChange}
                     disabled
                  />
               </div>

               <div
                  style={{
                     backgroundColor: '#3333331A',
                     color: '#333333BD',
                  }}
                  className='w-full cursor-pointer text-center my-2 p-4 text-[1vw] max-[599px]:text-[3vw] rounded-lg outline-none font-bold'
                  onClick={showCard}
               >
                  <p>Review</p>
                  </div>

               <Link
                  to='https://razorpay.me/@MernCodingSchool'
                  target='_blank'
                  style={{
                     backgroundColor: '#333333',
                     color: '#FFF',
                  }}
                  className='w-full text-center my-2 p-4 text-[1vw] max-[599px]:text-[3vw] rounded-lg outline-none font-semibold'
               >
                  <p>Razor Payment</p>
               </Link>
            </form>
         </div>

         <div ref={show} className='Summary-card absolute top-[28%] w-[40%] max-[999px]:w-full bg-white border-[#D7D7D79E] border-[0.62px] rounded-2xl overflow-hidden hidden'>
            <div>
               <h1 className='heading text-[1.3vw] max-[599px]:text-[3.3vw] flex items-center gap-2 px-4 pt-4'>
                  <span className='inline-block w-2.5 h-2.5 bg-[#C300FF] rounded-full'></span>
                  Summary
                  <IoMdClose className="absolute top-5 right-5 cursor-pointer" onClick={showCard}/>
               </h1>
            </div>
            <p className='pl-8 py-2'>Complete your admission fee payment securely using debit/credit card, mobile banking, or online wallets</p>
            <div className='banner w-full flex gap-6 py-4 border-[#D7D7D79E] border-b-[1px] mx-4'>
               <div className="card w-[45%] min-h-[10rem] rounded-2xl bg-[#FFE9E9]"><img src="" alt="" /></div>
               <div className="headings w-[50%]">
                  <h1 className='heading text-[1.4vw] max-[599px]:text-[3.4vw] leading-tight'>Masters of Communication Application</h1>
                  <div className='flex gap-6 my-3.5 text-[1.1vw] max-[599px]:text-[3.1vw] font-medium'><h4>Duration</h4><h4 className='text-[#FF0000] underline'>4-Years</h4></div>
                  <button className='py-1.5 px-6 text-[1vw] max-[599px]:text-[3vw] rounded-lg bg-[#F9F9F9] border-[#D7D7D79E] border-[0.62px]'>Details</button>
               </div>
            </div>
         <div className='flex flex-col gap-5 py-6 mx-6 border-[#D7D7D79E] border-b-[1px] mb-6'>
            <div className="first w-full flex items-center justify-between">
                  <h4 className='font-[Montserrat] font-semibold'>Admission Fee</h4>
                  <h4 className='font-[Poppins] font-light'>20$ per Year</h4>
            </div>
            <div className="second w-full flex items-center justify-between">
                  <h4 className='font-[Montserrat] font-semibold'>Transport Fee</h4>
                  <h4 className='font-[Poppins] font-light'>20$ per Year</h4>
            </div>
            <div className="third w-full flex items-center justify-between">
                  <h4 className='font-[Montserrat] font-semibold'>Sports Fee</h4>
                  <h4 className='font-[Poppins] font-light'>20$ per Year</h4>
            </div>
            <div className="fourth w-full flex items-center justify-between">
                  <h4 className='font-[Montserrat] font-semibold'>Hostel Fee</h4>
                  <h4 className='font-[Poppins] font-light'>20$ per Year</h4>
            </div>
         </div>
         <div className="btm py-5 px-6 bg-[#E9A3FF5E]">
         <div className="first w-full flex items-center justify-between">
                  <h4 className='font-[Montserrat] font-semibold'>Total</h4>
                  <h4 className='font-[Poppins] font-light'>80$ per Year</h4>
            </div>
         </div>
         </div>
      </>
   );
};

export default PaymentCard;
