import React, { useState } from 'react';
import InputField from './InputField';
import Dropdown from './DropDown';

const YourInfo = ({ formData, handleInputChange, errors, showErrors }) => {
  const [activeBox, setActiveBox] = useState(null);

  const getBorderClass = (fieldName) =>
    activeBox === fieldName ? 'border-blue-500' : 'border-gray-300';

  return (
    <div className='sm:grid flex flex-col w-full 2xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4 gap-y-10'>
      {/* First Name */}
      <InputField
        placeholder='First Name'
        type='text'
        required
        name='firstName'
        value={formData.firstName || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('firstName')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('firstName')} rounded-md p-2 ${
          showErrors && errors.includes('First Name') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('First Name') && (
        <p className='text-red-500 text-sm mt-1'>First Name is required</p>
      )}

      {/* Middle Name */}
      <InputField
        placeholder='Middle Name'
        type='text'
        name='middleName'
        value={formData.middleName || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('middleName')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('middleName')} rounded-md p-2 ${
          showErrors && errors.includes('Middle Name') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Middle Name') && (
        <p className='text-red-500 text-sm mt-1'>Middle Name is required</p>
      )}

      {/* Last Name */}
      <InputField
        placeholder='Last Name'
        type='text'
        required
        name='lastName'
        value={formData.lastName || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('lastName')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('lastName')} rounded-md p-2 ${
          showErrors && errors.includes('Last Name') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Last Name') && (
        <p className='text-red-500 text-sm mt-1'>Last Name is required</p>
      )}

      {/* Father's Name */}
      <InputField
        placeholder="Father's Name"
        type='text'
        required
        name='fatherName'
        value={formData.fatherName || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('fatherName')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('fatherName')} rounded-md p-2 ${
          showErrors && errors.includes("Father's Name") ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes("Father's Name") && (
        <p className='text-red-500 text-sm mt-1'>Father's Name is required</p>
      )}

      {/* Mother's Name */}
      <InputField
        placeholder="Mother's Name"
        type='text'
        required
        name='motherName'
        value={formData.motherName || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('motherName')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('motherName')} rounded-md p-2 ${
          showErrors && errors.includes("Mother's Name") ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes("Mother's Name") && (
        <p className='text-red-500 text-sm mt-1'>Mother's Name is required</p>
      )}

      {/* Aadhar Number */}
      <InputField
        placeholder='Aadhar Number'
        type='number'
        required
        name='AadharCardNumber'
        value={formData.AadharCardNumber || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('AadharCardNumber')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('AadharCardNumber')} rounded-md p-2 ${
          showErrors && errors.includes('Aadhar Number') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Aadhar Number') && (
        <p className='text-red-500 text-sm mt-1'>Aadhar Number is required</p>
      )}

      {/* Email */}
      <InputField
        placeholder='Email'
        type='email'
        required
        name='email'
        value={formData.email || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('email')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('email')} rounded-md p-2 ${
          showErrors && errors.includes('Email') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Email') && (
        <p className='text-red-500 text-sm mt-1'>Email is required</p>
      )}

      {/* Contact Number */}
      <InputField
        placeholder='Contact No'
        type='tel'
        required
        name='contactNumber'
        value={formData.contactNumber || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('contactNumber')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('contactNumber')} rounded-md p-2 ${
          showErrors && errors.includes('Contact No') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Contact No') && (
        <p className='text-red-500 text-sm mt-1'>Contact No is required</p>
      )}

      {/* Date of Birth */}
      <InputField
        placeholder='Date of Birth'
        type='date'
        required
        name='dateOfBirth'
        value={formData.dateOfBirth || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('dateOfBirth')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('dateOfBirth')} rounded-md p-2 ${
          showErrors && errors.includes('Date of Birth') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Date of Birth') && (
        <p className='text-red-500 text-sm mt-1'>Date of Birth is required</p>
      )}

      {/* Gender */}
      <Dropdown
        placeholder='Gender'
        name='gender'
        required
        value={formData.gender || ''}
        options={['Male', 'Female', 'Rather not to say']}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('gender')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('gender')} rounded-md p-2 ${
          showErrors && errors.includes('Gender') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Gender') && (
        <p className='text-red-500 text-sm mt-1'>Gender is required</p>
      )}

      {/* Nationality */}
      <Dropdown
        placeholder='Select Nationality'
        name='nationality'
        required
        value={formData.nationality || ''}
        options={[
          'India',
          'Pakistan',
          'Bangladesh',
          'Sri Lanka',
          'Nepal',
          'Bhutan',
          'Maldives',
        ]}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('nationality')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('nationality')} rounded-md p-2 ${
          showErrors && errors.includes('Select Nationality') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Select Nationality') && (
        <p className='text-red-500 text-sm mt-1'>Nationality is required</p>
      )}

      {/* Street */}
      <InputField
        placeholder='Street'
        type='text'
        required
        name='street'
        value={formData.street || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('street')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('street')} rounded-md p-2 ${
          showErrors && errors.includes('Street') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Street') && (
        <p className='text-red-500 text-sm mt-1'>Street is required</p>
      )}

      {/* City */}
      <InputField
        placeholder='City'
        type='text'
        required
        name='city'
        value={formData.city || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('city')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('city')} rounded-md p-2 ${
          showErrors && errors.includes('City') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('City') && (
        <p className='text-red-500 text-sm mt-1'>City is required</p>
      )}

      {/* State */}
      <InputField
        placeholder='State'
        type='text'
        required
        name='state'
        value={formData.state || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('state')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('state')} rounded-md p-2 ${
          showErrors && errors.includes('State') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('State') && (
        <p className='text-red-500 text-sm mt-1'>State is required</p>
      )}

      {/* Pin Code */}
      <InputField
        placeholder='Pin Code'
        type='number'
        required
        name='pinCode'
        value={formData.pinCode || ''}
        onChange={handleInputChange}
        onFocus={() => setActiveBox('pinCode')}
        onBlur={() => setActiveBox(null)}
        className={`border ${getBorderClass('pinCode')} rounded-md p-2 ${
          showErrors && errors.includes('Pin Code') ? 'input-error' : ''
        }`}
      />
      {showErrors && errors.includes('Pin Code') && (
        <p className='text-red-500 text-sm mt-1'>Pin Code is required</p>
      )}
    </div>
  );
};

export default YourInfo;
