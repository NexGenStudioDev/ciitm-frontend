import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[80%] max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-red-600 text-lg font-semibold">Error</h2>
          <button
            onClick={onClose}
            className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" fillRule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clipRule="evenodd"/></svg>
          </button>
        </div>
        <p className="text-red-600 mt-4">{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
