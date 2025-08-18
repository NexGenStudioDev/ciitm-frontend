import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Testimonial = () => {
  const [Testimonial_Image, setTestimonial_Image] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [jobRole, setJobRole] = React.useState('');
  const [star, setStar] = React.useState(5);
  const [testimonial, setTestimonial] = React.useState('');
  const [ImageFile , setImageFile] = React.useState(null);
  const fileRef = React.useRef(null);

  const Handle_Image_Change = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTestimonial_Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileRef.current.click();
  };

  const handleSubmit = async(e) => {
   try {
    e.preventDefault();
    // Replace with Cloudinary upload and API call
    let form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('job_Role', jobRole);
    form.append('star', Number(star));
    form.append('message', testimonial);

    if (Testimonial_Image) {
      form.append('image', ImageFile);
    }

    console.log('Form submitted:', form);

    let res = await axios.post('/api/v1/createTestimonial' , form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    Swal.fire({
      title: 'Success',
      text: res.data.message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
   } catch (error) {
    toast.error(error.response?.data?.message || 'Something went wrong!');
   }
   
    // setName('');
    // setEmail('');
    // setJobRole('');
    // setStar(5);
    // setTestimonial('');
    // setTestimonial_Image(null);
  };

  return (
    <div className='w-screen bg-[#f0edede7] flex items-center justify-center py-[5vh]'>
      <form 
        className="Testimonial_Form w-[95%] px-[2vw] bg-white mt-[8vh] rounded-md text-black shadow-md flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <div className="Title p-3 border-b-2 border-[#D1D5DB]">
          <h1 className='text-[1.5vw] font-bold text-[#1F2937]'>Submit Testimonial</h1>
        </div>
        <div className="bg-[#F9FAFB] mb-[7vh] inner-form w-full flex flex-col items-center gap-6 p-[2vw] rounded-md border-[1px]">
          <div className="Image_Container flex flex-col items-center gap-2">
            <div 
              className="Rounded_Testimonial_Image rounded-full w-32 h-32 bg-white border-2 border-[#D1D5DB] flex items-center justify-center overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={handleImageClick}
              title="Click to upload/change image"
            >
              <img 
                src={Testimonial_Image || "https://ui-avatars.com/api/?name=Testimonial&background=eee&color=555"} 
                alt="Testimonial" 
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <button 
              type="button"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              onClick={handleImageClick}
            >
              {Testimonial_Image ? "Change Image" : "Upload Image"}
            </button>
            <input 
              type="file" 
              accept="image/*" 
              onChange={Handle_Image_Change} 
              className='hidden' 
              ref={fileRef}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <label htmlFor="testimonial-name" className="font-medium text-[1rem] mb-1 text-gray-700">Name</label>
            <input
              id="testimonial-name"
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-md bg-[#F9FAFB] focus:outline-blue-400 font-medium"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />

            <label htmlFor="testimonial-email" className="font-medium text-[1rem] text-gray-700 mb-1">Email</label>
            <input
              id="testimonial-email"
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-md bg-[#F9FAFB] focus:outline-blue-400 font-medium"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <label htmlFor="testimonial-jobrole" className="font-medium text-[1rem] text-gray-700 mb-1">Job Role</label>
            <input
              id="testimonial-jobrole"
              type="text"
              placeholder="Your Job Role"
              className="w-full px-4 py-3 border rounded-md bg-[#F9FAFB] focus:outline-blue-400 font-medium"
              value={jobRole}
              onChange={e => setJobRole(e.target.value)}
              required
            />

            <label htmlFor="testimonial-message" className="font-medium text-[1rem] text-gray-700 mb-1">Testimonial</label>
            <textarea
              id="testimonial-message"
              placeholder="Your Testimonial"
              className="w-full px-4 py-3 border rounded-md bg-[#F9FAFB] focus:outline-blue-400 font-medium resize-none min-h-[100px]"
              value={testimonial}
              onChange={e => setTestimonial(e.target.value)}
              required
            />

            <div className="flex items-center gap-2 mt-2">
              <label className="font-medium text-gray-700">Star Rating:</label>
              {[1,2,3,4,5].map(num => (
                <button
                  key={num}
                  type="button"
                  className={`text-2xl ${star >= num ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none`}
                  onClick={() => setStar(num)}
                  aria-label={`${num} star`}
                >★</button>
              ))}
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md shadow  transition mb-[5vh]"
          >
            Submit Testimonial
          </button>
        </div>
      </form>
    </div>
  )
}

export default Testimonial