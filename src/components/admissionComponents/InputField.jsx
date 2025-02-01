import React, { useState } from 'react';

const InputField = ({
  placeholder,
  type,
}) => {
  const [value, setValue] =
    useState('');
  const [isError, setIsError] =
    useState(false);
    

  const handleChange = e => {
    setValue(e.target.value);
    setIsError(false);
  };

  const handleBlur = () => {
    if (!value.trim()) {
      setIsError(true);
    }
  };

  const nameAndId = placeholder
    .replace(/\s+/g, '')
    .toLowerCase();

  return (
    <div className='max-[600px]:max-w-[248px] w-full relative'>
      <input
        id={nameAndId}
        name={nameAndId}
        type={type}
        placeholder={placeholder}
        value={value}
        required
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border rounded-[8px] min-[800px]:max-w-[248px] max-w-[100%] w-full px-4 py-3 text-xs text-[#333333] placeholder:text-[#333333] ${
          isError
            ? 'border-[#FF0000]'
            : 'border-[#A0A0A080]'
        }`}
      />

      {isError && (
        <p className='text-[#FF0000] absolute -bottom-5 text-xs mt-1'>{`${placeholder} is required.`}</p>
      )}
    </div>
  );
};

export default InputField;
