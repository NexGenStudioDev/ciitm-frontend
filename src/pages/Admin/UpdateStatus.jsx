import { useState } from 'react';
import ValidateUniqueIdInput from '../../components/Atoms/Input/ValidateUniqueIdInput';
import { Helmet } from 'react-helmet-async';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';

const UpdateStatus = () => {
   const [isValidStudentId, setIsValidStudentId] = useState(false);
   const [submissionStatus, setSubmissionStatus] = useState('');
   const [selectedStatus, setSelectedStatus] = useState('');
   const [loading, setLoading] = useState(false);
   const [studentData, setStudentData] = useState(null);
   const [validatedUniqueId, setValidatedUniqueId] = useState('');

   const handleValidationStatus = async (isValid, uniqueId = '') => {
      setIsValidStudentId(isValid);
      setValidatedUniqueId(uniqueId);
      
      if (!isValid) {
         setSubmissionStatus('');
         setStudentData(null);
         setSelectedStatus('');
         return;
      }

      // Fetch student data when validation is successful
      try {
         setLoading(true);
         setSubmissionStatus('🔍 Fetching student information...');
         
         // TODO: Replace with actual API call when backend is ready
         // const response = await axios.get(`/api/v1/status/find?uniqueId=${uniqueId}`);
         
         // Mock student data for now
         const mockStudentData = {
            uniqueId: uniqueId,
            name: `Student ${uniqueId}`,
            email: `${uniqueId.toLowerCase()}@student.ciitm.edu`,
            applicationStatus: 'Pending',
            enrollmentDate: '2024-01-15',
            course: 'Computer Science'
         };
         
         setStudentData(mockStudentData);
         setSubmissionStatus('✅ Student information loaded successfully');
      } catch (error) {
         console.error('Error fetching student data:', error);
         setSubmissionStatus('❌ Failed to fetch student information');
         setStudentData(null);
      } finally {
         setLoading(false);
      }
   };

   const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!isValidStudentId || !validatedUniqueId) {
         setSubmissionStatus('❌ Please enter a valid Student ID before submitting.');
         return;
      }

      if (!selectedStatus) {
         setSubmissionStatus('❌ Please select a status to update.');
         return;
      }

      setLoading(true);
      setSubmissionStatus('🔄 Updating student application status...');

      try {
         // TODO: Replace with actual API call when backend is ready
         // const response = await axios.put(`/api/v1/status/update/${validatedUniqueId}`, {
         //    applicationStatus: selectedStatus
         // });
         
         // Simulate API call for now
         await new Promise(resolve => setTimeout(resolve, 1500));
         
         // Update local student data
         if (studentData) {
            setStudentData({
               ...studentData,
               applicationStatus: selectedStatus
            });
         }
         
         setSubmissionStatus(`✅ Student application status successfully updated to "${selectedStatus}"!`);
         setSelectedStatus('');
      } catch (error) {
         console.error('Error updating status:', error);
         setSubmissionStatus('❌ Failed to update student status. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   // Status options - excluding 'Pending' as per requirements
   const statusOptions = [
      { value: '', label: 'Select New Status' },
      { value: 'Verified', label: 'Verified' },
      { value: 'Approved', label: 'Approved' },
      { value: 'Rejected', label: 'Rejected' },
   ];

   return (
      <>
         <Helmet>
            <title>Update Student Application Status - CIITM Admin</title>
            <meta
               name='description'
               content="Update student application status - Manage student enrollment and verification efficiently."
            />
         </Helmet>
         <AdminTemplate pageName={'Update Student Status'}>         
            <div className="w-[94%] max-[553px]:w-[87%] py-8 px-4">
               <div className="max-w-4xl mx-auto">
                  {/* Page Header */}
                  <div className="mb-8 bg-[#090909] rounded-lg p-6">
                     <h1 className="text-3xl font-bold text-white mb-2">Update Student Application Status</h1>
                     <p className="text-gray-300">
                        Validate student ID and update their application status in the system
                     </p>
                  </div>

                  {/* Student ID Validation Card */}
                  <div className="bg-[#1C1C1C] rounded-lg shadow-lg p-8 mb-6 border border-[#2C2C2C]">
                     <h2 className="text-xl font-semibold text-white mb-4">Student ID Validation</h2>
                     <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                           Student Unique ID *
                        </label>
                        <ValidateUniqueIdInput
                           getValidationStatus={handleValidationStatus}
                           placeholder="Enter Student Unique ID (e.g., STU123)"
                           required
                           minLength={3}
                           maxLength={20}
                           width="100%"
                           height="52px"
                           className="text-lg"
                        />
                        <p className="text-sm text-gray-400 mt-2">
                           Enter the unique student ID to validate and fetch student information
                        </p>
                     </div>
                  </div>

                  {/* Student Information Card */}
                  {studentData && (
                     <div className="bg-[#1C1C1C] rounded-lg shadow-lg p-8 mb-6 border border-[#2C2C2C]">
                        <h2 className="text-xl font-semibold text-white mb-4">Student Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-medium text-gray-400">Name</label>
                              <p className="text-lg font-semibold text-white">{studentData.name}</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-400">Email</label>
                              <p className="text-lg text-white">{studentData.email}</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-400">Unique ID</label>
                              <p className="text-lg text-white">{studentData.uniqueId}</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-400">Course</label>
                              <p className="text-lg text-white">{studentData.course}</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-400">Current Status</label>
                              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                 studentData.applicationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                 studentData.applicationStatus === 'Verified' ? 'bg-blue-100 text-blue-800' :
                                 studentData.applicationStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                                 studentData.applicationStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                                 'bg-gray-100 text-gray-800'
                              }`}>
                                 {studentData.applicationStatus}
                              </span>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-400">Enrollment Date</label>
                              <p className="text-lg text-white">{new Date(studentData.enrollmentDate).toLocaleDateString()}</p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Status Update Form */}
                  {studentData && (
                     <div className="bg-[#1C1C1C] rounded-lg shadow-lg p-8 border border-[#2C2C2C]">
                        <h2 className="text-xl font-semibold text-white mb-4">Update Application Status</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                           {/* Status Selection */}
                           <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-3">
                                 New Application Status *
                              </label>
                              <select
                                 value={selectedStatus}
                                 onChange={handleStatusChange}
                                 disabled={loading}
                                 className={`
                                    w-full px-4 py-3 text-lg rounded-lg border-2 transition-all duration-200
                                    bg-[#090909] text-white focus:outline-none focus:ring-2 focus:ring-blue-400
                                    ${loading
                                       ? 'border-[#2C2C2C] bg-[#0F0F0F] cursor-not-allowed' 
                                       : 'border-[#2C2C2C] focus:border-blue-500 hover:border-gray-500'
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
                              <p className="text-sm text-gray-400 mt-2">
                                 Select the new application status for the student (Note: Cannot revert to Pending)
                              </p>
                           </div>

                           {/* Submit Button */}
                           <div className="pt-4">
                              <button
                                 type="submit"
                                 disabled={!selectedStatus || loading}
                                 className={`
                                    w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200
                                    ${selectedStatus && !loading
                                       ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md hover:shadow-lg' 
                                       : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }
                                 `}
                              >
                                 {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                       <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                       Updating Status...
                                    </div>
                                 ) : (
                                    'Update Application Status'
                                 )}
                              </button>
                           </div>

                           {/* Status Message */}
                           {submissionStatus && (
                              <div className={`text-sm p-4 rounded-lg border ${
                                 submissionStatus.includes('✅') 
                                    ? 'bg-green-900/30 text-green-300 border-green-600' 
                                    : submissionStatus.includes('🔄') || submissionStatus.includes('🔍')
                                    ? 'bg-blue-900/30 text-blue-300 border-blue-600'
                                    : 'bg-red-900/30 text-red-300 border-red-600'
                              }`}>
                                 {submissionStatus}
                              </div>
                           )}
                        </form>
                     </div>
                  )}
               </div>
            </div>
         </AdminTemplate>
      </>            
   );
};

export default UpdateStatus;