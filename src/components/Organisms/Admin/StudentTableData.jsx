import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';
import Link_btn from '../../Atoms/Button/Link_btn';
import PropTypes from 'prop-types';

const StudentTableData = ({ students = [] }) => {
   return (
      <div className='overflow-x-auto border border-[#333] rounded-md shadow-sm print:shadow-none print:border-none'>
         {students.length > 0 ? (
            students.map((studentData, index) => {
               const { student, uniqueId } = studentData;
               const fullName =
                  `${student.firstName} ${student.middleName || ''} ${student.lastName}`.trim();

               return (
                  <TableRow
                     key={studentData._id || index}
                     Tailwind_utility_Class='flex w-full min-h-[60px] items-center justify-between bg-[#1C1C1C] hover:bg-[#2A2A2A] transition-all print:bg-white border-b border-gray-700 print:border-black'
                  >
                     {/* S.No */}
                     <TableData Tailwind_utility_Class='w-[10%] text-center font-semibold text-white print:text-black border-r border-gray-600 print:border-black'>
                        {index + 1}
                     </TableData>

                     {/* Name */}
                     <TableData Tailwind_utility_Class='w-[25%] text-center font-medium text-white print:text-black border-r border-gray-600 print:border-black'>
                        {fullName}
                     </TableData>

                     {/* Student ID */}
                     <TableData Tailwind_utility_Class='w-[20%] text-center text-white print:text-black border-r border-gray-600 print:border-black'>
                        {uniqueId}
                     </TableData>

                     {/* Mobile Number */}
                     <TableData Tailwind_utility_Class='w-[20%] text-center text-white print:text-black border-r border-gray-600 print:border-black'>
                        {student.contactNumber}
                     </TableData>

                     {/* Action Button */}
                     <TableData Tailwind_utility_Class='w-[20%] text-center print:border-black'>
                        <Link_btn
                           link={`/admin/view/student/${uniqueId}`}
                           className='inline-block px-4 py-2 text-sm font-semibold text-blue-400 bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-md transition print:bg-white print:text-black print:border print:border-black print:rounded-none'
                           buttonText='View'
                        />
                     </TableData>
                  </TableRow>
               );
            })
         ) : (
            <TableRow Tailwind_utility_Class='flex w-full items-center justify-center bg-[#1C1C1C] print:bg-white border-b border-gray-700 print:border-black'>
               <TableData Tailwind_utility_Class='w-full text-center text-gray-400 print:text-black py-6 border-t border-gray-600 print:border-black'>
                  No students found.
               </TableData>
            </TableRow>
         )}
      </div>
   );
};

StudentTableData.propTypes = {
   students: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string,
         uniqueId: PropTypes.string.isRequired,
         student: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            middleName: PropTypes.string,
            lastName: PropTypes.string.isRequired,
            contactNumber: PropTypes.string.isRequired,
            email: PropTypes.arrayOf(PropTypes.string),
         }).isRequired,
         isAdmitted: PropTypes.bool,
      }),
   ),
};

export default StudentTableData;
