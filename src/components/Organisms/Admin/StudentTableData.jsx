import React from 'react'; 
import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';

const StudentTableData = ({ students = [] }) => {
  return (
    <div className="overflow-x-auto">
     <TableRow Tailwind_utility_Class="w-full  h-[7vh]  text-white flex items-center justify-between">
        <TableData Tailwind_utility_Class="flex item-center justify-center w-full h-full text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md">
            1
        </TableData>

          <TableData Tailwind_utility_Class="flex item-center justify-center w-full h-full text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md">
            Abhishek Kumar
        </TableData>

        <TableData Tailwind_utility_Class="flex item-center justify-center w-full h-full text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md">
+91 6123456789
        </TableData>

          <TableData Tailwind_utility_Class="text-center w-full h-full overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md">
            <button className="bg-blue-500 text-white px-2 py-1 rounded">View Student</button>
          
        </TableData>
     </TableRow>
     
    </div>
  );
}

export default StudentTableData;