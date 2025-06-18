import React from 'react';

const TextAreaPrimary = ({
   placeholder,
   value,
   readOnly = false,
   className,
   onInput,
}) => {
   return (
      <textarea
         readOnly={readOnly}
         placeholder={placeholder}
         value={value}
         onInput={onInput}
         className={className}
      />
   );
};

export default TextAreaPrimary;
