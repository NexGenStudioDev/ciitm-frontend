import React, { useRef } from 'react';
import StudentTemplate from '../../components/Templates/Admin/StudentTemplate';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'chart.js/auto';

const feeLabels = [
   'Admission Fee',
   'Semester Fee',
   'Farewell Fee',
   'Exam Fee',
   'Other',
];

const amounts = [25000, 15000, 2000, 3000, 1000];

const barColors = [
   '#22c55e', // Admission Fee - green
   '#3b82f6', // Semester Fee - blue
   '#f59e42', // Farewell Fee - orange
   '#a855f7', // Exam Fee - purple
   '#64748b', // Other - slate
];

const data = {
   labels: feeLabels,
   datasets: [
      {
         label: 'Amount (₹)',
         data: amounts,
         backgroundColor: barColors,
         borderRadius: 8,
         borderWidth: 3,
      },
   ],
};

const options = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
         callbacks: {
            label: function (context) {
               return `₹${context.parsed.y}`;
            },
         },
      },
   },
   scales: {
      y: {
         beginAtZero: true,
         ticks: { stepSize: 1000 },
      },
   },
};

const Wallet = () => {
   const chartRef = useRef();
   const navigate = useNavigate();

   // Handle bar click
   const onBarClick = event => {
      const chart = chartRef.current;
      if (!chart) return;
      const points = chart.getElementsAtEventForMode(
         event.nativeEvent,
         'nearest',
         { intersect: true },
         false,
      );
      if (points.length) {
         const idx = points[0].index;
         const feeType = feeLabels[idx];
         navigate(
            `/student/wallet/${feeType.toLowerCase().replace(/ /g, '-')}`,
         );
      }
   };

   return (
      <StudentTemplate>
         <div className='w-full min-h-[87vh] rounded-3xl bg-gradient-to-br from-white/90 via-white/70 to-white/40 backdrop-blur-2xl shadow-xl border border-white/30 flex items-center justify-center'>
            <div className='w-full max-w-[90%] h-auto bg-[#F3E9E9] rounded-2xl flex flex-col items-center justify-start '>
               <div className='Wallet bg-[#8E8E8E] w-full h-[7vh] rounded-tl-lg rounded-tr-lg flex items-center mb-2'>
                  <p className='text-lg sm:text-[1.5vw] font-medium text-white ml-[3vw]'>
                     Wallet
                  </p>
               </div>
               <div className='w-full flex flex-col items-center mt-2'>
                  <div className='w-full sm:w-[95%] bg-white/80 mb-[1.5vh] backdrop-blur-lg rounded-2xl shadow-2xl p-2 sm:p-10 border border-gray-200 transition hover:shadow-2xl'>
                     <h2 className='text-xl sm:text-3xl font-bold text-gray-800 mb-2 text-center tracking-tight'>
                        Student Fee Overview
                     </h2>
                     <p className='text-sm sm:text-base text-gray-500 text-center mb-6'>
                        Click on any bar to view details for that fee
                        type.
                     </p>
                     <div
                        className='bg-gradient-to-r from-[#e0f7fa] via-[#f3e9e9] to-[#f3e9e9] rounded-xl p-2 sm:p-6 mb-6'
                        style={{ minHeight: 250, height: '40vh' }}
                     >
                        <Bar
                           ref={chartRef}
                           data={data}
                           options={options}
                           onClick={onBarClick}
                           style={{
                              width: '100%',
                              height: '100%',
                              cursor: 'pointer',
                           }}
                        />
                     </div>
                     <hr className='my-6 border-gray-300' />
                     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-2'>
                        {feeLabels.map((label, idx) => (
                           <div
                              key={label}
                              className='flex flex-col items-center group transition hover:scale-110 duration-200 cursor-pointer'
                           >
                              <span
                                 className='w-6 h-6 sm:w-8 sm:h-8 rounded-full mb-2 border-2 border-white shadow'
                                 style={{
                                    background: barColors[idx],
                                 }}
                              ></span>
                              <span className='text-xs sm:text-sm text-gray-600 font-medium group-hover:text-gray-900 text-center'>
                                 {label}
                              </span>
                              <span className='text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-green-600'>
                                 ₹{amounts[idx]}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </StudentTemplate>
   );
};

export default Wallet;
