import React, { useState } from "react";
import InputField from "./InputField";
import Dropdown from "./DropDown";

const YourInfo = ({ formData, handleInputChange }) => {
  const [activeBox, setActiveBox] = useState(null);

  return (
    <div className="2xl:grid flex w-full sm:flex-row flex-col 2xl:grid-cols-5 items-center sm:flex-wrap sm:justify-between sm:gap-x-4 gap-y-16">
      <InputField
        placeholder="First Name"
        type="text"
        name="firstName"
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Middle Name"
        type="text"
        name="middleName"
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Last Name"
        type="text"
        name="lastName"
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Father's Name"
        type="text"
        name="fathersName"
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Mother's Name"
        type="text"
        name="mothersName"
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Email"
        type="email"
        name="email"
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Contact No"
        type="tel"
        name="contactNo"
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Date of Birth"
        type="date"
        name="dateOfBirth"
        
        onChange={handleInputChange}
      />

      <Dropdown
        placeholder="Gender"
        name="gender"
        options={["Male", "Female", "Rather not to say"]}
        
        onChange={handleInputChange}
      />
      <Dropdown
        placeholder="Nationality"
        name="nationality"
        options={["Pakistan", "India", "Bangladesh"]}
        
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Street"
        type="text"
        name="street"
        
        onChange={handleInputChange}
      />
      <Dropdown
        placeholder="City"
        name="city"
        options={["Lahore", "Delhi", "Dhaka"]}
        
        onChange={handleInputChange}
      />
      <Dropdown
        placeholder="State"
        name="state"
        options={["Punjab", "Goa", "Dhaka"]}
        
        onChange={handleInputChange}
      />

      {/* Tenth Marks */}
      <div
        className={`border min-[630px]:max-w-[248px] w-full cursor-pointer rounded-[8px] py-1.5 px-4 text-xs flex items-center justify-between ${
          activeBox === "tenth" ? "border-black" : "border-[#A0A0A080]"
        }`}
        onClick={() => setActiveBox("tenth")}
      >
        Tenth Marks
        <div
          className={`border ${
            activeBox === "tenth" ? "bg-[#333]" : "bg-[#FAFAFA]"
          } w-[29px] h-[29px] rounded-[5px]`}
        ></div>
      </div>

      <div
        className={`border min-[630px]:max-w-[248px] w-full cursor-pointer rounded-[8px] py-1.5 px-4 text-xs flex items-center justify-between ${
          activeBox === "twelfth" ? "border-black" : "border-[#A0A0A080]"
        }`}
        onClick={() => setActiveBox("twelfth")} 
      >
        Twelfth Marks
        <div
          className={`border ${
            activeBox === "twelfth" ? "bg-[#333]" : "bg-[#FAFAFA]"
          } w-[29px] h-[29px] rounded-[5px]`}
        ></div>
      </div>

      <Dropdown
        placeholder="University"
        name="university"
        options={["USA", "International", "GC"]}
        
        onChange={handleInputChange}
      />
    </div>
  );
};

export default YourInfo;
