import React from 'react';
import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';
import { Link } from 'react-router-dom';

const EarningData = ({ earnings }) => {
   return (
      <>
         {earnings.map((earning, index) => (
            <TableRow
               key={index}
               Tailwind_utility_Class='w-full h-[7vh] text-white'
            >
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {index + 1}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {new Date(earning.date).toLocaleDateString()}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {earning.studentName}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {earning.type}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  ₹ {earning.amount}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  {earning.status}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                  <button className='bg-[#322F2F] text-white px-4 py-2 max-[553px]:px-2 max-[553px]:py-1 rounded-md'>
                     <Link
                        to={`/admin/Student/bill/${earning.billId}`}
                     >
                        🧾 View Bill
                     </Link>
                  </button>
               </TableData>
            </TableRow>
         ))}
      </>
   );
};

export default EarningData;
