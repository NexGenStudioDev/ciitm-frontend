import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import ImageUploadPreview from '../../components/Organisms/Admin/ImageUploadPreview';

const DEFAULT_AVATAR =
   'https://ui-avatars.com/api/?name=Teacher&background=0D8ABC&color=fff';

const schema = yup.object({
   name: yup.string().required('Name is required'),
   email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
   image: yup.mixed().required('Image is required'),
   role: yup.string().required('Role is required'),
   Specialization: yup
      .string()
      .required('Specialization is required'),
   Experience: yup
      .number()
      .typeError('Experience must be a number')
      .min(0)
      .required('Experience is required'),
   facebook: yup
      .string()
      .url('Enter a valid Facebook URL')
      .required('Facebook link is required'),
   linkedin: yup
      .string()
      .url('Enter a valid LinkedIn URL')
      .required('LinkedIn link is required'),
   twitter: yup
      .string()
      .url('Enter a valid Twitter URL')
      .required('Twitter link is required'),
   instagram: yup
      .string()
      .url('Enter a valid Instagram URL')
      .required('Instagram link is required'),
});

const InputField = ({
   label,
   name,
   register,
   errors,
   placeholder,
   type = 'text',
}) => (
   <div className='mb-4 w-full'>
      <label
         htmlFor={name}
         className='text-white font-medium block mb-1'
      >
         {label}
      </label>
      <input
         id={name}
         {...register(name)}
         type={type}
         placeholder={placeholder}
         className='w-full p-3 rounded bg-[#1F1F1F] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      {errors[name] && (
         <p className='text-red-500 text-sm mt-1'>
            {errors[name].message}
         </p>
      )}
   </div>
);

export default function CreateTeacherPage() {
   const user = useSelector(selectUser);
   const navigate = useNavigate();
   const fileRef = useRef();
   const [step, setStep] = useState(0);
   const [imagePreview, setImagePreview] = useState(DEFAULT_AVATAR);
   const [imageFile, setImageFile] = useState(null);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      reset,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         name: '',
         email: '',
         image: '',
         role: '',
         Specialization: '',
         Experience: '',
         facebook: '',
         linkedin: '',
         twitter: '',
         instagram: '',
      },
   });

   const handleImageChange = e => {
      const file = e.target.files[0];
      if (file) {
         setImageFile(file);
         setValue('image', file.name); // Set for validation
         const reader = new FileReader();
         reader.onloadend = () => setImagePreview(reader.result);
         reader.readAsDataURL(file);
      }
   };

   const onSubmit = async data => {
      const token = user?.token || localStorage.getItem('token');
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
         if (key !== 'image') formData.append(key, value);
      });

      // formData.append('Avtar', imageFile || DEFAULT_AVATAR);
      formData.append('image', imageFile || DEFAULT_AVATAR);//Shema uses image there is no database input with name "avtar"
      console.log(formData);

      try {
         if (!token)
            throw new Error('Missing auth token. Please log in.');
         const res = await axios.post(
            '/api/v1/admin/teacher/create',
            formData,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
               },
            },
         );

         toast.success(
            res?.data?.message || 'Teacher created successfully',
         );
         reset();
         fileRef.current.value="";//clear manually
         setImagePreview(DEFAULT_AVATAR);
         setImageFile(null);
         setStep(0);
         setTimeout(() => navigate('/admin/DashBoard'), 500);
      } catch (err) {
         toast.error(
            err?.response?.data?.message ||
               err.message ||
               'Submission failed',
         );
      }
   };

   const steps = [
      {
         title: 'Personal Information',
         content: (
            <>
               <ImageUploadPreview
                  fileRef={fileRef}
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                  errors={errors.image && (           //validation for image is set
                  <p className="text-red-500 text-sm mt-1">
                           {errors.image.message}
                  </p>
)}
               />
               <InputField
                  label='Name'
                  name='name'
                  register={register}
                  errors={errors}
                  placeholder='Full name'
               />
               <InputField
                  label='Email'
                  name='email'
                  register={register}
                  errors={errors}
                  placeholder='Email address'
                  type='email'
               />
               <InputField
                  label='Role'
                  name='role'
                  register={register}
                  errors={errors}
                  placeholder='e.g. Math Teacher'
               />
               <InputField
                  label='Specialization'
                  name='Specialization'
                  register={register}
                  errors={errors}
                  placeholder='e.g. Physics'
               />
               <InputField
                  label='Experience (years)'
                  name='Experience'
                  register={register}
                  errors={errors}
                  placeholder='e.g. 5'
                  type='number'
               />
            </>
         ),
      },
      {
         title: 'Social Links',
         content: (
            <>
               <InputField
                  label='Facebook'
                  name='facebook'
                  register={register}
                  errors={errors}
                  placeholder='https://facebook.com/...'
               />
               <InputField
                  label='LinkedIn'
                  name='linkedin'
                  register={register}
                  errors={errors}
                  placeholder='https://linkedin.com/...'
               />
               <InputField
                  label='Twitter'
                  name='twitter'
                  register={register}
                  errors={errors}
                  placeholder='https://twitter.com/...'
               />
               <InputField
                  label='Instagram'
                  name='instagram'
                  register={register}
                  errors={errors}
                  placeholder='https://instagram.com/...'
               />
            </>
         ),
      },
   ];

   return (
      <>
         <Helmet>
            <title>Create New Teacher</title>
            <meta
               name='description'
               content='Create a new teacher profile in the CIITM admin panel.'
            />
         </Helmet>
         <AdminTemplate pageName='Create Teacher'>
            <FormTemplate_Secondary
               Title='Create Teacher'
               TitleClassName='w-full bg-[#090909] text-white text-[1.5rem] py-4 px-6'
               HeadingClassName='text-white text-xl md:text-2xl'
            >
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='w-full  mx-auto flex flex-col gap-4 px-4 py-6 text-white'
                  encType='multipart/form-data'
               >
                  {steps[step].content}

                  <div className='flex justify-between mt-4'>
                     <button
                        type='button'
                        onClick={() =>
                           setStep(prev => Math.max(prev - 1, 0))
                        }
                        disabled={step === 0}
                        className={`px-4 py-2 rounded transition-all ${
                           step === 0
                              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                     >
                        ⏮ Previous
                     </button>

                     <button
                        type={
                           step === steps.length - 1
                              ? 'submit'
                              : 'button'
                        }
                        onClick={() => {
                           if (step < steps.length - 1)
                              setStep(step + 1);
                        }}
                        disabled={isSubmitting}
                        className='px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white transition-all'
                     >
                        {step === steps.length - 1
                           ? isSubmitting
                              ? 'Submitting...'
                              : 'Create Teacher'
                           : 'Next ⏭'}
                     </button>
                  </div>
               </form>
            </FormTemplate_Secondary>
         </AdminTemplate>
      </>
   );
}
