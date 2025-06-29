import { useState } from 'react';
import ValidateUniqueIdInput from '../../components/Atoms/Input/ValidateUniqueIdInput';

const UpdateStatus = () => {
   const [isValidStudentId, setIsValidStudentId] = useState(false);
   const [submissionStatus, setSubmissionStatus] = useState('');
   const [selectedStatus, setSelectedStatus] = useState('');
   const [loading, setLoading] = useState(false);

   const handleValidationStatus = (isValid) => {
      setIsValidStudentId(isValid);
      if (!isValid) {
         setSubmissionStatus('');
      }
   };

   const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!isValidStudentId) {
         setSubmissionStatus('❌ Please enter a valid Student ID before submitting.');
         return;
      }

      if (!selectedStatus) {
         setSubmissionStatus('❌ Please select a status to update.');
         return;
      }

      setLoading(true);
      setSubmissionStatus('🔄 Updating student status...');

      try {
         // Simulate API call for status update
         await new Promise(resolve => setTimeout(resolve, 1500));
         
         setSubmissionStatus(`✅ Student status successfully updated to "${selectedStatus}"!`);
         setSelectedStatus('');
      } catch {
         setSubmissionStatus('❌ Failed to update student status. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   const statusOptions = [
      { value: '', label: 'Select Status' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'suspended', label: 'Suspended' },
      { value: 'graduated', label: 'Graduated' },
      { value: 'transferred', label: 'Transferred' },
   ];

   return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
         <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Student Status</h1>
               <p className="text-gray-600">
                  Update the enrollment status of students in the system
               </p>
            </div>

            {/* Main Form Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student ID Input Section */}
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Student ID *
                     </label>
                     <ValidateUniqueIdInput
                        getValidationStatus={handleValidationStatus}
                        placeholder="Enter Student ID (e.g., STU123)"
                        required
                        minLength={3}
                        maxLength={20}
                        width="100%"
                        height="52px"
                        className="text-lg"
                     />
                     <p className="text-sm text-gray-500 mt-2">
                        Enter the unique student ID to update their status
                     </p>
                  </div>

                  {/* Status Selection */}
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-3">
                        New Status *
                     </label>
                     <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        disabled={!isValidStudentId || loading}
                        className={`
                           w-full px-4 py-3 text-lg rounded-lg border-2 transition-all duration-200
                           bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200
                           ${!isValidStudentId || loading
                              ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
                              : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                           }
                        `}
                        required
                     >
                        {statusOptions.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                     <p className="text-sm text-gray-500 mt-2">
                        Select the new status for the student
                     </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                     <button
                        type="submit"
                        disabled={!isValidStudentId || !selectedStatus || loading}
                        className={`
                           w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200
                           ${isValidStudentId && selectedStatus && !loading
                              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md hover:shadow-lg' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                           }
                        `}
                     >
                        {loading ? (
                           <div className="flex items-center justify-center gap-2">
                              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                              Updating Status...
                           </div>
                        ) : (
                           'Update Student Status'
                        )}
                     </button>
                  </div>

                  {/* Status Message */}
                  {submissionStatus && (
                     <div className={`text-sm p-4 rounded-lg border ${
                        submissionStatus.includes('✅') 
                           ? 'bg-green-50 text-green-800 border-green-200' 
                           : submissionStatus.includes('🔄')
                           ? 'bg-blue-50 text-blue-800 border-blue-200'
                           : 'bg-red-50 text-red-800 border-red-200'
                     }`}>
                        {submissionStatus}
                     </div>
                  )}
               </form>
            </div>

            {/* Component Status Info Card */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Validation Status</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                     <p className="text-sm text-gray-600 mb-1">Student ID Valid:</p>
                     <p className={`font-semibold ${isValidStudentId ? 'text-green-600' : 'text-red-600'}`}>
                        {isValidStudentId ? '✅ Yes' : '❌ No'}
                     </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                     <p className="text-sm text-gray-600 mb-1">Form Ready:</p>
                     <p className={`font-semibold ${isValidStudentId && selectedStatus ? 'text-green-600' : 'text-orange-600'}`}>
                        {isValidStudentId && selectedStatus ? '✅ Ready to Submit' : '⏳ Waiting for Input'}
                     </p>
                  </div>
               </div>
            </div>

            {/* Instructions Card */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
               <h3 className="text-lg font-semibold text-blue-800 mb-3">Instructions</h3>
               <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                     <span className="text-blue-500 mt-1">•</span>
                     Enter a valid Student ID in the first field
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-blue-500 mt-1">•</span>
                     Wait for the system to validate the ID (green checkmark appears)
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-blue-500 mt-1">•</span>
                     Select the new status from the dropdown menu
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-blue-500 mt-1">•</span>
                     Click &quot;Update Student Status&quot; to save changes
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default UpdateStatus;