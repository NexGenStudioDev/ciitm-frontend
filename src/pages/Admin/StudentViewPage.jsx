import React from 'react';
import { useParams } from 'react-router-dom';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import StudentPersonalInfo from '../../components/Templates/Admin/StudentView/StudentPersonalInfo';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import AdminStudentTitle from '../../components/Molecules/Admin/Student/AdminStudentTitle';
import StudentParentInfo from '../../components/Templates/Admin/StudentView/StudentParrentInfo';

const StudentViewPage_DataArray = [
   {
      element: (
         <StudentPersonalInfo
            data={{
               Name: 'Abhishek Kumar',
               Email: 'abhishek.nexgen.dev@gmail.com',
               PhoneNumber: '123-456-7890',
            }}
         />
      ),
      imageUrl:
         'https://avatars.githubusercontent.com/u/122656682?v=4',
      title: 'Personal Information',
   },
   {
      element: (
         <StudentParentInfo
            data={{
               FatherName: 'Ramesh Kumar',
               MotherName: 'Sita Devi',
               GuardianNumber: '987-654-3210',
            }}
         />
      ),
      imageUrl:
         'https://th.bing.com/th/id/OIP.fcM05M_wuoA_1mpwD-_dDgHaHa?w=626&h=626&rs=1&pid=ImgDetMain',
      title: 'Parent Information',
   },
];

const fallbackImage = 'https://via.placeholder.com/150';

const StudentViewPage = () => {
   const { studentId } = useParams();
   const [index, setIndex] = React.useState(0);

   const onImageError = e => {
      e.target.src = fallbackImage;
   };

   const handleNext = () => {
      if (index < StudentViewPage_DataArray.length - 1)
         setIndex(index + 1);
   };

   const handlePrevious = () => {
      if (index > 0) setIndex(index - 1);
   };

   const currentData = StudentViewPage_DataArray[index];

   return (
      <AdminTemplate pageName={`Student View :- ${studentId}`}>
         <FormTemplate_Secondary>
            <AdminStudentTitle title={currentData.title} />
            <div className='w-full rounded-lg shadow-md flex flex-col items-center'>
               <div className='flex items-center justify-center w-full my-6'>
                  <img
                     src={currentData.imageUrl}
                     alt='Student'
                     onError={onImageError}
                     className='w-40 h-40 object-cover object-center rounded-full bg-green-600 border-4 border-white shadow-lg'
                  />
               </div>
               {currentData.element}
            </div>
            <div className='w-full flex justify-between items-center px-[2vw] py-[2vh] mt-8'>
               <button
                  onClick={handlePrevious}
                  disabled={index === 0}
                  className={`
                     flex items-center gap-2
                     px-[2vw] py-[1.2vh]
                     bg-gradient-to-r from-gray-700 to-gray-900
                     text-white font-semibold rounded-lg shadow-md
                     hover:from-gray-800 hover:to-black
                     hover:scale-105 active:scale-95 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                     text-[1.1rem] md:text-[1.15vw]
                     ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
               >
                  ⏮️ Previous
               </button>
               <button
                  onClick={handleNext}
                  disabled={
                     index === StudentViewPage_DataArray.length - 1
                  }
                  className={`
                     flex items-center gap-2
                     px-[2vw] py-[1.2vh]
                     bg-gradient-to-r from-gray-700 to-gray-900
                     text-white font-semibold rounded-lg shadow-md
                     hover:from-gray-800 hover:to-black
                     hover:scale-105 active:scale-95 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                     text-[1.1rem] md:text-[1.15vw]
                     ${index === StudentViewPage_DataArray.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
               >
                  Next ⏭️
               </button>
            </div>
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default StudentViewPage;
