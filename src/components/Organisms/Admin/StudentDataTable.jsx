import React from 'react';
import TableRow from '../../Atoms/Table/Tr/TableRow';
import TableData from '../../Atoms/Table/Td/TableData';
import TableHeading from '../../Atoms/Table/Th/TableHeading';
import StudentTableHeading from './StudentTableHeading';
import StudentTableData from './StudentTableData';
import PropTypes from 'prop-types';

let TableHeading_Data = [
   {
      text: 'S.no',
      style: 'max-[348px]:text-[3.5vw] w-[10%] text-center align-middle bg-[#090909] border-[#322F2F] text-white max-[553px]:h-[7vh] max-[553px]:text-[2.5vw] max-[775px]:text-[1.8vw] md:text-md rounded-tl-2xl',
   },
   {
      text: 'Name',
      style: 'max-[348px]:text-[3vw] w-[35%]   bg-[#090909] text-white text-center h-[5vh] text-sm p-[0.9vw] max-[348px]:hidden max-[553px]:text-[2.5vw] max-[775px]:text-[1.8vw] md:text-md',
   },
   {
      text: 'Student ID',
      style: 'max-[348px]:text-[3vw] w-[30%]  bg-[#090909]  text-white text-center h-[5vh] text-sm p-[0.9vw] md:text-md max-[553px]:text-[2.5vw] max-[775px]:text-[1.8vw]',
   },
   {
      text: 'Mobile No',
      style: 'max-[348px]:text-[3vw] w-[25%] bg-[#090909] text-white text-center h-[5vh] text-sm p-[0.9vw] md:text-md max-[553px]:text-[2.5vw] max-[775px]:hidden',
   },
   {
      text: 'Actions',
      style: 'max-[348px]:text-[3vw] w-[10%] bg-[#090909] text-white text-center h-[5vh] text-sm p-[0.9vw] max-[553px]:text-[2.5vw] max-[775px]:text-[1.8vw] md:text-md rounded-tr-2xl',
   },
];

const StudentDataTable = ({ students = [] }) => {
   return (
      <div className='overflow-x-auto h-[80vh] w-full'>
         <StudentTableHeading TableHeadingArray={TableHeading_Data} />
         <StudentTableData students={students} />
      </div>
   );
};

StudentDataTable.propTypes = {
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

export default StudentDataTable;
