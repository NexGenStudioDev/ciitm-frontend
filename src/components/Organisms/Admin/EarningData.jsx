import React from 'react';
import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';
import { Link } from 'react-router-dom';

const EarningData = ({ earnings }) => {
   return (
      console.log('Earnings:', earnings),
      <div className='w-full h-[80vh] flex flex-col rounded-br-lg'>
         {earnings.map((earning, index) => (
           <div className='w-screen min-[1347px]:w-[69vw]' key={earning._id}>
             
             <TableRow
               key={index}
               Tailwind_utility_Class='w-full text-white'
            >

               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] w-[9%]  max-[1347px]:hidden max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {index + 1}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] w-[9%] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {new Date(earning.paymentDate).toLocaleDateString()}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] w-[14%]  max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {earning.studentName}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] w-[11%] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {earning.paymentType}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] w-[9%] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  ₹ {earning?.amount}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw]  w-[8%] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {earning?.status}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F]  w-[8%] max-[553px]:text-[2.7vw] max-[900px]:text-[2vw] md:text-md'>
                  <button className='bg-[#322F2F] text-white px-4 py-1 max-[553px]:px-2 max-[553px]:py-1 rounded-md'>
                     <Link
                        to={`/admin/Student/bill/${earning.billId}`}
                     >
                        🧾 View Bill
                     </Link>
                  </button>
               </TableData>
            </TableRow>
           </div>
         ))}
      </div>
   );
};

export default EarningData;
