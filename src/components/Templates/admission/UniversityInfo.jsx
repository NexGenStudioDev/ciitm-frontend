import React, { useEffect } from 'react';
import InputField from './InputField';
import Dropdown from './DropDown';
import socket from '../../../config/socket.mjs';

const UniversityInfo = ({ handleInputChange }) => {
   let [courseName, setCourseName] = React.useState([]);

   let fetchCourseName = () => {
      socket.emit('FindCourse');
      socket.once('CourseFound', data => {
         setCourseName(data);
      });
   };

   useEffect(() => {
      if (!socket.connected) {
         socket.connect();
      }

      fetchCourseName();

      return () => {
         socket.off('CourseFound');
      };
   }, []);

   console.log('Course Name:');

   return (
      <div className='sm:grid flex flex-col w-full 2xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4 gap-y-10'>
         <Dropdown
            placeholder='Select Your University'
            name='university'
            required={true}
            options={[
               'Aisect University',
               'Makhanlal Chaturvedi  University Bhopal ',
            ]}
            onChange={handleInputChange}
         />

         <Dropdown
            placeholder='Select Course'
            name='courseName'
            required={true}
            options={courseName.map(item => item.courseName)}
            onChange={handleInputChange}
         />

         {/* mode */}

         <Dropdown
            placeholder='Select Mode'
            name='mode'
            required={true}
            options={['Online', 'Offline']}
            onChange={handleInputChange}
         />
      </div>
   );
};

export default UniversityInfo;
