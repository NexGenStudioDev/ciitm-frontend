import React, { useState } from 'react';
import YourInfo from './YourInfo';
import ErrorModal from './ErrorModal'; // Import the ErrorModal component

const Steps = () => {
  const steps = [
    { label: 'Your Info', active: true },
    { label: 'Parents Info', active: false },
    { label: 'Are you Human?', active: false },
    { label: 'Grades', active: false },
    { label: 'University Info', active: false },
  ];

  // Manage the state of the form
 

  const [statusMessage, setStatusMessage] = useState(''); // Message to display after API call
  const [isLoading, setIsLoading] = useState(false); // Manage loading state for submit button
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Manage error modal visibility

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle dropdown changes
  const handleDropdownChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  

  const closeModal = () => {
    setIsErrorModalOpen(false); // Close the error modal
  };

  return (
    <>
      {/* Stepper */}
      <form action="POST" >
      <div className="flex mt-10 mb-20 items-center w-full">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="w-[18vw]">
              <div
                className={`mt-2 text-[1.31vw] leading-none text-center font-medium 
                ${step.active ? 'text-black' : 'text-[#AAAAAA]'}`}
              >
                {step.label}
              </div>
              <div className="flex items-center">
                <div
                  className={`min-[800px]:w-6 w-3 h-3 min-[800px]:h-6 flex items-center bg-white justify-center rounded-full border-2 transition-all duration-300 ease-in-out 
                  ${step.active ? 'border-black' : 'border-[#A0A0A080]'}`}
                >
                  <div
                    className={`min-[800px]:w-3.5 w-1.5 h-1.5 min-[800px]:h-3.5 rounded-full 
                    ${step.active ? 'bg-black' : 'bg-[#A0A0A080]'}`}
                  ></div>
                </div>
                <div className="flex-grow h-0.5 bg-[#333333]/30 mx-2"></div>
                {index === steps.length - 1 && (
                  <div
                    className={`min-[800px]:w-6 w-3 h-3 min-[800px]:h-6 flex items-center bg-white justify-center rounded-full border-2 transition-all duration-300 ease-in-out 
                    ${step.active ? 'border-black' : 'border-[#A0A0A080]'}`}
                  >
                    <div
                      className={`min-[800px]:w-3.5 w-1.5 h-1.5 min-[800px]:h-3.5 rounded-full 
                      ${step.active ? 'bg-black' : 'bg-[#A0A0A080]'}`}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Your Info Component */}
      <YourInfo
        handleInputChange={handleInputChange}
        handleDropdownChange={handleDropdownChange}
      />

      {/* Picture Upload */}
      <div className="rounded-[8px] flex flex-wrap gap-4 items-end justify-between mt-16 min-[800px]:w-[47%] border border-[#AAAAAA80] px-5 pt-4 pb-5">
        <div className="min-[700px]:w-[70%]">
          <h1 className="text-[#576675]">Picture Upload</h1>
          <p className="text-xs text-[#A1A8B4] pt-2">
            Submit Your Order Information - Item Name, Decoration Size, Quantity, Due Date, and any other details
          </p>
        </div>

        <button className="text-center bg-[#333333] px-6 text-white py-2.5 text-xs rounded-[8px]">
          Upload
        </button>
      </div>

      {/* Status Message */}

      {/* Submit and Preview Buttons */}
      <div className="flex mt-10 min-[1000px]:mt-0 min-[600px]:flex-row flex-col w-full items-center justify-end gap-5">
        <button className="text-center bg-[#333333] w-full min-[600px]:w-fit px-6 text-white py-2.5 text-sm rounded-[8px]" disabled={isLoading}>
          Preview
        </button>

        <button
          className="text-center w-full min-[600px]:w-fit bg-[#333333] px-6 text-white py-2.5 text-sm rounded-[8px]"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      </form>

      {/* Error Modal */}
    </>
  );
};

export default Steps;
