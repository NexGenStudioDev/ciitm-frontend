// Example usage of ValidateUniqueIdInput component
import { useState } from 'react';
import ValidateUniqueIdInput from './ValidateUniqueIdInput';

const ValidateUniqueIdInputExample = () => {
   const [isValidStudentId, setIsValidStudentId] = useState(false);
   const [submissionStatus, setSubmissionStatus] = useState('');

   const handleValidationStatus = (isValid) => {
      setIsValidStudentId(isValid);
      console.log('Student ID validation status:', isValid);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (isValidStudentId) {
         setSubmissionStatus('✅ Form submitted successfully!');
      } else {
         setSubmissionStatus('❌ Please enter a valid Student ID before submitting.');
      }
   };

   return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold mb-6 text-gray-800">Student ID Validation Example</h2>
         
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID *
               </label>
               <ValidateUniqueIdInput
                  getValidationStatus={handleValidationStatus}
                  placeholder="Enter Student ID (e.g., STU123)"
                  required
                  minLength={3}
                  maxLength={20}
                  width="100%"
                  height="48px"
                  className="mb-2"
               />
            </div>

            <button
               type="submit"
               disabled={!isValidStudentId}
               className={`
                  w-full py-2 px-4 rounded-lg font-medium transition-all duration-200
                  ${isValidStudentId 
                     ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
               `}
            >
               Submit Form
            </button>

            {submissionStatus && (
               <div className={`text-sm p-3 rounded-lg ${
                  submissionStatus.includes('✅') 
                     ? 'bg-green-100 text-green-800' 
                     : 'bg-red-100 text-red-800'
               }`}>
                  {submissionStatus}
               </div>
            )}
         </form>

         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Component Status:</h3>
            <p className="text-sm text-gray-600">
               Valid Student ID: <span className={isValidStudentId ? 'text-green-600' : 'text-red-600'}>
                  {isValidStudentId ? 'Yes' : 'No'}
               </span>
            </p>
         </div>
      </div>
   );
};

export default ValidateUniqueIdInputExample;

/*
USAGE EXAMPLES:

// Basic usage
<ValidateUniqueIdInput
   getValidationStatus={(isValid) => setIsValidStudentId(isValid)}
   placeholder="Enter Student ID"
/>

// With custom styling
<ValidateUniqueIdInput
   getValidationStatus={handleValidation}
   placeholder="Student ID"
   width="300px"
   height="50px"
   className="custom-input-class"
   style={{ borderRadius: '12px' }}
/>

// With validation constraints
<ValidateUniqueIdInput
   getValidationStatus={handleValidation}
   placeholder="Enter Student ID"
   required
   minLength={5}
   maxLength={15}
   readOnly={false}
   disabled={false}
/>

API ENDPOINT EXPECTED:
GET /api/students/{uniqueId}

Success Response (200):
{
   "student": {
      "id": "STU123",
      "name": "John Doe",
      "email": "john@example.com"
   }
}

Error Response (404):
{
   "error": "Student not found"
}
*/
