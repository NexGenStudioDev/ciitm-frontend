import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying payment...');

  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) {
        setStatus('Invalid order ID.');
        return;
      }
      try {
        const res = await axios.get(`/api/v1/Student/verifyPayment?order_id=${orderId}`);
        const data = res?.data?.data;
        console.log('Verification data:', data);
        if (data?.fee_status === 'Completed') {
          setStatus('Student Fee Paid Success! ✅');
        }
      } catch (err) {
        console.log('Verification error:', err);
        setStatus(err.response.data.message || err.message || 'Verification failed.');
      }
    };

    verifyPayment();
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-[#FAFAFA]">
      {/* Success Logo */}
      <div className="mb-4">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#22c55e" />
          <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-4">
        {status}
      </p>
      {orderId && (
        <p className="mb-6 text-sm text-gray-500">Order ID: <span className="font-semibold">{orderId}</span></p>
      )}

      <button
        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition"
        onClick={() => navigate('/payment')}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Success;