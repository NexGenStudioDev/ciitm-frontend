import React from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';
import FormTemplate from '../../components/Templates/Admin/form/FormTemplate';
import EarningData_Table from '../../components/Organisms/Admin/EarningData_Table';
import EarningData from '../../components/Organisms/Admin/EarningData';

const studentOptions = [
   'Bachelor of Computer Applications (BCA)',
   'Master of Computer Applications (MCA)',
   'Bachelor of Commerce (B.Com)',
   'Bachelor of Business Administration (BBA)',
];

const semesterOptions = [1, 2, 3, 4, 5, 6];
const YearOptions = [
   2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
];

let arr = [
   {
      text: 'S.no',
      style: 'w-[5%] text-center align-middle bg-[#090909] border-[#322F2F] text-white text-sm md:text-md rounded-tl-2xl',
   },
   {
      text: 'Date',
      style: 'w-[15%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Student Name',
      style: 'w-[25%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Type',
      style: 'w-[15%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Amount',
      style: 'w-[10%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Status',
      style: 'w-[10%] h-[7vh] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Bill',
      style: 'w-[10%] text-center bg-[#090909] text-white text-sm md:text-md rounded-tr-2xl',
   },
];

const earnings = [
   {
      date: '2025-08-01',
      studentName: 'Abhishek Kumar',
      type: 'Admission',
      amount: 10000,
      status: 'Completed',
      billId: 'bill12345',
   },
   {
      date: '2025-08-02',
      studentName: 'John Doe',
      type: 'Tuition',
      amount: 15000,
      status: 'Pending',
      billId: 'bill12346',
   },
];

const Earning = () => {
   const [SelectedCourse, setSelectedCourse] = React.useState('');
   const [SelectedSemester, setSelectedSemester] = React.useState('');
   const [SelectedYear, setSelectedYear] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(true);
   const [data, setData] = React.useState(null);
   const [isError, setIsError] = React.useState(true);
   const [error, setError] = React.useState(null);

   return (
      <AdminTemplate pageName='Earnings'>
         <div className='findStudent_Container px-[2vw] h-[10vh] min-[900px]:h-[10vh] w-[93%] flex items-center justify-between gap-4 bg-[#1C1C1C] rounded-lg my-[4vh]'>
            <Dropdown_Primary
               options={studentOptions}
               backgroundColor='#1C1C1C'
               textColor='#FFFFFF'
               height='70%'
               width='40%'
               optionSelectedData={data => setSelectedCourse(data)}
               value='Select Course'
               border='2px solid #2C2C2C'
            />

            <Dropdown_Primary
               options={semesterOptions}
               backgroundColor='#1C1C1C'
               textColor='#FFFFFF'
               optionSelectedData={data => setSelectedSemester(data)}
               height='70%'
               width='40%'
               value='Select Semester'
               border='2px solid #2C2C2C'
            />

            <Dropdown_Primary
               options={YearOptions}
               backgroundColor='#1C1C1C'
               textColor='#FFFFFF'
               optionSelectedData={data => setSelectedYear(data)}
               height='70%'
               width='40%'
               value='Select Year'
               border='2px solid #2C2C2C'
            />

            <button
               className='p-[2vh] bg-gray-500 text-white rounded-md'
               //   onClick={e => Handle_Student_Search(e)}
            >
               {isLoading ? 'Searching...' : 'Search'}
            </button>
         </div>

         <FormTemplate PageName={'Earnings'} Navigator={false}>
            <EarningData_Table arr={arr} />

            <EarningData earnings={earnings} />
         </FormTemplate>
      </AdminTemplate>
   );
};

export default Earning;
