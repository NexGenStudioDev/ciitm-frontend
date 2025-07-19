import React, { useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import Input_Primary from '../../components/Atoms/Input/Input_Primary';
import TextArea_Primary from '../../components/Atoms/Textarea/TextArea_Primary';
import axios from 'axios';
import { createCourse_EndPoint } from '../../utils/constants';
import Swal from 'sweetalert2';

const CreateCourse = () => {
   const [courseName, setCourseName] = useState('');
   const [coursePrice, setCoursePrice] = useState('');
   const [courseDuration, setCourseDuration] = useState('');
   const [ImageUrl, setImageUrl] = useState('');
   const [courseEligibility, setCourseEligibility] = useState('');
   const [courseThumbnail, setCourseThumbnail] = useState('');
   const [courseDescription, setCourseDescription] = useState('');
   const [courseCode, setCourseCode] = useState('');

   const handleSubmit = async e => {
      e.preventDefault();
      try {
         let res = await axios.post(createCourse_EndPoint, {
            courseName,
            coursePrice,
            courseDuration,
            courseEligibility,
            courseThumbnail,
            courseDescription,
            courseCode,
         });
         console.log('Course created successfully', res.data);

         Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.data.message || 'Course created successfully!',
            confirmButtonText: 'OK',
         });
      } catch (error) {
         console.error(
            'Error creating course:',
            error.response ? error.response.data : error.message,
         );

         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response
               ? error.response.data.message
               : 'An unexpected error occurred while creating the course.',
            confirmButtonText: 'OK',
         });
      }
   };

   return (
      <AdminTemplate pageName='Create Course'>
         <FormTemplate_Secondary>
            <div className='Form_title_Container w-full flex flex-col items-center justify-center text-white bg-[#090909] rounded-md p-4 shadow-lg'>
               <h1 className='Form_title max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw]'>
                  Create Course
               </h1>
            </div>

            <form
               className='w-full flex flex-col items-center justify-center mt-4 px-[2vw] max-[300px]:text-[4vw] max-[995px]:text-[2vw] max-[500px]:text-[2.8vw] text-[1.3vw]'
               onSubmit={handleSubmit}
            >
               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='courseName'
                     className='text-white mb-2'
                  >
                     Course Name
                  </label>
                  <Input_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     type='text'
                     id='courseName'
                     name='courseName'
                     placeholder='Enter course name'
                     value={courseName}
                     onInput={e => setCourseName(e.target.value)}
                     required
                  />
               </div>

               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='courseFee'
                     className='text-white mb-2'
                  >
                     Course Fee
                  </label>
                  <Input_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     type='number'
                     id='courseFee'
                     name='courseFee'
                     placeholder='Enter course fee'
                     value={coursePrice}
                     onInput={e => setCoursePrice(e.target.value)}
                     required
                  />
               </div>

               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='courseDuration'
                     className='text-white mb-2'
                  >
                     Course Duration
                  </label>
                  <Input_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     type='text'
                     id='courseDuration'
                     name='courseDuration'
                     placeholder='Enter course duration'
                     value={courseDuration}
                     onInput={e => setCourseDuration(e.target.value)}
                     required
                  />
               </div>

               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='courseCode'
                     className='text-white mb-2'
                  >
                     Course Code
                  </label>
                  <Input_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     type='text'
                     id='courseCode'
                     name='courseCode'
                     placeholder='Enter course code'
                     value={courseCode}
                     onInput={e => setCourseCode(e.target.value)}
                     required
                  />
               </div>

               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='courseEligibility'
                     className='text-white mb-2'
                  >
                     Course Eligibility
                  </label>
                  <Input_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     type='text'
                     id='courseEligibility'
                     name='courseEligibility'
                     placeholder='Enter course eligibility'
                     value={courseEligibility}
                     onInput={e =>
                        setCourseEligibility(e.target.value)
                     }
                     required
                  />
               </div>

               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='imageUrl'
                     className='text-white mb-2'
                  >
                     Course Image URL
                  </label>
                  <Input_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     type='text'
                     id='imageUrl'
                     name='imageUrl'
                     placeholder='Enter course image URL'
                     value={ImageUrl}
                     onInput={e => setImageUrl(e.target.value)}
                     required
                  />
               </div>

               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='courseThumbnail'
                     className='text-white mb-2'
                  >
                     Course Thumbnail URL
                  </label>
                  <Input_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     type='text'
                     id='courseThumbnail'
                     name='courseThumbnail'
                     placeholder='Enter course thumbnail URL'
                     value={courseThumbnail}
                     onInput={e => setCourseThumbnail(e.target.value)}
                     required
                  />
               </div>

               <div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
                  <label
                     htmlFor='courseDescription'
                     className='text-white mb-2'
                  >
                     Course Description
                  </label>
                  <TextArea_Primary
                     className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
                     id='courseDescription'
                     name='courseDescription'
                     placeholder='Enter course description'
                     value={courseDescription}
                     onInput={e =>
                        setCourseDescription(e.target.value)
                     }
                     rows={5}
                     required
                  />
               </div>

               <button
                  type='submit'
                  onClick={handleSubmit}
                  className='
              mt-4
              px-[2vw] py-[1.2vh]
              bg-gradient-to-r from-green-500 to-green-700
              text-white font-semibold rounded-lg shadow-md
              hover:from-green-600 hover:to-green-800
              hover:scale-105 active:scale-95 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
              max-[300px]:text-[4.5vw] max-[500px]:text-[3vw] max-[995px]:text-[2.3vw] text-[1.5vw]
              w-[40%]
              mb-[3.5vh]
            '
               >
                  Create Course
               </button>
            </form>
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default CreateCourse;
