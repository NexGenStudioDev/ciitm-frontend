import React from 'react';
import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';
import Link_btn from '../../Atoms/Button/Link_btn';

const StudentTableData = ({ students = [] }) => {
   return (
      <div className='overflow-x-auto'>
         <TableRow Tailwind_utility_Class='w-full  h-[7vh]  text-white flex items-center justify-between'>
            <TableData Tailwind_utility_Class='flex item-center justify-center w-full h-full text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
               Ciitm/Bca/48759
            </TableData>

            <TableData Tailwind_utility_Class='flex item-center justify-center w-full h-full text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
               Abhishek Kumar
            </TableData>

            <TableData Tailwind_utility_Class='flex item-center justify-center w-full h-full text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
               +91 6123456789
            </TableData>

            <TableData Tailwind_utility_Class='text-center w-full h-full overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
               <Link_btn
                  link={`/admin/view/student/${'CIITM_BCA_497890'}`}
                  className='flex items-center justify-center w-full h-full text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200'
                  buttonText='View'
               />
            </TableData>
         </TableRow>
      </div>
   );
};

export default StudentTableData;
