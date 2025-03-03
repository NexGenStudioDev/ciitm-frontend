import React from 'react';
import TitleContainer from '../components/paymenComponents/TitleContainer';
import Summary from '../components/paymenComponents/Summary';

const PaymentPage = () => {
   const details = [
      {
         Name: 'Student Id',
         Placeholder: 'Student Id',
         Label: 'Student Id:',
      },
      { Name: 'Email', Placeholder: 'Your Gmail', Label: 'Email:' },
      { Name: 'Phone', Placeholder: 'Your Number', Label: 'Number:' },
      {
         Name: 'FatherName',
         Placeholder: 'Your Father Name',
         Label: 'Father Name:',
      },
   ];

   const fees = [
      { id: 'fee', name: 'Admission Fee', amount: '20$ Per Year' },
      { id: 'fee', name: 'Transport Fee', amount: '20$ Per Year' },
      { id: 'fee', name: 'Sports Fee', amount: '20$ Per Year' },
      { id: 'fee', name: 'Hostel Fee', amount: '20$ Per Year' },
   ];
   const totalAmount = fees.reduce(
      (sum, fee) => sum + parseInt(fee.amount),
      0,
   );
   const feesList = [
      ...fees,
      {
         id: 'total',
         name: 'Total',
         amount: `${totalAmount}$ Per Year`,
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
                  details={details}
               />
               <TitleContainer
                  title={'Total Amount'}
                  amount={true}
                  total={80}
               />
               <TitleContainer
                  title={'Bank Account'}
                  bank={true}
                  width={true}
               />
            </div>
            <Summary
               heading={'Masters of Communication Application'}
               duration={'4-Years'}
               feesList={feesList}
            />
         </div>
      </section>
   );
};

export default PaymentPage;
