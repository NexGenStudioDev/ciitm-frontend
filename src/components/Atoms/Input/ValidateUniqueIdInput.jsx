import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ValidateUniqueIdInput = ({
   getValidationStatus,
   placeholder = 'Enter Student ID',
   readOnly = false,
   disabled = false,
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

   // Debounce delay in milliseconds
   const DEBOUNCE_DELAY = 500;

   // Cleanup debounce on unmount
   useEffect(() => {
      return () => {
         if (debounceRef.current) {
            clearTimeout(debounceRef.current);
         }
      };
   }, []);

   // Handle input change
   const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      // Clear previous debounce
      if (debounceRef.current) {
         clearTimeout(debounceRef.current);
      }

      // Reset status when user types
      setValidationStatus(null);
      setStatusMessage('');
      getValidationStatus(false);

      // Don't validate empty input
      if (!value.trim()) {
         return;
      }

      // Check length constraints
      if (value.length < minLength || value.length > maxLength) {
         setValidationStatus(false);
         setStatusMessage(`ID must be between ${minLength} and ${maxLength} characters`);
         getValidationStatus(false);
         return;
      }

      // Set debounced validation
      debounceRef.current = setTimeout(() => {
         validateStudentId(value.trim());
      }, DEBOUNCE_DELAY);
   };

   // Validate student ID against API
   const validateStudentId = async (uniqueId) => {
      setIsLoading(true);
      setStatusMessage('Checking...');

      try {
         // TODO: Replace with actual API call when backend is ready
         // Simulating API response for now
        /*  const mockResponse = await new Promise((resolve) => {
            setTimeout(() => {
               // Mock validation logic - for demo purposes
               const validIds = ['STU12345', 'STU123', 'STUDENT001', 'ST001'];
               const isValid = validIds.includes(uniqueId.toUpperCase()) && uniqueId.length >= 3;
               
               resolve({
                  success: true,
                  isvalidate: isValid,
                  message: isValid ? "Student ID is valid" : "Student ID not found",
                  data: isValid ? { uniqueId: uniqueId.toUpperCase() } : null
               });
            }, 800); // Simulate network delay
         }); */

         // Real API call (commented out until backend is ready)
         const {data} = await axios.get(`/api/v1/Student/validate/${uniqueId}`);
         console.log('API Response:', data);
         if (data?.success && data?.data?.isValid) {
            // Student found - valid ID
            setValidationStatus(true);
            setStatusMessage('✅ Valid Student ID');
            getValidationStatus(true);
         } else {
            // Student not found - invalid ID
            setValidationStatus(false);
            setStatusMessage('❌ Student ID not found');
            getValidationStatus(false);
         }
      } catch (error) {
         console.error('Error validating student ID:', error);
         setValidationStatus(false);
         setStatusMessage('❌ Error validating ID. Please try again.');
         getValidationStatus(false);
      } finally {
         setIsLoading(false);
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
      if (validationStatus === true) return 'border-green-400 focus:border-green-500';
      if (validationStatus === false) return 'border-red-400 focus:border-red-500';
      return 'border-gray-300 focus:border-blue-500';
   };

   return (
      <div className="w-full" style={{ width, ...style }}>
         {/* Status Message */}
         {statusMessage && (
            <div className={`text-sm mb-2 flex items-center gap-1 ${getStatusColor()}`}>
               {isLoading && (
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
               )}
               <span>{statusMessage}</span>
            </div>
         )}

         {/* Input Field */}
         <div className="relative">
            <input
               type="text"
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
                  bg-white text-gray-900 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-opacity-20
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  ${getBorderColor()}
                  ${validationStatus === true ? 'focus:ring-green-200' : ''}
                  ${validationStatus === false ? 'focus:ring-red-200' : ''}
                  ${isLoading ? 'focus:ring-blue-200' : ''}
                  ${className}
               `}
               style={{ height }}
            />

            {/* Loading indicator inside input */}
            {isLoading && (
               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
               </div>
            )}

            {/* Success/Error icon */}
            {!isLoading && validationStatus !== null && (
               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validationStatus ? (
                     <div className="text-green-500 text-xl">✓</div>
                  ) : (
                     <div className="text-red-500 text-xl">✗</div>
                  )}
               </div>
            )}
         </div>

         {/* Character count (optional) */}
         {inputValue && (
            <div className="text-xs text-gray-400 mt-1 text-right">
               {inputValue.length}/{maxLength}
            </div>
         )}
      </div>
   );
};

ValidateUniqueIdInput.propTypes = {
   getValidationStatus: PropTypes.func.isRequired,
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
