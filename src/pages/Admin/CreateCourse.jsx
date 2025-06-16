import React, { useState } from "react";
import AdminTemplate from "../../components/Templates/Admin/AdminTemplate";
import FormTemplate_Secondary from "../../components/Templates/Admin/form/FormTemplate_Secondary";
import Input_Primary from "../../components/Atoms/Input/Input_Primary";
import TextArea_Primary from "../../components/Atoms/Textarea/TextArea_Primary";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseEligibility, setCourseEligibility] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle course creation logic here
    alert("Course Created!");
  };

  return (
    <AdminTemplate>
      <FormTemplate_Secondary>
        <div className="Form_title_Container w-full flex flex-col items-center justify-center text-white bg-[#090909] rounded-md p-4 shadow-lg">
          <h1 className="Form_title text-[1.3vw]">Create Course</h1>
        </div>

        <form
          className="w-full flex flex-col items-center justify-center mt-4 px-[2vw]"
          onSubmit={handleSubmit}
        >
          <div className="Form_input_Container w-full flex flex-col justify-center mb-4">
            <label htmlFor="courseName" className="text-white mb-2">Course Name</label>
            <Input_Primary
              className="p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]"
              type="text"
              id="courseName"
              name="courseName"
              placeholder="Enter course name"
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              required
            />
          </div>

          <div className="Form_input_Container w-full flex flex-col justify-center mb-4">
            <label htmlFor="courseFee" className="text-white mb-2">Course Fee</label>
            <Input_Primary
              className="p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]"
              type="number"
              id="courseFee"
              name="courseFee"
              placeholder="Enter course fee"
              value={courseFee}
              onChange={e => setCourseFee(e.target.value)}
              required
            />
          </div>

          <div className="Form_input_Container w-full flex flex-col justify-center mb-4">
            <label htmlFor="courseDuration" className="text-white mb-2">Course Duration</label>
            <Input_Primary
              className="p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]"
              type="text"
              id="courseDuration"
              name="courseDuration"
              placeholder="Enter course duration"
              value={courseDuration}
              onChange={e => setCourseDuration(e.target.value)}
              required
            />
          </div>

          <div className="Form_input_Container w-full flex flex-col justify-center mb-4">
            <label htmlFor="courseEligibility" className="text-white mb-2">Course Eligibility</label>
            <Input_Primary
              className="p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]"
              type="text"
              id="courseEligibility"
              name="courseEligibility"
              placeholder="Enter course eligibility"
              value={courseEligibility}
              onChange={e => setCourseEligibility(e.target.value)}
              required
            />
          </div>

          <div className="Form_input_Container w-full flex flex-col justify-center mb-4">
            <label htmlFor="courseThumbnail" className="text-white mb-2">Course Thumbnail URL</label>
            <Input_Primary
              className="p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]"
              type="text"
              id="courseThumbnail"
              name="courseThumbnail"
              placeholder="Enter course thumbnail URL"
              value={courseThumbnail}
              onChange={e => setCourseThumbnail(e.target.value)}
              required
            />
          </div>

          <div className="Form_input_Container w-full flex flex-col justify-center mb-4">
            <label htmlFor="courseDescription" className="text-white mb-2">Course Description</label>
            <TextArea_Primary
              className="p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]"
              id="courseDescription"
              name="courseDescription"
              placeholder="Enter course description"
              value={courseDescription}
              onChange={e => setCourseDescription(e.target.value)}
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className="
              mt-4
              px-[2vw] py-[1.2vh]
              bg-gradient-to-r from-green-500 to-green-700
              text-white font-semibold rounded-lg shadow-md
              hover:from-green-600 hover:to-green-800
              hover:scale-105 active:scale-95 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
              text-[1.1rem] md:text-[1.15vw]
              w-[40%]
            "
          >
            Create Course
          </button>
        </form>
      </FormTemplate_Secondary>
    </AdminTemplate>
  );
};

export default CreateCourse;