import React, { useEffect, useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import { useParams } from 'react-router-dom';
import { getFee_Info } from '../../service/user.service';
import { date } from 'yup';

const ViewBill = () => {
   const { Payment_id } = useParams();
   const [error, setError] = useState('');
   const [billData, setBillData] = useState({
      studentName: '',
      date: '',   
      billNo: '',
      studentId: '',
      courseName: '',
      paymentMode: '',
      semester: '',
      paymentStatus: '',
      description: '',
      amount: 0,
   });

   useEffect(() => {
     

      console.log('Payment_id: Code chala', Payment_id);

      async function fetchBillData() {
         try {
            const data = await getFee_Info(Payment_id);
            console.log('Fetched Bill Data:', data);
            setBillData({
               studentName: data[0].StudentName,
               date: data[0].Date,
               billNo: data[0].BillNo,
               studentId: data[0].StudentId,
               courseName: data[0].CourseName,
               paymentMode: data[0].PaymentMode,
               semester: data[0].Semester,
               paymentStatus: data[0].PaymentStatus,
               paymentMode: data[0].PaymentMethod,
               description: data[0].PaymentType,
               amount: data[0].AmountPaid,


           });
         } catch (err) {
            setError('Failed to fetch bill data');
            console.error(err);
         }
      }

      fetchBillData();
   }, [Payment_id]);

   // Fallback values if billData is not loaded yet
 

   return (
      <AdminTemplate pageName='View Bill'>
         <FormTemplate_Secondary>
            <div className='Form_title_Container w-full flex flex-col items-center justify-center text-white bg-[#090909] print:rounded-none rounded-md  p-[1.5vh] min-[1000px]:p-5 shadow-lg  print:border-2 print:border-[#322F2F] print:m-0  print:shadow-none print:p-0'>
               <h2 className='Form_title text-[2.5vw] min-[1000px]:text-[1vw] font-semibold  print:text-black'>
                  INSTITUTE BILLING INVOICE
               </h2>
            </div>

            <div className='min-h-[95vh] w-full bg-[#1C1C1C] print:bg-white rounded-b-md print:border-r print:border-1 print:border-[#322F2F]'>
               {/* Institute Info */}
               <div className='Institute_Info w-full flex justify-between items-center p-8 text-[#A49C9C] border-b border-[#322F2F] text-base md:text-lg lg:text-xl print:border-b-2 print:border-[#322F2F] print:bg-black'>
                  <div className='Institute_Info_left flex flex-col '>
                     <h3 className='font-semibold text-white  print:text-black text-lg md:text-xl lg:text-2xl'>
                        CIITM DHANBAD
                     </h3>
                     <p className="print:text-black">Near XYZ Road, Dhanbad</p>
                  </div>
                  <div className='Institute_Info_Right text-right print:text-black ' >
                     <p>+91-XXXXXXXXXX</p>
                     <p>✉️ info@ciitmdhanbad.ac.in</p>
                  </div>
               </div>

               {/* Bill Info */}
               <div className='Bill_Info w-full flex text-[#A49C9C] text-sm md:text-base lg:text-lg'>
                  {/* Column 1 */}
                  <div className='w-[25%] border-r border-[#322F2F] print:border-r-2 print:border-black flex flex-col'>
                     <div className='p-6'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Date <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {Date(billData.date).toLocaleString() || '--'}
                           </span>
                        </p>
                     </div>
                     <div className='p-6 border-t border-[#322F2F] print:border-t-2 print:border-black'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Student Name <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {billData.studentName || '--'}
                           </span>
                        </p>
                     </div>
                  </div>
                  {/* Column 2 */}
                  <div className='w-[25%] border-r border-[#322F2F] print:border-r-2 print:border-black flex flex-col'>
                     <div className='p-6'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Bill No. <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {billData.billNo || '--'}
                           </span>
                        </p>
                     </div>
                     <div className='p-6 border-t border-[#322F2F] print:border-t-2 print:border-black'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Student ID <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {billData.studentId || '--'}
                           </span>
                        </p>
                     </div>
                  </div>
                  {/* Column 3 */}
                  <div className='w-[25%] border-r border-[#322F2F] print:border-r-2 print:border-black flex flex-col'>
                     <div className='p-6'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Course Name <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {billData.courseName || '--'}
                           </span>
                        </p>
                     </div>
                     <div className='p-6 border-t border-[#322F2F] print:border-t-2 print:border-black'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Payment Mode <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {billData.paymentMode || '--'}
                           </span>
                        </p>
                     </div>
                  </div>
                  {/* Column 4 */}
                  <div className='w-[25%] flex flex-col'>
                     <div className='p-6'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Semester <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {billData.semester || '--'}
                           </span>
                        </p>
                     </div>
                     <div className='p-6 border-t border-[#322F2F] print:border-t-2 print:border-black'>
                        <p className='min-[1000px]:text-[1.1vw] print:text-black'>
                           Payment Status <br />
                           <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw] print:text-black'>
                              {billData.paymentStatus || '--'}
                           </span>
                        </p>
                     </div>
                  </div>
               </div>

               {/* Description and Amount */}
               <div className="w-full bg-[#2E2929] h-[6vh] flex items-center justify-between px-8 text-[#A49C9C]  text-[1.7vw] min-[1000px]:text-[1.1vw] print:border-t-2 print:border-b-2 print:border-black print:text-black">
                  <p>Description</p>
                  <div className="w-[24%] h-[95%]  flex item-center py-2">
                     <p className="ml-[1vw]">Amount</p>
                  </div>
               </div>
               <div className="Bill_Item h-[25vh] w-full flex items-center justify-between px-8 text-[#A49C9C] text-[1.1vw] print:bg-gray-600">
                  <p className='w-[76%] h-full text-left p-[1.5vw] text-[1.7vw] min-[1000px]:text-[1.2vw]'>
                     {billData.description || '--'}
                  </p>
                  <p className='w-[24%] h-full text-left  p-[1.5vw] border-l-2 border-[#322F2F] print:border-l-2 text-[1.7vw] min-[1000px]:text-[1.2vw]'>
                     ₹ {billData.amount || 0}
                  </p>
               </div>

               {/* Total */}
               <div className="w-full bg-[#2E2929] h-[6vh] flex items-center justify-end  text-[#A49C9C] text-[1.1vw] print:bg-gray-600 print:border-t-2 print:border-b-2 print:border-black ">
                  <p className='mr-[2.5vw] text-[1.7vw] min-[1000px]:text-[1.2vw]'> Total</p>
                  <div className="w-[26%]  h-full flex items-center">
                     <p className="ml-[1.8vw] text-[1.7vw] min-[1000px]:text-[1.2vw]">
                        ₹ {billData.amount || 0}
                     </p>
                  </div>
               </div>

               {/* Print Button */}
               <div className="w-full flex items-center justify-center">
                  <button className='bg-[#FF4D4D] text-white px-6 py-2 rounded-md mt-8 print:hidden' onClick={() => window.print()}>
                     Print Bill
                  </button>
               </div>
               {/* Error Message */}
               {error && (
                  <div className="w-full text-center text-red-500 mt-4">
                     {error}
                  </div>
               )}
            </div>
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default ViewBill;
