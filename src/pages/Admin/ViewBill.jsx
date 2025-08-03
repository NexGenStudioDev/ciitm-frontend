import React from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';



const billColumns = [
   {
     key: 'column1',
     items: [
       { label: 'Date', value: '01/01/2023' },
       { label: 'Student Name', value: 'Abhishek Kumar' },
     ],
   },
   {
     key: 'column2',
     items: [
       { label: 'Bill No.', value: 'Vii-148-7' },
       { label: 'Student ID', value: 'CIITM-BCA-7842' },
     ],
   },
   {
     key: 'column3',
     items: [
       { label: 'Course Name', value: 'Bachelor of Computer Applications (BCA)'.split(' ').slice(0, 3).join(' ') },
       { label: 'Payment Mode', value: 'Online' },
     ],
   },
   {
     key: 'column4',
     items: [
       { label: 'Semester', value: '5' },
       { label: 'Payment Status', value: 'Completed' },
     ],
   },
 ];

 
 
const ViewBill = () => {
   return (
      <AdminTemplate pageName='View Bill'>
         <FormTemplate_Secondary>
            <div className='Form_title_Container w-full flex flex-col items-center justify-center text-white bg-[#090909] print:rounded-none rounded-md  p-[1.5vh] min-[1000px]:p-5 shadow-lg  print:border-2 print:border-[#322F2F]'>
               <h2 className='Form_title text-[2.5vw] min-[1000px]:text-[1vw] font-semibold'>
                  INSTITUTE BILLING INVOICE
               </h2>
            </div>

            <div className='min-h-screen w-full bg-[#1C1C1C] print:bg-white rounded-b-md print:border-r print:border-1 print:border-[#322F2F]'>
               {/* Institute Info */}
               <div className='Institute_Info w-full flex justify-between items-center p-8 text-[#A49C9C] border-b border-[#322F2F] text-base md:text-lg lg:text-xl print:border-b-2 print:border-[#322F2F]'>
                  <div className='Institute_Info_left flex flex-col'>
                     <h3 className='font-semibold text-white text-lg md:text-xl lg:text-2xl'>CIITM DHANBAD</h3>
                     <p>Near XYZ Road, Dhanbad</p>
                  </div>
                  <div className='Institute_Info_Right text-right'>
                     <p>+91-XXXXXXXXXX</p>
                     <p>✉️ info@ciitmdhanbad.ac.in</p>
                  </div>
               </div>

               {/* Bill Info */}
               <div className='Bill_Info w-full flex text-[#A49C9C] text-sm md:text-base lg:text-lg'>
                  {/* Column 1 */}

                {
                    [
                     {
                        key: 'column1',
                        items: [
                           { label: 'Date', value: '01/01/2023' },
                           { label: 'Student Name', value: 'Abhishek Kumar' },
                        ],
                     },
                     {
                        key: 'column2',
                        items: [
                           { label: 'Bill No.', value: 'Vii-148-7' },
                           { label: 'Student ID', value: 'CIITM-BCA-7842' },
                        ],
                     },
                     {
                        key: 'column3',
                        items: [
                           { label: 'Course Name', value: 'Bachelor of Computer Applications (BCA)'.split(' ').slice(0, 3).join(' ') },
                           { label: 'Payment Mode', value: 'Online' },
                        ],
                     },
                     {
                        key: 'column4',
                        items: [
                           { label: 'Semester', value: '5' },
                           { label: 'Payment Status', value: 'Completed' },
                        ],
                     }
                  ].map((column, index) => (
                     <div key={column.key} className={`w-[25%] ${index < 3 ? 'border-r border-[#322F2F] print:border-r-2 print:border-black' : ''} flex flex-col`}>
                        {column.items.map((item, itemIndex) => (
                           <div key={item.label} className={`p-6 ${itemIndex > 0 ? 'border-t border-[#322F2F] print:border-t-2 print:border-black' : ''}`}>
                              <p className='min-[1000px]:text-[1.1vw]'>
                                 {item.label} <br />
                                 <span className='text-white font-semibold text-[1.7vw] min-[1000px]:text-[0.8vw]'>{item.value}</span>
                              </p>
                           </div>
                        ))}
                     </div>
                  ))
                }
                  
               </div>
            </div>
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default ViewBill;
