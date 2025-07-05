import { useState } from 'react';
import ValidateUniqueIdInput from '../../components/Atoms/Input/ValidateUniqueIdInput';
import { Helmet } from 'react-helmet-async';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateStatus = () => {
   const [isValidStudentId, setIsValidStudentId] = useState(false);
   const [selectedStatus, setSelectedStatus] = useState('');
   const [reviewMessage, setReviewMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [currentStatus, setCurrentStatus] = useState('');
   const [validatedUniqueId, setValidatedUniqueId] = useState('');

   const handleValidationStatus = async (isValid, uniqueId = '') => {
      setIsValidStudentId(isValid);
      setValidatedUniqueId(uniqueId);

      if (!isValid) {
         setCurrentStatus('');
         setSelectedStatus('');
         setReviewMessage('');
         return;
      }

      // Fetch student status when validation is successful
      try {
         setLoading(true);
         toast.info('Fetching student status...');

         const { data } = await axios.get(
            `/api/v1/status/find/${uniqueId}`,
         );
         console.log('API Response:', data);

         if (data && data.success) {
            const studentStatus = data.data.applicationStatus;
            setCurrentStatus(studentStatus);
            setSelectedStatus(studentStatus); //pre-select, let admin choose
            toast.success('Student status loaded successfully');
         } else {
            throw new Error(
               data?.message || 'Student status not found',
            );
         }
      } catch (error) {
         console.error('Error fetching student status:', error);
         toast.error(
            'Failed to fetch student status: ' +
               (error.response?.data?.message || error.message),
         );
         setCurrentStatus('');
         setSelectedStatus('');
         setReviewMessage('');
      } finally {
         setLoading(false);
      }
   };

   const handleStatusChange = e => {
      setSelectedStatus(e.target.value);
   };

   const handleReviewChange = e => {
      setReviewMessage(e.target.value);
   };

   const handleSubmit = async e => {
      e.preventDefault();

      if (!isValidStudentId || !validatedUniqueId) {
         toast.error(
            'Please enter a valid Student ID before submitting.',
         );
         return;
      }

      if (!selectedStatus) {
         toast.error('Please select a status to update.');
         return;
      }

      // Prevent updating to the same status
      if (selectedStatus === currentStatus) {
         toast.error(
            'Please select a different status. Current status is already "' +
               currentStatus +
               '".',
         );
         return;
      }

      if (!reviewMessage.trim()) {
         toast.error(
            'Please provide a review message for the student.',
         );
         return;
      }

      setLoading(true);
      toast.info('Updating student application status...');

      try {
         const response = await axios.put(
            `/api/v1/status/update/${validatedUniqueId}`,
            {
               message: reviewMessage.trim(),
               applicationStatus: selectedStatus,
            },
         );
         console.log('API Response:', response.data);

         if (response.data && response.data.success) {
            // Update current status to the new status
            setCurrentStatus(selectedStatus);
            setReviewMessage(''); // Clear review message after successful update
            toast.success(
               `Student application status successfully updated to "${selectedStatus}"!`,
            );
         } else {
            throw new Error(
               response.data?.message || 'Failed to update status',
            );
         }
      } catch (error) {
         console.error('Error updating status:', error);
         toast.error(
            'Failed to update student status: ' +
               (error.response?.data?.message || error.message),
         );
      } finally {
         setLoading(false);
      }
   };

   // Status options - excluding 'Pending' for selection
   const getStatusOptions = () => {
      return [
         { value: '', label: 'Select New Status', disabled: true },
         { value: 'Pending', label: 'Pending', disabled: true }, // Disabled to prevent selection
         { value: 'Verified', label: 'Verified' },
         { value: 'Approved', label: 'Approved' },
         { value: 'Rejected', label: 'Rejected' },
      ];
   };

   return (
      <>
         <Helmet>
            <title>
               Update Student Application Status - CIITM Admin
            </title>
            <meta
               name='description'
               content='Update student application status - Manage student enrollment and verification efficiently.'
            />
         </Helmet>
         <AdminTemplate pageName={'Update Student Status'}>
            {/* Combined Form */}
            <div className='w-[94%] max-[553px]:w-[87%] mb-6'>
               <FormTemplate_Secondary>
                  <div className='bg-[#090909] rounded-tr-xl rounded-tl-xl p-4 w-full text-center'>
                     <h2 className='text-xl font-semibold text-white'>
                        Update Student Application Status
                     </h2>
                  </div>

                  <form
                     onSubmit={handleSubmit}
                     className='w-full flex flex-col items-center justify-center mt-4 px-[2vw] pb-8'
                  >
                     {/* Student ID Validation */}
                     <div className='w-full flex flex-col justify-center mb-6'>
                        <label className='block text-sm font-semibold text-gray-300 mb-3'>
                           Student Unique ID *
                        </label>
                        <ValidateUniqueIdInput
                           getValidationStatus={
                              handleValidationStatus
                           }
                           placeholder='Enter Student Unique ID (e.g., STU123)'
                           required
                           minLength={3}
                           maxLength={20}
                           width='100%'
                           height='52px'
                           className='text-lg bg-[#2B2C2B] text-white'
                        />
                        <p className='text-sm text-gray-400 mt-2'>
                           Enter the unique student ID to validate and
                           fetch student information
                        </p>
                     </div>

                     {/* Current Status Display - Only show when valid student ID */}
                     {isValidStudentId && currentStatus && (
                        <div className='w-full flex item-center gap-6 mb-6'>
                           <label className='block text-gray-300 mb-3 text-lg'>
                              Current Status
                           </label>
                           <div className=''>
                              <span
                                 className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                    currentStatus === 'Pending'
                                       ? 'bg-yellow-900/30 text-yellow-300'
                                       : currentStatus === 'Verified'
                                         ? 'bg-blue-900/30 text-blue-300'
                                         : currentStatus ===
                                             'Approved'
                                           ? 'bg-green-900/30 text-green-300'
                                           : currentStatus ===
                                               'Rejected'
                                             ? 'bg-red-900/30 text-red-300'
                                             : 'bg-gray-900/30 text-gray-300'
                                 }`}
                              >
                                 {currentStatus}
                              </span>
                           </div>
                        </div>
                     )}

                     {/* Status Selection - Only enabled when valid student ID */}
                     <div className='w-full flex flex-col justify-center mb-6'>
                        <label className='block text-white mb-3 text-lg'>
                           New Application Status *
                        </label>
                        <select
                           value={selectedStatus}
                           onChange={handleStatusChange}
                           disabled={!isValidStudentId || loading}
                           className={`
                               p-3 rounded-md bg-[#090909] text-white border border-[#2C2C2C] focus:outline-none
                              ${
                                 !isValidStudentId || loading
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'focus:ring-2 focus:ring-blue-400 focus:border-blue-500'
                              }
                           `}
                           required
                        >
                           {getStatusOptions().map(option => (
                              <option
                                 key={option.value}
                                 value={option.value}
                                 disabled={option.disabled}
                                 className={
                                    option.disabled
                                       ? 'text-gray-500'
                                       : 'text-white'
                                 }
                              >
                                 {option.label}
                              </option>
                           ))}
                        </select>
                        <p className='text-sm text-gray-400 mt-2 ml-2'>
                           {!isValidStudentId
                              ? 'Please validate student ID first to enable status selection'
                              : 'Select the new application status for the student'}
                        </p>
                     </div>

                     {/* Review Message - Only enabled when valid student ID */}
                     <div className='w-full flex flex-col justify-center mb-6'>
                        <label className='block text-white mb-3 text-lg'>
                           Review Message *
                        </label>
                        <textarea
                           value={reviewMessage}
                           onChange={handleReviewChange}
                           disabled={!isValidStudentId || loading}
                           placeholder={
                              !isValidStudentId
                                 ? 'Please validate student ID first to enable review message'
                                 : 'Write your review message here... (e.g., We received your application form and there are some missing documents, please submit these documents on time)'
                           }
                           rows='5'
                           className={`
                              p-3 rounded-md bg-[#090909] text-white border border-[#2C2C2C] focus:outline-none resize-vertical
                              ${
                                 !isValidStudentId || loading
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'focus:ring-2 focus:ring-blue-400 focus:border-blue-500'
                              }
                           `}
                           required
                        />
                        <p className='text-sm text-gray-400 mt-2 ml-2'>
                           {!isValidStudentId
                              ? 'Please validate student ID first to enable review message'
                              : 'Provide feedback or instructions for the student regarding their application'}
                        </p>
                     </div>

                     {/* Submit Button */}
                     <div className='w-full flex justify-center mb-4'>
                        <button
                           type='submit'
                           disabled={
                              !isValidStudentId ||
                              !selectedStatus ||
                              !reviewMessage.trim() ||
                              loading ||
                              selectedStatus === currentStatus
                           }
                           className={`
                              py-3 px-6 rounded-md font-semibold text-lg transition-all duration-200
                              ${
                                 isValidStudentId &&
                                 selectedStatus &&
                                 reviewMessage.trim() &&
                                 !loading &&
                                 selectedStatus !== currentStatus
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }
                           `}
                        >
                           {loading ? (
                              <div className='flex items-center justify-center gap-2'>
                                 <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                                 Updating Status...
                              </div>
                           ) : (
                              'Update Application Status'
                           )}
                        </button>
                     </div>

                     {/* Validation Messages */}
                     {!isValidStudentId && (
                        <div className='w-[95%] text-sm p-4 rounded-md border bg-yellow-900/30 text-yellow-300 border-yellow-600'>
                           Please enter a valid Student Unique ID to
                           enable status update and review message
                           fields.
                        </div>
                     )}
                  </form>
               </FormTemplate_Secondary>
            </div>
         </AdminTemplate>
      </>
   );
};

export default UpdateStatus;
