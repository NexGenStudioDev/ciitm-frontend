import React from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import Dropdown_Primary from '../../components/Atoms/Dropdown/Dropdown_Primary';
import FormTemplate from '../../components/Templates/Admin/form/FormTemplate';
import EarningData_Table from '../../components/Organisms/Admin/EarningData_Table';
import EarningData from '../../components/Organisms/Admin/EarningData';
import axios from 'axios';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

let arr = [
   {
      text: 'S.no',
      style: 'w-[5%] max-[1347px]:hidden text-center align-middle bg-[#090909] border-[#322F2F] text-white text-sm md:text-md rounded-tl-2xl',
   },
   {
      text: 'Date',
      style: 'w-[9%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Student Name',
      style: 'w-[14%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Type',
      style: 'w-[11%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Amount',
      style: 'w-[9%] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Status',
      style: 'w-[9%] h-[7vh] text-center bg-[#090909] text-white text-sm md:text-md',
   },
   {
      text: 'Bill',
      style: 'w-[8%] text-center bg-[#090909] text-white text-sm md:text-md rounded-tr-2xl',
   },
];


const Earning = () => {
   const [startDate, setStartDate] = React.useState('');
   const [endDate, setEndDate] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(true);
   const [earnings, setEarnings] = React.useState([]);
   const [isError, setIsError] = React.useState(true);
   const [error, setError] = React.useState(null);
   console.log('Start Date:', startDate);
   console.log('End Date:', endDate);

   let FetchStudent = async () => {
      try {
         setIsLoading(true);
         let res = await axios.get('/api/v1/Student/getEarning',{
            params: {
               startDate: startDate,
               endDate: endDate
            }
         })
         let data = res.data.data;
         if (data) {
            setIsLoading(false);
            setEarnings(data);
         } 
         if (data.length === 0) {
            setIsError(true);
            setError('No earnings found for the selected date range.');
         }
         console.log('Response:', res);
      } catch (error) {
         setEarnings(error.response?.data?.data || []);
         console.error('Error fetching earnings:', error);
         
      }finally {
         setIsLoading(false);
      }
   }

   return (
      <AdminTemplate pageName='Earnings'>
         <div className='findStudent_Container px-[2vw] h-[10vh] min-[900px]:h-[10vh] w-[93%] flex items-center justify-between gap-4 bg-[#1C1C1C] rounded-lg my-[4vh]'>
            <div className="flex flex-col">
               <label htmlFor="startDate" className="text-gray-300 text-xs font-medium mb-1">Start Date</label>
               <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="bg-[#181c23] text-white border border-[#353b48] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
               />
            </div>
            <div className="flex flex-col">
               <label htmlFor="endDate" className="text-gray-300 text-xs font-medium mb-1">End Date</label>
               <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="bg-[#181c23] text-white border border-[#353b48] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
               />
            </div>
            <button
               className="ml-2 mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
               onClick={FetchStudent}
            >
               {isLoading ? 'Search' : 'Searching...'}
            </button>
         </div>

         <FormTemplate PageName={'Earnings'} Navigator={false}>
            <EarningData_Table arr={arr} />
           {earnings.length > 0 ? (
               <>
               <EarningData earnings={earnings} />
               <div className="w-[69.4vw] h-[8vh] rounded-br-xl  rounded-bl-xl bg-[#090909] flex items-center justify-end px-[2vw]">
                  <div className="flex  gap-[1vw]  text-[2vw] text-white ">
                  <FaArrowAltCircleLeft />
                  <FaArrowAltCircleRight />
                  </div>
               </div>
               </>
            ) : (
               <div className='text-center text-white text-lg mt-10 flex justify-center items-center w-[69vw] h-[50vh]'>
                 <p className=' text-red-900 text-lg'>
                 {!startDate &&  'Please select a Date to find Earnings.'}
                 {error && `Error: ${error}`}
                 </p>
            
               </div>
            )}
         </FormTemplate>
      </AdminTemplate>
   );
};

export default Earning;
