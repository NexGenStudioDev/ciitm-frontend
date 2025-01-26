import React, { useState } from "react";

const Dropdown = ({ 
  placeholder, 
  options, 
  handleSelect, 
  isRequired = false, 
  errorMessage = "This field is required." 
}) => {
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false); // Track if there is an error

  // Internal validation logic
  const validateDropdown = () => {
    if (isRequired && selectedOption === placeholder) {
      setIsError(true); // Trigger error if no valid selection
    } else {
      setIsError(false); // Clear error if valid
    }
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update selected option
    setIsOpen(false);
    setIsError(false); // Clear error when a valid option is selected
    if (handleSelect) handleSelect(option); // Notify parent of selection
  };

  // Validate dropdown when it's blurred or during form submission
  const handleBlur = () => validateDropdown();

  return (
    <div className="relative min-[630px]:max-w-[248px] w-full">
      {/* Dropdown Header */}
      <div
        tabIndex={0} // Enable focus for accessibility
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
        className={`border cursor-pointer w-full flex items-center justify-between gap-2 rounded-[8px] px-4 py-3 text-xs text-[#333333] ${
          isError ? "border-red-500" : "border-[#A0A0A080]"
        }`}
      >
        {selectedOption}
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M12.88 1L7.99 5.89C7.4125 6.4675 6.4675 6.4675 5.89 5.89L1 1"
            stroke="#131740"
            strokeWidth="1.8"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 overflow-hidden divide-y divide-[#D7D7D7] bg-white border border-[#A0A0A080] rounded-[8px] mt-2 w-full shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="flex items-center gap-2 px-4 py-3 text-xs text-[#333333] cursor-pointer hover:bg-[#FAFAFA]"
            >
              <div
                className={`w-4 h-4 border-2 bg-white rounded-full flex items-center justify-center ${
                  selectedOption === option ? "border-[#333333]" : "border-gray-400"
                }`}
              >
                {selectedOption === option && (
                  <div className="w-2 h-2 rounded-full bg-[#333333]"></div>
                )}
              </div>
              {option}
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {isError && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default Dropdown;
