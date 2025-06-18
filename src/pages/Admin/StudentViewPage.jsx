import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import StudentPersonalInfo from '../../components/Templates/Admin/StudentView/StudentPersonalInfo';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import AdminStudentTitle from '../../components/Molecules/Admin/Student/AdminStudentTitle';
import StudentParentInfo from '../../components/Templates/Admin/StudentView/StudentParrentInfo';
import StudentGradeInfo from '../../components/Templates/Admin/StudentView/StudentGradeInfo';
import StudentUniversityInfo from '../../components/Templates/Admin/StudentView/StudentUniversityInfo';
import FeeUniversityInfo from '../../components/Templates/Admin/StudentView/FeeUniversityInfo';
import socket from '../../config/socket.mjs';

const fallbackImage = 'https://via.placeholder.com/150';

const StudentViewPage = () => {
   if (socket.connected) {
      socket.connect();
   }

   const { studentId } = useParams();
   const [studentPersonalData, setStudentPersonalData] = useState({
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Email: '',
      Gender: '',
      PhoneNumber: '',
      DateOfBirth: '',
   });

   const [ParentData, setParentData] = useState({
      FatherName: '',
      MotherName: '',
      GuardianNumber: '',
      AvtarImage: fallbackImage,
   });

   const [GradeData, setGradeData] = useState({
      TenthBoardName: '',
      TenthMarks: '',
      TwelfthBoardName: '',
      TwelfthMarks: '',
   });

   const [UniversityData, setUniversityData] = useState({
      UniversityName: '',
      CourseName: '',
      CourseMode: '',
   });

   const [FeeData, setFeeData] = useState({
      TotalCourseFee: '',
      TotalAmountPaid: '',
      TotalAmountDue: '',
      LateFine: '',
   });

   const [index, setIndex] = React.useState(0);
   const [isError, setIsError] = useState(false);

   useEffect(() => {
      if (!socket.connected) socket.connect();

      socket.emit('findStudentById', { studentId });

      const handleStudentFound = data => {
         if (data && data.student) {
            setIsError(false);
            console.log('Student Data: data from socket', data);
            // const s = data.student;
            // console.log('Student Data: s', s);

            setStudentPersonalData({
               FirstName: data.student.firstName || '',
               MiddleName: data.student.middleName || '',
               LastName: data.student.lastName || '',
               Gender: data.student.gender || '',
               Email: Array.isArray(data.student.email)
                  ? data.student.email[0]
                  : data.student.email || '',
               PhoneNumber: data.student.contactNumber || '',
               DateOfBirth: data.student.dateOfBirth
                  ? data.student.dateOfBirth.slice(0, 10)
                  : '',
               AvtarImage: data.student.avtar || fallbackImage,
            });

            setParentData({
               FatherName: data.student.fatherName || '',
               MotherName: data.student.motherName || '',
               GuardianNumber: data.guardian?.GcontactNumber || '',
            });

            setGradeData({
               TenthBoardName: data.tenth?.tenthBoard || '',
               TenthMarks: data.tenth?.tenthMarks || '',
               TwelfthBoardName: data.twelfth?.twelfthBoard || '',
               TwelfthMarks: data.twelfth?.twelfthMarks || '',
            });

            setUniversityData({
               UniversityName: data.university || '',
               CourseName: data.student.course_Id?.name || '', // If populated, else fallback to ''
               CourseMode: data.mode || '',
            });

            setFeeData({
               TotalCourseFee: data.fee?.course_Fee || '',
               TotalAmountPaid: data.fee?.amount_paid || '',
               TotalAmountDue: data.fee?.amount_due || '',
               LateFine: data.fee?.late_Fine || '',
            });

            //   setStudentData({
            //     // Personal Info
            //     personal: {
            //       Name: [s.firstName, s.middleName, s.lastName].filter(Boolean).join(' '),
            //       Email: Array.isArray(s.email) ? s.email[0] : s.email || '',
            //       PhoneNumber: s.contactNumber || '',
            //       Gender: s.gender || '',
            //       DateOfBirth: s.dateOfBirth ? s.dateOfBirth.slice(0, 10) : '',
            //       AvatorImage: s.avtar || fallbackImage,
            //       Nationality: s.nationality || '',
            //       UniqueId: s.uniqueId || '',
            //       DateOfAdmission: s.dateOfAdmission ? s.dateOfAdmission.slice(0, 10) : '',
            //     },
            //     // Parent Info
            //     parent: {
            //       FatherName: s.fatherName || '',
            //       MotherName: s.motherName || '',
            //       GuardianName: data.guardian?.Gname || '',
            //       GuardianRelation: data.guardian?.Grelation || '',
            //       GuardianNumber: data.guardian?.GcontactNumber || '',
            //     },
            //     // Grade Info
            //     grade: {
            //       TenthBoardName: data.tenth?.tenthBoard || '',
            //       TenthMarks: data.tenth?.tenthMarks || '',
            //       TenthGrade: data.tenth?.tenthGrade || '',
            //       TwelfthBoardName: data.twelfth?.twelfthBoard || '',
            //       TwelfthMarks: data.twelfth?.twelfthMarks || '',
            //       TwelfthGrade: data.twelfth?.twelfthGrade || '',
            //     },
            //     // University Info
            //     university: {
            //       UniversityName: s.university || '',
            //       CourseName: s.course_Id?.name || '', // If populated, else fallback to ''
            //       CourseMode: s.mode || '',
            //       Semester: s.semester || '',
            //     },
            //     // Fee Info
            //     fee: {
            //       TotalCourseFee: data.fee?.course_Fee || '',
            //       TotalAmountPaid: data.fee?.amount_paid || '',
            //       TotalAmountDue: data.fee?.amount_due || '',
            //       LateFine: data.fee?.late_Fine || '',
            //     },
            //   });
         } else {
            setIsError(true);
         }
      };

      const handleError = err => {
         setIsError(true);
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error || err?.message || 'Unknown error',
         });
      };

      socket.once('studentFound', handleStudentFound);
      socket.on('error', handleError);

      return () => {
         socket.off('studentFound', handleStudentFound);
         socket.off('error', handleError);
      };
   }, [studentId]);

   const StudentViewPage_DataArray = [
      {
         element: (
            <StudentPersonalInfo
               data={{
                  Name:
                     studentPersonalData.FirstName +
                     ' ' +
                     studentPersonalData.MiddleName +
                     ' ' +
                     studentPersonalData.LastName,
                  Email: studentPersonalData.Email,
                  PhoneNumber: studentPersonalData.PhoneNumber,
                  Gender: studentPersonalData.Gender,
                  DateOfBirth: studentPersonalData.DateOfBirth,
               }}
            />
         ),
         imageUrl: studentPersonalData.AvtarImage || fallbackImage,
         title: 'Personal Information',
      },
      {
         element: (
            <StudentParentInfo
               data={{
                  FatherName: ParentData.FatherName,
                  MotherName: ParentData.MotherName,
                  GuardianNumber: ParentData.GuardianNumber,
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
                  TenthBoardName: GradeData.TenthBoardName,
                  TenthMarks: GradeData.TenthMarks + '/500',
                  TenthGrade: GradeData.TenthGrade,
                  TwelfthBoardName: GradeData.TwelfthBoardName,
                  TwelfthMarks: GradeData.TwelfthMarks + '/500',
                  TwelfthGrade: GradeData.TwelfthGrade,
               }}
            />
         ),
         imageUrl:
            'https://th.bing.com/th/id/OIP.S7E9E3bNjlS4QaNMpqwQ7wHaHc?rs=1&pid=ImgDetMain',
         title: 'Grade Information',
      },
      {
         element: (
            <StudentUniversityInfo
               data={{
                  UniversityName: UniversityData.UniversityName,
                  CourseName: UniversityData.CourseName,
                  CourseMode: UniversityData.CourseMode,
               }}
            />
         ),
         imageUrl:
            'https://th.bing.com/th/id/R.82328cdfccac1533bc3d727f5a6894b8?rik=G2UDr9e%2bjaqq%2bg&riu=http%3a%2f%2fclipartix.com%2fwp-content%2fuploads%2f2016%2f06%2fCollege-campus-clipart-clipart-kid.jpg&ehk=gyRnGdIW1juXjTalcJGjGfxVM6%2fUo5KUtaQNBJKEfDU%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
         title: 'University Information',
      },
      {
         element: (
            <FeeUniversityInfo
               data={{
                  TotalCourseFee: '₹  ' + FeeData.TotalCourseFee,
                  TotalAmountPaid:
                     '₹  ' + FeeData.TotalAmountPaid || '₹ 0',
                  TotalAmountDue:
                     '₹  ' + FeeData.TotalAmountDue || '₹ 0',
                  LateFine: '₹  ' + FeeData.LateFine || '₹ 0',
               }}
            />
         ),
         imageUrl:
            'https://png.pngtree.com/png-vector/20190110/ourmid/pngtree-vector-payment-icon-png-image_312637.jpg',
         title: 'Fee Information',
      },
   ];

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
         {isError && (
            <div className='w-full h-full flex items-center justify-center'>
               <div className='text-red-500 text-xl font-semibold'>
                  Error: Student not found or data unavailable.
               </div>
            </div>
         )}

         {!isError && (
            <FormTemplate_Secondary>
               <AdminStudentTitle title={currentData.title} />
               <div className='w-full rounded-lg shadow-md flex flex-col items-center  max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw]'>
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
         )}
      </AdminTemplate>
   );
};

export default StudentViewPage;
