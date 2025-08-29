import React from 'react'
import StudentTemplate from '../../components/Templates/Admin/StudentTemplate'
import { Link } from 'react-router-dom';

const feeRecords = [
  {
    date: '2025-08-29',
    method: 'UPI',
    amount: '₹2500',
    status: 'Paid',
    action: 'View'
  },
  {
    date: '2025-07-15',
    method: 'Card',
    amount: '₹1500',
    status: 'Paid',
    action: 'View'
  },
  // Add more records or fetch from API
];

const FeeView = () => {
  return (
    <StudentTemplate>
      <div className="w-full h-[88vh] bg-gradient-to-br from-white via-gray-100 to-white rounded-xl shadow-2xl border border-gray-300 flex flex-col">
        {/* Sticky Table Header */}
        <div className="fee_view_Title sticky top-0 z-10 bg-gray-100 w-full border-b border-gray-300 flex items-center justify-between px-2 sm:px-6 py-3 font-semibold text-gray-700 rounded-t-xl shadow">
          <div className="w-1/5 text-center border-r border-gray-300">Payment Date</div>
          <div className="w-1/5 text-center border-r border-gray-300">Amount Paid</div>
          <div className="w-1/5 text-center border-r border-gray-300">Payment Method</div>
          <div className="w-1/5 text-center border-r border-gray-300">Status</div>
          <div className="w-1/5 text-center">Action</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {feeRecords.map((rec, idx) => (
            <div
              key={idx}
              className={`w-full flex items-center justify-between px-2 sm:px-6 py-4 border-b border-gray-200 transition ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-blue-50`}
            >
              <div className="w-1/5 text-center border-r border-gray-200 text-sm sm:text-base">{rec.date}</div>
              <div className="w-1/5 text-center border-r border-gray-200 text-sm sm:text-base">{rec.amount}</div>
              <div className="w-1/5 text-center border-r border-gray-200 text-sm sm:text-base">{rec.method}</div>
              <div className={`w-1/5 text-center border-r border-gray-200 font-bold text-sm sm:text-base ${rec.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{rec.status}</div>
              <div className="w-1/5 text-center">
                <button className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <Link to={`/student/fee/view/${idx + 1}`}>{rec.action}</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-[9vh] bg-gray-100 border-t border-gray-300 rounded-b-xl"></div>
      </div>
    </StudentTemplate>
  )
}

export default FeeView