import React, { useState } from 'react';
import ValidateUniqueIdInput from '../components/Atoms/Input/ValidateUniqueIdInput';
import axios from 'axios';
import Swal from 'sweetalert2';

const StatusPage = () => {
   const [Student_Id, setStudent_Id] = useState(null);
   const [getValidationStatus, setGetValidationStatus] = useState(false);
   const [studentData, setStudentData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleSearch = async () => {
      if (!Student_Id) {
         Swal.fire({
            icon: 'warning',
            title: 'Missing Student ID',
            text: 'Please enter a valid Student ID.',
            showConfirmButton: true,
         });
         return;
      }

      setIsLoading(true);

      try {
        //  const response = await axios.get(`/api/v1/student/admissionStatus?uniqueId=${Student_Id}`);
        //  if (response.data.success) {
        //     setStudentData(response.data.data);
        //     Swal.fire({
        //        icon: 'success',
        //        title: 'Success',
        //        text: 'Student data fetched successfully!',
        //     });
        //  } else {
        //     Swal.fire({
        //        icon: 'error',
        //        title: 'Error',
        //        text: response.data.message || 'No data found for the given Student ID.',
        //     });
        //  }

        setStudentData({
            name: 'John Doe',
            email: 'john12@gmail.com',
            fatherName: 'Mr. Doe',
            mobileNumber: '1234567890',
            message: 'Your admission is under review.',
            status: 'Pending',
            admissionDate: '2023-10-01',
            photo: 'https://www.w3schools.com/w3images/avatar2.png',
         });
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'Failed to fetch student data.',
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className='w-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center p-6'>
         <div className='w-full max-w-[97%] bg-white rounded-lg shadow-lg border border-gray-200 p-6 mt-[12vh]'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2'>
               Admission Status
            </h1>

            <div className='Student_Id_Container w-full mb-6'>
               <label htmlFor='student_id'>
                  <h1 className='text-lg font-medium text-gray-700 mb-2'>
                     Student ID
                  </h1>
               </label>

               <div className='flex items-center gap-4'>
                  <ValidateUniqueIdInput
                     getValidationStatus={status => setGetValidationStatus(status)}
                     getStudentId={id => setStudent_Id(id)}
                     className='bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />

                  <button
                     className='bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
                     disabled={isLoading || !getValidationStatus}
                     onClick={handleSearch}
                  >
                     {isLoading ? 'Searching...' : 'Search'}
                  </button>
               </div>
            </div>

            {studentData && (
               <div className='Status_Container w-full flex flex-col lg:flex-row gap-6 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300'>
                  <div className='Status_Data w-full flex flex-col gap-4'>

                  <div className='Image_Container w-full flex items-center justify-center'>
                     <img
                        src={studentData?.photo || '/default-photo.png'}
                        alt='Student Photo'
                        className='w-52 h-52 rounded-full border border-gray-300 shadow-md'
                     />
                  </div>


                     <div>
                        <label htmlFor='Student_Name' className='text-lg font-medium text-gray-700'>
                           Name
                        </label>
                        <input
                           type='text'
                           id='Student_Name'
                           value={studentData?.name || ''}
                           readOnly
                           className='w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700'
                        />
                     </div>

                     <div>
                        <label htmlFor='Student_Email' className='text-lg font-medium text-gray-700'>
                           Email
                        </label>
                        <input
                           type='text'
                           id='Student_Email'
                           value={studentData?.email || ''}
                           readOnly
                           className='w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700'
                        />
                     </div>

                     <div>
                        <label htmlFor='Father_Name' className='text-lg font-medium text-gray-700'>
                           Father Name
                        </label>
                        <input
                           type='text'
                           id='Father_Name'
                           value={studentData?.fatherName || ''}
                           readOnly
                           className='w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700'
                        />
                     </div>

                     <div>
                        <label htmlFor='Mobile_Number' className='text-lg font-medium text-gray-700'>
                           Mobile Number
                        </label>
                        <input
                           type='text'
                           id='Mobile_Number'
                           value={studentData?.mobileNumber || ''}
                           readOnly
                           className='w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700'
                        />
                     </div>

                     <div>
                        <label htmlFor='Message' className='text-lg font-medium text-gray-700'>
                           Message
                        </label>
                        <textarea
                           id='Message'
                           value={studentData?.message || ''}
                           readOnly
                           className='w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700'
                        />
                     </div>

                     <div>
                        <label htmlFor='Status' className='text-lg font-medium text-gray-700'>
                           Status
                        </label>
                        <input
                           type='text'
                           id='Status'
                           value={studentData?.status || ''}
                           readOnly
                           className={`w-full p-3 border rounded-lg bg-white text-gray-700 ${
                              studentData?.status === 'Approved' ? 'border-green-500' : 'border-red-500'
                           }`}
                        />
                     </div>

                     <div>
                        <label htmlFor='Admission_Date' className='text-lg font-medium text-gray-700'>
                           Date of Admission Form Fill
                        </label>
                        <input
                           type='text'
                           id='Admission_Date'
                           value={studentData?.admissionDate || ''}
                           readOnly
                           className='w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700'
                        />
                     </div>
                  </div>

                
               </div>
            )}
         </div>
      </div>
   );
};

export default StatusPage;
