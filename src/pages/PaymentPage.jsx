import React, { memo, useEffect, useState } from 'react';
import TitleContainer from '../components/Templates/payment/TitleContainer';
import Summary from '../components/Templates/payment/Summary';
import { useSelector } from 'react-redux';

const PaymentPage = memo(() => {
   const [Student, setStudent] = useState(null);
   const [Error, setError] = useState(false);
   const [Course, setCourse] = useState(null);
   const [Payment, setPayment] = useState(null);
   let payment = useSelector(state => state.Payment.Payment_Info);

   useEffect(() => {
      if (!payment) {
         setError(true);
      } else {
         setStudent(payment.student);
         setCourse(payment.course);
         setPayment(payment.fee);
         console.log('Payment:', payment.fee);
      }
   }, [payment]);

   const details = [
      {
         Name: 'Name',
         Placeholder: 'Your Name',
         Label: 'Name:',
         Value: Student?.firstName,
      },
      {
         Name: 'Email',
         Placeholder: 'Your Gmail',
         Label: 'Email:',
         Value: Student?.email[0],
      },

      {
         Name: 'Phone',
         Placeholder: 'Your Number',
         Label: 'Number:',
         Value: Student?.contactNumber,
      },

      {
         Name: 'FatherName',
         Placeholder: 'Your Father Name',
         Label: 'Father Name:',
         Value: Student?.fatherName,
      },

      {
         Name: 'MotherName',
         Placeholder: 'Your Mother Name',
         Label: 'Mother Name:',
         Value: Student?.motherName,
      },
   ];

   const Paymeny_Info = [
      {
         Name: 'Total Course Fee',
         Placeholder: 'Course Fee',
         Label: 'Total Course Fee:',
         Value:
            Payment && Payment.course_Fee
               ? '₹ ' + Payment.course_Fee
               : '₹ 0',
      },
      {
         Name: 'Total Amount Paid',
         Placeholder: 'Amount Paid',
         Label: 'Total Amount Paid:',
         Value:
            Payment && Payment.amount_paid
               ? '₹ ' + Payment.amount_paid
               : '₹ 0',
      },

      {
         Name: 'Total Amount Due',
         Placeholder: 'Amount Due',
         Label: 'Total Amount Due:',
         Value:
            Payment && Payment.amount_due
               ? '₹ ' + Payment.amount_due
               : '₹ 0',
      },
   ];

   const Course_Info = [
      {
         id: 'Course_Name',
         name: 'Course Name',
         amount: '20$ Per Year',
      },
      {
         id: 'course_Code',
         name: 'Course Code',
         amount: '20$ Per Year',
      },
      {
         id: 'course_Duration',
         name: 'Course Duration',
         amount: '20$ Per Year',
      },
      {
         id: 'course_Price',
         name: 'Course Price',
         amount: '20$ Per Year',
      },
   ];

   const fees = [
      { id: 'fee', name: 'Admission Fee', amount: ' 25,000' },
      { id: 'fee', name: '1 Year', amount: ' 50,000' },
      { id: 'fee', name: '2 Year', amount: ' 50,000' },
      { id: 'fee', name: '3 Year', amount: ' 50,000' },
      { id: 'fee', name: '4 Year', amount: ' 50,000' },
   ];
   const totalAmount = fees.reduce((sum, fee) => {
      const amount = parseFloat(fee.amount.replace(/[^0-9.-]+/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
   }, 0);

   console.log('Total Amount', totalAmount);

   const feesList = [
      ...fees,
      {
         id: 'total',
         name: 'Total',
         amount: `${Number(Math.round(totalAmount))} INR`,
      },
   ];

   return (
      <section className='w-full min-h-screen bg-[#F8F9FD] px-10 max-[599px]:px-4 py-20 flex items-center max-[599px]:justify-center gap-6 flex-col'>
         <div className='w-full px-4 py-6 bg-white rounded-2xl'>
            <h1 className='heading text-[1.65vw] max-[599px]:text-[3.65vw]'>
               Secure Payment Gateway
            </h1>
         </div>
         <div className='Payment_Container w-full h-full flex justify-between max-[599px]:flex-col gap-4 rounded-2xl'>
            <div className='payment-left-container w-[75%] max-[599px]:w-full flex flex-col gap-8 bg-white px-6 max-[599px]:px-4 py-8 max-[599px]:py-4 rounded-2xl border-[#D7D7D79E]'>
               <TitleContainer
                  title={'Student Information'}
                  form={true}
                  pay={true}
                  details={details}
               />
               <TitleContainer
                  title={'Payment Information'}
                  form={true}
                  details={Paymeny_Info}
                  amount={true}
               />
               <TitleContainer
                  title={'Bank Account'}
                  bank={true}
                  width={true}
               />
            </div>

            <Summary
               heading={Course?.courseName || 'Course Name'}
               duration={Course?.courseDuration || 'Duration'}
               description={
                  Course?.courseDescription || 'Description'
               }
               feesList={feesList}
            />
         </div>
      </section>
   );
});

export default PaymentPage;
