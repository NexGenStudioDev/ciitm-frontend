import React from 'react';
import { useParams } from 'react-router-dom';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import StudentPersonalInfo from '../../components/Templates/Admin/StudentView/StudentPersonalInfo';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import AdminStudentTitle from '../../components/Molecules/Admin/Student/AdminStudentTitle';
import StudentParentInfo from '../../components/Templates/Admin/StudentView/StudentParrentInfo';
import StudentGradeInfo from '../../components/Templates/Admin/StudentView/StudentGradeInfo';
import StudentUniversityInfo from '../../components/Templates/Admin/StudentView/StudentUniversityInfo';
import FeeUniversityInfo from '../../components/Templates/Admin/StudentView/FeeUniversityInfo';

const StudentViewPage_DataArray = [
   {
      element: (
         <StudentPersonalInfo
            data={{
               Name: 'Abhishek Kumar',
               Email: 'abhishek.nexgen.dev@gmail.com',
               PhoneNumber: '123-456-7890',
               Gender: 'Male',
               DateOfBirth: '2000-01-01',
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
   {
      element: (
         <StudentGradeInfo
            data={{
               TenthBoardName: 'CBSE',
               TenthMarks: '455/500',
               TwelfthBoardName: 'CBSE',
               TwelfthMarks: '300/500',
            }}
         />
      ),
      imageUrl:
         'https://th.bing.com/th/id/OIP.S7E9E3bNjlS4QaNMpqwQ7wHaHc?rs=1&pid=ImgDetMain',
      title: 'Grade Information',
   },
   {
      element: (
         <StudentUniversityInfo data={{
           UniversityName: 'NexGen University',
            CourseName: 'Bca',
            CourseMode: 'Online',
         }}
      />
      ),
      imageUrl:
         'https://th.bing.com/th/id/R.82328cdfccac1533bc3d727f5a6894b8?rik=G2UDr9e%2bjaqq%2bg&riu=http%3a%2f%2fclipartix.com%2fwp-content%2fuploads%2f2016%2f06%2fCollege-campus-clipart-clipart-kid.jpg&ehk=gyRnGdIW1juXjTalcJGjGfxVM6%2fUo5KUtaQNBJKEfDU%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
      title: 'University Information',
   }
   ,{
      element: (
         <FeeUniversityInfo data={{

            TotalCourseFee: '10000',
            TotalAmountPaid: '5000',
            TotalAmountDue: '5000',
         }}
         />

      ),
      imageUrl:
         'https://png.pngtree.com/png-vector/20190110/ourmid/pngtree-vector-payment-icon-png-image_312637.jpg',
      title: 'Fee Information',
   }
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
            <div className='w-full h-fit flex justify-between items-center px-[2vw] py-[2vh] mt-2'>
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
