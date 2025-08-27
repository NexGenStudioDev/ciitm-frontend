import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { load } from '@cashfreepayments/cashfree-js';

const Payment = () => {
   const [amount, setAmount] = useState('');
   const [loading, setLoading] = useState(false);
   const [paymentType, setPaymentType] = useState('');

   const payment = useSelector(state => state.Payment.Payment_Info);

   const handleInput = e => setAmount(e.target.value);
   const handleTypeChange = e => setPaymentType(e.target.value);

   const handlePayment = async () => {
      const student = payment?.student;

      console.log('studnet', student)

      if (!amount || Number(amount) <= 0) {
         Swal.fire('Invalid Amount', 'Please enter a valid payment amount.', 'warning');
         return;
      }

      if (!student) {
         Swal.fire('Error', 'Student info not available.', 'error');
         return;
      }

      if (!paymentType) {
         Swal.fire('Error', 'Please select a Payment Type.', 'warning');
         return;
      }

      try {
         setLoading(true);

         const payload = {
            order_amount: Number(amount),
            customer_id: payment._id,
            customer_name: `${student.firstName} ${student.lastName}`,
            customer_phone: student.contactNumber,
            customer_email: student.email[0],
            uniqueId: payment.uniqueId,
            studentId: payment.studentId,
            PaymentType: paymentType,
         };

         const res = await axios.post('/api/v1/Student/createOrder', payload);

         let cashfree = await load({ mode: "production" });

         const payment_session_id = res?.data?.data?.payment_session_id;
         const order_id = res?.data?.data?.order_id;

         if (!payment_session_id) {
            throw new Error('Payment session ID not received.');
         }

         cashfree.checkout({
            paymentSessionId: payment_session_id,
            redirectTarget: '_self',
            oneClickCheckout: true,
            returnUrl: `${import.meta.VITE_BACKEND_URL}/success?order_id=${order_id}`,
            
            style: {
               theme: 'dark', // or 'dark'
               buttonColor: '#28a745',
             }
         });

        

      } catch (error) {
         console.error('Payment error:', error);
         Swal.fire(
            'Error',
            error?.response?.data?.message ||
               error.message ||
               'Failed to create payment order',
            'error',
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className='bg-[#FAFAFA] border-x-[0.62px] border-b-[0.62px] border-[#D7D7D79E] p-8 flex gap-[2vw]'>
         <select
            className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 mb-2 outline-none w-[35%]'
            value={paymentType}
            onChange={handleTypeChange}
         >
            <option value="">Select Payment Type</option>
            <option value="Admission Fee">Admission Fee</option>
            <option value="Farewell Fee">Farewell Fee</option>
            <option value="Teacher Day Fee">Teacher Day Fee</option>
            <option value="Exam Fee">Exam Fee</option>
            <option value="Semester Fee">Semester Fee</option>
            <option value="Other">Other</option>
         </select>
         <input
            className='bg-white border-[1px] border-[#D7D7D79E] rounded-lg px-4 py-3 mr-4 mb-2 outline-none'
            type='number'
            value={amount}
            onChange={handleInput}
            placeholder='Enter Amount'
         />
         <button
            className='bg-green-600 p-[0.7vw] text-white rounded-md font-medium'
            onClick={handlePayment}
            disabled={loading}
         >
            {loading ? 'Processing...' : 'Pay Your Fee'}
         </button>
      </div>
   );
};

export default Payment;