import React from 'react';
import TableRow_Heading from '../../Molecules/table/TableRow_Heading';

let TableHeading_Data = [
   {
      text: 'S.no',
      style: 'min-w-[50px] text-center bg-[#090909] border-[#322F2F] text-white text-xs sm:text-sm md:text-base py-2',
   },
   {
      text: 'Name',
      style: 'min-w-[150px] bg-[#090909] text-white text-center text-xs sm:text-sm md:text-base py-2',
   },
   {
      text: 'Email',
      style: 'min-w-[200px] bg-[#090909] text-white text-center text-xs sm:text-sm md:text-base py-2',
   },
   {
      text: 'Mobile Number',
      style: 'min-w-[140px] bg-[#090909] text-white text-center text-xs sm:text-sm md:text-base py-2 hidden sm:table-cell',
   },
   {
      text: 'Actions',
      style: 'min-w-[100px] bg-[#090909] text-white text-center text-xs sm:text-sm md:text-base py-2',
   },
];

const AdminContactTable_Title = () => {
   return <TableRow_Heading TableHeadingArray={TableHeading_Data} />;
};

export default AdminContactTable_Title;
