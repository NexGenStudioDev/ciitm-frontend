import React, { memo, useEffect, useState } from 'react';
import { useRazorpay } from 'react-razorpay';
import logo from '../../../assets/images/ciitmLogo.png';
import axios from 'axios';
import Input from './Input';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Payment = () => {
   let student = useSelector(state => state.Payment.Payment_Info);
   const [Reload, setReload] = useState(true);

   const [Amount, setAmount] = useState(null);
   const [Order_Id, setOrder_Id] = useState('');

   useEffect(() => {
      if (!student) {
         setReload(false);
      }

      setReload(true);
   }, [student]);

   // let Rayzor_Pay_id = import.meta.env.VITE_RAZORPAY_KEY_ID;

   // if (!Rayzor_Pay_id) {
   //    alert('Razorpay Key ID is not configured');
   //    return;
   // }

   // const { error, isLoading, Razorpay } = useRazorpay();

   // if (isLoading) {
     
   //    return;
   // }

   // if (error) {
   //    alert('Error loading Razorpay');
   //    return;
   // }

   let Handle_Input = async e => {
      try {
         const amount = e.target.value;
         setAmount(amount);
      } catch (error) {
         console.log('error:', error);
      }
   };

   const handlePayment = async () => {
      Swal.fire({
         title: 'Under Development',
         icon: 'warning',
         text: 'Payment Feature is under development',
         allowOutsideClick: false,
      })
      // try {
      //    const response = await axios.post('/api/create/payment', {
      //       amount: Number(Amount),
      //       currency: 'INR',
      //       receipt: 'order_rcptid_11',
      //       payment_capture: 1,
      //    });

      //    setOrder_Id(response.data.id);

      //    console.log('student', student);

      //    const options = {
      //       key: Rayzor_Pay_id,
      //       amount: Number(Amount) * 100,
      //       currency: 'INR',
      //       name: 'CIITM DHANBAD',
      //       description: 'Pay for your Future',
      //       image: logo,
      //       order_id: Order_Id,
      //       handler: async response => {
      //          console.log('res front', response);

      //          try {
      //             const res = await axios.post('/api/pay/verify', {
      //                Unique_id: student.Student_id,
      //                course_Fee: student.course.coursePrice,
      //                payment_Date: new Date().toISOString(),
      //                payment_id: response.razorpay_payment_id,
      //             });

      //             console.log('res', res.data);
      //          } catch (error) {
      //             console.error(error);
      //             alert(
      //                'An error occurred while verifying your payment',
      //             );
      //          }
      //       },
      //       prefill: {
      //          name: 'dsfs',
      //          email: student.student.email[0],
      //          contact: student.student.contactNumber,
      //          Student_id: student.Student_id,
      //       },
      //       theme: {
      //          color: 'black',
      //       },
      //    };

      //    const razorpayInstance = new Razorpay(options);
      //    razorpayInstance.open();
      // } catch (error) {
      //    console.error(error);
      //    alert('An error occurred while processing your payment');
      // }
   };
   return (
      <div className='bg-[#FAFAFA] border-x-[0.62px] border-b-[0.62px] border-[#D7D7D79E] p-8'>
         {Reload && (
            <>
               <input
                  className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 placeholder:text-[.9vw] max-[599px]:placeholder:text-[2.9vw] outline-none'
                  onInput={e => Handle_Input(e)}
                  type='text'
                  name='amount'
                  placeholder='Enter Amount'
                  id='amount'
               />

               <button
                  className='bg-green-600 ml-[2vw] p-[0.7vw] text-white rounded-md font-medium'
                  onClick={() => handlePayment()}
               >
                  Pay Your Fee
               </button>
            </>
         )}
      </div>
   );
};

export default Payment;
