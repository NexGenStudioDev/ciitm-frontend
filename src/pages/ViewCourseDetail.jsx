import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewCourseDetail = () => {
   const [error, setError] = useState(null);
   const [courseData, setCourseData] = useState(null);
   const { id } = useParams();

   useEffect(() => {
      const fetchCourseById = async id => {
         try {
            const res = await axios.get(
               `/api/v1/user/findCourseById/${id}`,
            );
            setCourseData(res.data?.data || null);
            setError(null);
         } catch (error) {
            setCourseData(null);
            setError(
               error.response?.data?.message ||
                  error.message ||
                  'An unexpected error occurred',
            );
         }
      };
      if (id) fetchCourseById(id);
   }, [id]);

   return (
      <div className='flex max-[800px]:flex-col items-center justify-center  max-[800px]:h-[160vh] h-[130vh] w-full bg-[#f9f9f9]   max-[800px]:p-0  py-[8vh] px-[2vw] '>
         {/* Left Section: Static Title and Description */}
         <div
            className=' bg-white max-[800px]:h-fit h-[85%] w-[40%] max-[800px]:w-full  max-[800px]:mt-[12vh] p-8  flex flex-col items-center rounded-tl-lg rounded-bl-lg'
            style={{
               boxShadow:
                  '8px 0 0px -8px rgba(0,0,0,0.15), 0 8px 0px -8px rgba(0,0,0,0.15), -8px 0 16px -8px rgba(0,0,0,0.15)',
            }}
         >
            <div className=''>
               <h1 className='text-[2.5vw]  max-[800px]:text-[3.5vw] font-bold mb-6 text-gray-800'>
                  Course Details
               </h1>
               <p className='text-gray-700 text-[1.3vw] max-[800px]:text-[2.5vw]'>
                  Here you can view all the details of the selected
                  course, including its code, duration, fee,
                  eligibility, and a detailed description. Use this
                  information to understand the course structure and
                  requirements.
               </p>
            </div>
         </div>

         {/* Right Section: Fetched Data */}
         <div
            className='flex-1 flex  w-[40%] h-[85%] max-[800px]:w-full  max-[800px]:mb-[15vh] max-[800px]:h-fit items-center bg-white  max-[800px]:rounded-tr-none  rounded-tr-lg rounded-br-lg  border-l-[1px]  max-[800px]:border-l-[0px] border-gray-700'
            style={{
               boxShadow:
                  '-8px 0px 0px -8px rgba(0,0,0,0.15), 0 8px 16px -8px rgba(0,0,0,0.15), 8px 0 16px -8px rgba(0,0,0,0.15)',
            }}
         >
            {error && (
               <div className='text-red-500 max-[800px]:text-[3.8vw] h-full w-full font-semibold mb-4  flex items-center justify-center'>
                  {error}
               </div>
            )}
            {courseData ? (
               <div className='p-8  flex flex-col items-center w-full h-full max-[800px]:text-[2.5vw]'>
                  <h2 className='text-[2vw] max-[800px]:text-[3.5vw] font-semibold mb-[1vh] text-gray-800'>
                     {courseData.courseName}
                  </h2>
                  <img
                     src={courseData.courseThumbnail}
                     alt={courseData.courseName}
                     className='w-full h-[40%] object-cover rounded mb-6  max-[800px]:object-contain'
                     onError={e =>
                        (e.target.src =
                           'https://via.placeholder.com/400x250?text=No+Image')
                     }
                  />
                  <div className='w-full'>
                     <p className='mb-2'>
                        <span className='font-semibold'>
                           Course Code:
                        </span>{' '}
                        {courseData.courseCode}
                     </p>
                     <p className='mb-2'>
                        <span className='font-semibold'>
                           Duration:
                        </span>{' '}
                        {courseData.courseDuration}
                     </p>
                     <p className='mb-2'>
                        <span className='font-semibold'>Fee:</span> ₹
                        {courseData.coursePrice}
                     </p>
                     <p className='mb-2'>
                        <span className='font-semibold'>
                           Eligibility:
                        </span>{' '}
                        {courseData.courseEligibility ||
                           courseData.CourseEligibility}
                     </p>
                     <p className='mb-2'>
                        <span className='font-semibold'>
                           Description:
                        </span>{' '}
                        {courseData.courseDescription}
                     </p>
                  </div>
               </div>
            ) : (
               !error && (
                  <div className='w-full h-full flex items-center justify-center flex-col'>
                     Loading...
                  </div>
               )
            )}
         </div>
      </div>
   );
};

export default ViewCourseDetail;
