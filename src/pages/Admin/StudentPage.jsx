import React from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate from '../../components/Templates/Admin/form/FormTemplate';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';
import StudentDataTable from '../../components/Organisms/Admin/StudentDataTable';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { set } from 'react-hook-form';

const studentOptions = [
   'Bachelor of Computer Applications (BCA)',
   'Master of Computer Applications (MCA)',
   'Bachelor of Commerce (B.Com)',
   'Bachelor of Business Administration (BBA)',
];

const semesterOptions = [1, 2, 3, 4, 5, 6];

const StudentPage = () => {
   const [isError, setIsError] = React.useState(false);
   const [ErrorMessage, setErrorMessage] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(false);
   const [studentData, setStudentData] = React.useState([]);
   const [SelectedCourse, setSelectedCourse] = React.useState('');
   const [SelectedSemester, setSelectedSemester] = React.useState('');

   let Handle_Student_Search = async e => {
      try {
         e.preventDefault();
         setIsLoading(true);
         let res = await axios.get(
            `/api/v1/Student/FindByCourseAndSemester?course=${SelectedCourse}&semester=${SelectedSemester}&PerPage=1&Limit=2`,
         );

         if (res.data.success && res.data.data.length > 0) {
            setStudentData(res.data?.data);
            setIsError(false);
         }

         setTimeout(() => {
            setIsLoading(false);
         }, 1000);

         setIsError(false);
      } catch (error) {
         setIsError(true);
         setErrorMessage(
            error.response?.data?.message ||
               error?.message ||
               'Something went wrong while fetching student data.',
         );
      }
   };

   return (
      <>
         <Helmet>
            <title>Student Page - CIITM Admin</title>
            <meta
               name='description'
               content="CIITM Admin Student Page - Manage your institution's student data efficiently."
            />
         </Helmet>

         <AdminTemplate pageName={'Students'}>
            <div className='findStudent_Container px-[2vw] h-[13vh] min-[900px]:h-[10vh] w-[93%] flex items-center justify-between gap-4 bg-[#1C1C1C] rounded-lg mt-[4vh] mb-[3vh]'>
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
                  optionSelectedData={data =>
                     setSelectedSemester(data)
                  }
                  height='70%'
                  width='40%'
                  value='Select Semester'
                  border='2px solid #2C2C2C'
               />

               <button
                  className='p-[2vh] bg-gray-500 text-white rounded-md'
                  onClick={e => Handle_Student_Search(e)}
               >
                  {console.log('isLoading', isLoading)}
                  {isLoading ? 'Searching...' : 'Search'}
               </button>
            </div>

            {isError && (
               <div className='text-white text-center  flex mb-[4vh] items-center justify-center flex-col w-[94%] max-[553px]:w-[87%] h-[91vh] rounded-md  bg-[#1C1C1C]'>
                  <p className='text-[3rem]'>⚠️</p>
                  <p className='text-[1.2rem]'>{ErrorMessage}</p>
               </div>
            )}

            {!isError && studentData.length > 0 && (
               <FormTemplate PageName={'Students'}>
                  <StudentDataTable students={studentData} />
               </FormTemplate>
            )}
         </AdminTemplate>
      </>
   );
};

export default StudentPage;
