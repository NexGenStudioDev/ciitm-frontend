import React from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate from '../../components/Templates/Admin/form/FormTemplate';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';
import StudentDataTable from '../../components/Organisms/Admin/StudentDataTable';

const studentOptions = ['Bca', 'Mca', 'Bcom', 'Bba'];

const semisterOptions = [
   'Semister 1',
   'Semister 2',
   'Semister 3',
   'Semister 4',
   'Semister 5',
   'Semister 6',
];

let Handle_Student_Search = e => {
   e.preventDefault();
   alert('Search functionality is not implemented yet.');
};

const StudentPage = () => {
   const [isStudentFind, setIsStudentFind] = React.useState(false);

   return (
      <AdminTemplate pageName={'Students'}>
         <div className='findStudent_Container px-[2vw] h-[10vh] w-[93%] flex items-center justify-stretch  gap-4 bg-[#1C1C1C] rounded-lg mb-[3vh]'>
            <Dropdown_Primary
               options={studentOptions}
               backgroundColor='#1C1C1C'
               textColor='#FFFFFF'
               height='70%'
               width='20vw'
               value='Select Course'
               border='2px solid #2C2C2C'
            />

            <Dropdown_Primary
               options={semisterOptions}
               backgroundColor='#1C1C1C'
               textColor='#FFFFFF'
               height='70%'
               width='20vw'
               value='Select Semister'
               border='2px solid #2C2C2C'
            />

            <button
               className='p-[2vh] bg-gray-500 text-white rounded-md'
               onClick={e => Handle_Student_Search(e)}
            >
               Search
            </button>
         </div>
         <FormTemplate PageName={'Students'}>
            <StudentDataTable />
         </FormTemplate>
      </AdminTemplate>
   );
};

export default StudentPage;
