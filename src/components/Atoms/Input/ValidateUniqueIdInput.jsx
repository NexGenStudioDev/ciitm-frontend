import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ValidateUniqueIdInput = ({
   getValidationStatus,
   placeholder = 'Enter Student ID',
   readOnly = false,
   disabled = false,
   getStudentId,
   required = false,
   minLength = 1,
   maxLength = 50,
   width = '100%',
   height = '48px',
   style = {},
   className = '',
}) => {
   const [inputValue, setInputValue] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [validationStatus, setValidationStatus] = useState(null); // null, true, false
   const [statusMessage, setStatusMessage] = useState('');
   const debounceRef = useRef(null);
   const abortControllerRef = useRef(null); // For cancelling requests

   // Debounce delay in milliseconds
   const DEBOUNCE_DELAY = 500;

   // Cleanup debounce and abort pending requests on unmount
   useEffect(() => {
      return () => {
         if (debounceRef.current) {
            clearTimeout(debounceRef.current);
         }
         const abortController = abortControllerRef.current;
         if (abortController) {
            abortController.abort('Component unmounted');
         }
      };
   }, []);

   // Handle input change
   const handleInputChange = e => {
      const value = e.target.value;
      setInputValue(value);
      getStudentId(value.trim()); // Update parent component with current input value

      // Clear previous debounce and abort previous request
      if (debounceRef.current) {
         clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
         abortControllerRef.current.abort('New request initiated');
      }

      // Reset status when user types
      setValidationStatus(null);
      setStatusMessage('');
      getValidationStatus(false, '');

      // Don't validate empty input
      if (!value.trim()) {
         return;
      }

      // Check length constraints
      if (value.length < minLength || value.length > maxLength) {
         setValidationStatus(false);
         setStatusMessage(
            `ID must be between ${minLength} and ${maxLength} characters`,
         );
         getValidationStatus(false, '');
         return;
      }

      // Set debounced validation
      debounceRef.current = setTimeout(() => {
         validateStudentId(value.trim());
      }, DEBOUNCE_DELAY);
   };

   // Validate student ID against API
   const validateStudentId = async uniqueId => {
      // Guard clause: Don't validate empty or invalid input
      if (!uniqueId || !uniqueId.trim()) {
         return;
      }

      setIsLoading(true);
      setStatusMessage('Checking...');

      // Create new AbortController for this request
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
         const { data } = await axios.get(
            `/api/v1/Student/validate/${uniqueId}`,
            {
               signal: controller.signal,
            },
         );

         console.log('API Response:', data);
         if (data?.success && data?.data?.isValidated) {
            // Student found - valid ID
            setValidationStatus(true);
            setStatusMessage('Valid Student ID');
            getValidationStatus(true, uniqueId);
         } else {
            // Student not found - invalid ID
            setValidationStatus(false);
            setStatusMessage('Student ID not found');
            getValidationStatus(false, '');
         }
      } catch (error) {
         // Check if request was cancelled
         if (
            error.name === 'AbortError' ||
            error.message === 'Request cancelled' ||
            axios.isCancel?.(error)
         ) {
            // Request was cancelled, do nothing to prevent setting state on cancelled requests
            console.log('Request cancelled:', error.message);
            return;
         }

         console.error('Error validating student ID:', error);
         setValidationStatus(false);
         setStatusMessage('Error validating ID. Please try again.');
         getValidationStatus(false);
      } finally {
         // Only update loading state if request wasn't cancelled
         if (!controller.signal.aborted) {
            setIsLoading(false);
         }
      }
   };

   // Determine status message color
   const getStatusColor = () => {
      if (isLoading) return 'text-blue-500';
      if (validationStatus === true) return 'text-green-500';
      if (validationStatus === false) return 'text-red-500';
      return 'text-gray-500';
   };

   // Determine input border color based on validation status
   const getBorderColor = () => {
      if (isLoading) return 'border-blue-400 focus:border-blue-500';
      if (validationStatus === true)
         return 'border-green-400 focus:border-green-500';
      if (validationStatus === false)
         return 'border-red-400 focus:border-red-500';
      return 'border-gray-300 focus:border-blue-500';
   };

   return (
      <div className='w-full' style={{ width, ...style }}>
         {/* Status Message */}
         {statusMessage && (
            <div
               className={`text-sm mb-2 flex items-center gap-1 ${getStatusColor()}`}
            >
               {isLoading && (
                  <div className='animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full'></div>
               )}
               <span>{statusMessage}</span>
            </div>
         )}

         {/* Input Field */}
         <div className='relative'>
            <input
               type='text'
               value={inputValue}
               onChange={handleInputChange}
               placeholder={placeholder}
               readOnly={readOnly}
               disabled={disabled || isLoading}
               required={required}
               minLength={minLength}
               maxLength={maxLength}
               className={`
                  w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-opacity-20
                  disabled:cursor-not-allowed
                  ${getBorderColor()}
                  ${validationStatus === true ? 'focus:ring-green-200' : ''}
                  ${validationStatus === false ? 'focus:ring-red-200' : ''}
                  ${isLoading ? 'focus:ring-blue-200' : ''}
                  ${className || 'bg-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100'}
               `}
               style={{ height }}
            />

            {/* Loading indicator inside input */}
            {isLoading && (
               <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <div className='animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full'></div>
               </div>
            )}

            {/* Success/Error icon */}
            {!isLoading && validationStatus !== null && (
               <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  {validationStatus ? (
                     <div className='text-green-500 text-xl'>✓</div>
                  ) : (
                     <div className='text-red-500 text-xl'>✗</div>
                  )}
               </div>
            )}
         </div>

         {/* Character count (optional) */}
         {inputValue && (
            <div className='text-xs text-gray-400 mt-1 text-right'>
               {inputValue.length}/{maxLength}
            </div>
         )}
      </div>
   );
};

ValidateUniqueIdInput.propTypes = {
   getValidationStatus: PropTypes.func.isRequired,
   getStudentId: PropTypes.func,
   placeholder: PropTypes.string,
   readOnly: PropTypes.bool,
   disabled: PropTypes.bool,
   required: PropTypes.bool,
   minLength: PropTypes.number,
   maxLength: PropTypes.number,
   width: PropTypes.string,
   height: PropTypes.string,
   style: PropTypes.object,
   className: PropTypes.string,
};

export default ValidateUniqueIdInput;
