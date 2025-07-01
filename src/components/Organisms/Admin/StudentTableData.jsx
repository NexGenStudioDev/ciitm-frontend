import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';
import Link_btn from '../../Atoms/Button/Link_btn';
import PropTypes from 'prop-types';

const StudentTableData = ({ students = [] }) => {
   return (
      <div className='overflow-x-auto'>
         {students.length > 0 ? (
            students.map((studentData, index) => {
               const { student, uniqueId } = studentData;
               const fullName =
                  `${student.firstName} ${student.middleName || ''} ${student.lastName}`.trim();

               return (
                  <TableRow
                     key={studentData._id || index}
                     Tailwind_utility_Class='w-full h-[7vh] text-white flex items-center justify-between'
                  >
                     {/* S.No */}
                     <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                        {index + 1}
                     </TableData>

                     {/* Name */}
                     <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                        {fullName}
                     </TableData>

                     {/* Student ID */}
                     <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                        {uniqueId}
                     </TableData>

                     {/* Mobile Number */}
                     <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                        {student.contactNumber}
                     </TableData>

                     {/* Action Button */}
                     <TableData Tailwind_utility_Class='text-center overflow-hidden border-r-2 border-t-2 border-b-2 border-[#322F2F] max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md'>
                        <Link_btn
                           link={`/admin/view/student/${uniqueId}`}
                           className='flex items-center justify-center w-full h-full text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200'
                           buttonText='View'
                        />
                     </TableData>
                  </TableRow>
               );
            })
         ) : (
            <TableRow Tailwind_utility_Class='w-full h-[7vh] text-white flex items-center justify-center'>
               <TableData Tailwind_utility_Class='w-full h-full text-center text-gray-500 border-2 border-[#322F2F]'>
                  No students found
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
