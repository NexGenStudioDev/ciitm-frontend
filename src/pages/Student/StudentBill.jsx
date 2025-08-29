import React, { useState } from 'react'
import StudentTemplate from '../../components/Templates/Admin/StudentTemplate'

const mockBillData = {
  studentName: 'Rahul Kumar',
  date: '2025-08-29',
  billNo: 'BILL20250829',
  studentId: 'STU12345',
  courseName: 'B.Tech CSE',
  paymentMode: 'UPI',
  semester: '5th',
  paymentStatus: 'Paid',
  description: 'Semester Fee',
  amount: 15000,
};

const StudentBill = () => {
  const [billData] = useState(mockBillData);

  return (
    <StudentTemplate>
      <div className="w-full flex items-center justify-center bg-gray-100 ">
        <div className="w-full h-[87vh] bg-white rounded-xl border border-blue-400  print:border-[1px] print:border-black print:shadow-none print:bg-white print:m-0 p-4 print:p-0">
          {/* Header */}
          <div className="w-full flex flex-col items-center justify-center bg-blue-700 text-white rounded-t-xl py-4 print:bg-white print:text-black print:rounded-none print:py-4 print:border-b print:border-black border-b border-blue-400">
            <h2 className="text-xl font-extrabold tracking-tight mb-1 print:mb-0">INSTITUTE BILLING INVOICE</h2>
            <span className="text-lg font-semibold tracking-wide opacity-90 print:text-black">CIITM DHANBAD</span>
          </div>
          {/* Institute Info */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between py-5 px-8 border-b border-blue-100 print:border-b print:border-black bg-blue-50 print:bg-white">
            <div>
              <p className="text-gray-700 print:text-black font-semibold">Near XYZ Road, Dhanbad</p>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <p className="text-gray-700 print:text-black">+91-XXXXXXXXXX</p>
              <p className="text-gray-700 print:text-black">✉️ info@ciitmdhanbad.ac.in</p>
            </div>
          </div>
          {/* Bill Info */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border-b border-blue-100 print:border-b print:border-black">
            <div className="px-6 py-5 border-b sm:border-b-0 md:border-r border-blue-100 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Date</p>
              <p className="font-semibold text-gray-800 print:text-black">{billData.date}</p>
            </div>
            <div className="px-6 py-5 border-b sm:border-b-0 md:border-r border-blue-100 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Bill No.</p>
              <p className="font-semibold text-gray-800 print:text-black">{billData.billNo}</p>
            </div>
            <div className="px-6 py-5 border-b sm:border-b-0 md:border-r border-blue-100 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Student Name</p>
              <p className="font-semibold text-gray-800 print:text-black">{billData.studentName}</p>
            </div>
            <div className="px-6 py-5 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Student ID</p>
              <p className="font-semibold text-gray-800 print:text-black">{billData.studentId}</p>
            </div>
            <div className="px-6 py-5 border-t md:border-t-0 md:border-r border-blue-100 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Course Name</p>
              <p className="font-semibold text-gray-800 print:text-black">{billData.courseName}</p>
            </div>
            <div className="px-6 py-5 border-t md:border-t-0 md:border-r border-blue-100 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Semester</p>
              <p className="font-semibold text-gray-800 print:text-black">{billData.semester}</p>
            </div>
            <div className="px-6 py-5 border-t md:border-t-0 md:border-r border-blue-100 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Payment Mode</p>
              <p className="font-semibold text-gray-800 print:text-black">{billData.paymentMode}</p>
            </div>
            <div className="px-6 py-5 border-t md:border-t-0 print:border-black">
              <p className="text-gray-500 print:text-black font-medium">Payment Status</p>
              <p className={`font-bold ${billData.paymentStatus === 'Paid' ? 'text-green-600 print:text-black' : 'text-red-600 print:text-black'}`}>{billData.paymentStatus}</p>
            </div>
          </div>
          {/* Description and Amount */}
          <div className="w-full flex items-center justify-between px-8 py-5 border-b border-blue-100 print:border-black bg-blue-50 print:bg-white">
            <span className="text-gray-500 print:text-black font-semibold">Description</span>
            <span className="text-gray-500 print:text-black font-semibold">Amount</span>
          </div>
          <div className="w-full flex items-center justify-between px-8 py-5 border-b border-blue-100 print:border-black">
            <span className="font-semibold text-gray-800 print:text-black">{billData.description}</span>
            <span className="font-bold text-blue-700 print:text-black text-xl">₹ {billData.amount}</span>
          </div>
          {/* Total */}
          <div className="w-full flex items-center justify-end px-8 py-7 bg-blue-50 print:bg-white border-t border-blue-100 print:border-black rounded-b-xl print:rounded-none">
            <span className="mr-8 text-gray-800 print:text-black font-semibold text-xl">Total</span>
            <span className="font-bold text-blue-700 print:text-black text-xl">₹ {billData.amount}</span>
          </div>
          {/* Print Button */}
          <div className="w-full flex items-center justify-center mb-[3vh] print:hidden">
            <button
              className="bg-blue-700 text-white px-10 py-3 rounded-md mt-8 print:hidden hover:bg-blue-800 transition text-lg font-semibold shadow"
              onClick={() => window.print()}
            >
              Print Bill
            </button>
          </div>
        </div>
      </div>
    </StudentTemplate>
  )
}

export default StudentBill;