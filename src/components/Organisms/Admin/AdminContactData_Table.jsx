import React from 'react';
import TableRow_Data from '../../Molecules/table/TableRow_Data';
import Loader from 'react-spinners/ScaleLoader';
import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';
import { Link } from 'react-router-dom';

const override = {
   display: 'block',
   position: 'absolute',
   top: '40%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   margin: '0 auto',
};

const AdminContactData_Table = ({ Data = [] }) => {
   if (Data.length <= 0) {
      return (
         <Loader
            color='white'
            loading={true}
            cssOverride={override}
            size={30}
            aria-label='Loading Spinner'
            data-testid='loader'
         />
      );
   }

   return (
      <>
         {Data.map((item, index) => (
            <TableRow
               key={index}
               Tailwind_utility_Class='w-full h-[7vh] text-white'
               className=''
            >
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] text-xs sm:text-sm md:text-base'>
                  {index + 1}
               </TableData>
               <TableData Tailwind_utility_Class='text-center text-sm overflow-hidden border-r-2 border-t-2 border-b-2 max-[553px] border-[#322F2F] sm:text-sm md:text-base'>
                  {item.cName}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] sm:text-sm md:text-base'>
                  {item.cEmail}
               </TableData>
               <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] hidden sm:table-cell'>
                  {item.cNumber}
               </TableData>
               <TableData Tailwind_utility_Class='text-center border-t-2 border-b-2 text-sm sm:text-sm md:text-base'>
                  <Link to={`/admin/contact/${item._id}`}>
                     <button className='bg-[#322F2F] text-white px-3 py-1 rounded text-xs sm:text-sm md:text-base'>
                        View
                     </button>
                  </Link>
               </TableData>
            </TableRow>
         ))}
      </>
   );
};

export default AdminContactData_Table;
