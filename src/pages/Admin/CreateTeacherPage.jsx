import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, number, object } from 'yup';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/AuthSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

/**
 * Yup validation schema for teacher creation form
 * Defines validation rules for all form fields including required fields,
 * email format, URL validation, and numeric constraints
 * @type {import('yup').ObjectSchema}
 */
const schema = object({
	name: string().required('Name is required'),
	email: string()
		.email('Enter a valid email')
		.required('Email is required'),
	image: string()
		.url('Enter a valid image URL')
		.required('Image URL is required'),
	role: string().required('Role is required'),
	specialization: string()
		.required('Specialization is required'),
	experience: number()
		.typeError('Experience must be a number')
		.min(0, 'Experience cannot be negative')
		.required('Experience is required'),
	facebook: string()
		.url('Enter a valid Facebook URL')
		.required('Facebook link is required'),
	linkedin: string()
		.url('Enter a valid LinkedIn URL')
		.required('LinkedIn link is required'),
	twitter: string()
		.url('Enter a valid Twitter URL')
		.required('Twitter link is required'),
	instagram: string()
		.url('Enter a valid Instagram URL')
		.required('Instagram link is required'),
});

/**
 * Reusable input field component to reduce code duplication
 * Renders a form input with label, validation, and error display
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the input field
 * @param {string} props.name - Field name for React Hook Form registration
 * @param {Function} props.register - React Hook Form register function
 * @param {Object} props.errors - Form errors object from React Hook Form
 * @param {string} props.placeholder - Input placeholder text
 * @param {string} [props.type='text'] - Input type (text, email, number, etc.)
 * @param {string} props.id - Input ID for label association and accessibility
 * @returns {JSX.Element} A form input field with label and error handling
 */
const InputField = ({ 
	label, 
	name, 
	register, 
	errors, 
	placeholder, 
	type = 'text',
	id 
}) => (
	<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
		<label htmlFor={id} className='text-white mb-2'>
			{label}
		</label>
		<input
			id={id}
			{...register(name)}
			type={type}
			placeholder={placeholder}
			className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
		/>
		{errors[name] && (
			<span className='text-red-500 text-xs mt-1'>
				{errors[name].message}
			</span>
		)}
	</div>
);

/**
 * CreateTeacherPage component - Allows administrators to create new teacher profiles
 * This component provides a comprehensive form for adding teachers with validation,
 * API integration, and proper error handling. It includes fields for personal
 * information, professional details, and social media links.
 * 
 * Features:
 * - Form validation using React Hook Form and Yup
 * - JWT authentication for API requests
 * - Responsive design matching admin theme
 * - Success/error notifications with toast
 * - Auto-redirect after successful submission
 * 
 * @returns {JSX.Element} The complete CreateTeacherPage component with form
 */
export default function CreateTeacherPage() {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			image: '',
			role: '',
			specialization: '',
			experience: '',
			facebook: '',
			linkedin: '',
			twitter: '',
			instagram: '',
		},
	});

	/**
	 * Handle form submission to create a new teacher
	 * Validates form data, constructs API payload, sends POST request,
	 * and handles success/error responses with user feedback
	 * 
	 * @param {Object} data - Form data from React Hook Form validation
	 * @param {string} data.name - Teacher's full name
	 * @param {string} data.email - Teacher's email address
	 * @param {string} data.image - Teacher's profile image URL
	 * @param {string} data.role - Teacher's role/title
	 * @param {string} data.specialization - Teacher's area of expertise
	 * @param {string} data.experience - Years of teaching experience
	 * @param {string} data.facebook - Facebook profile URL
	 * @param {string} data.linkedin - LinkedIn profile URL
	 * @param {string} data.twitter - Twitter profile URL
	 * @param {string} data.instagram - Instagram profile URL
	 * @returns {Promise<void>} Handles API request and user feedback
	 */
	const onSubmit = async data => {
		const token = user?.token || localStorage.getItem('token');
		const payload = {
			name: data.name,
			email: data.email,
			image: data.image,
			role: data.role,
			specialization: data.specialization,
			experience: Number(data.experience),
			social_media: {
				facebook: data.facebook,
				linkedin: data.linkedin,
				twitter: data.twitter,
				instagram: data.instagram,
			},
		};

		try {
			if (!token) {
				throw new Error('Missing auth token. Please log in as admin.');
			}

			const res = await axios.post(
				'/api/v1/admin/teacher/create',
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			toast.success(res?.data?.message || 'Teacher created successfully');
			reset();
			setTimeout(() => navigate('/admin/DashBoard'), 500);
		} catch (error) {
			const message =
				error?.response?.data?.message || error?.message || 'Failed to create teacher';
			toast.error(message);
		}
	};

	return (
		<>
			<Helmet>
				<title>Create New Teacher</title>
				<meta
					name='description'
					content='Create a new teacher profile in the CIITM admin panel.'
				/>
			</Helmet>
			<AdminTemplate pageName={'Create Teacher'}>
				<FormTemplate_Secondary
					Title='Create Teacher'
					TitleClassName='w-full h-[10vh] bg-[#090909]'
					HeadingClassName='text-white text-[1.3vw] max-[995px]:text-[2vw] max-[500px]:text-[2.8vw]'
				>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full flex flex-col items-center justify-center mt-4 px-[2vw] text-[1.1vw] max-[995px]:text-[2vw] max-[500px]:text-[2.8vw]'
					>
						<InputField
							label='Name'
							name='name'
							register={register}
							errors={errors}
							placeholder='Enter full name'
							id='teacher-name'
						/>

						<InputField
							label='Email'
							name='email'
							register={register}
							errors={errors}
							placeholder='teacher@example.com'
							type='email'
							id='teacher-email'
						/>

						<InputField
							label='Image URL'
							name='image'
							register={register}
							errors={errors}
							placeholder='https://...'
							id='teacher-image'
						/>

						<InputField
							label='Role'
							name='role'
							register={register}
							errors={errors}
							placeholder='e.g. Math Teacher'
							id='teacher-role'
						/>

						<InputField
							label='Specialization'
							name='specialization'
							register={register}
							errors={errors}
							placeholder='e.g. Physics'
							id='teacher-specialization'
						/>

						<InputField
							label='Experience (years)'
							name='experience'
							register={register}
							errors={errors}
							placeholder='e.g. 5'
							type='number'
							id='teacher-experience'
						/>

						<InputField
							label='Facebook'
							name='facebook'
							register={register}
							errors={errors}
							placeholder='https://facebook.com/...'
							id='teacher-facebook'
						/>

						<InputField
							label='LinkedIn'
							name='linkedin'
							register={register}
							errors={errors}
							placeholder='https://linkedin.com/in/...'
							id='teacher-linkedin'
						/>

						<InputField
							label='Twitter'
							name='twitter'
							register={register}
							errors={errors}
							placeholder='https://twitter.com/...'
							id='teacher-twitter'
						/>

						<InputField
							label='Instagram'
							name='instagram'
							register={register}
							errors={errors}
							placeholder='https://instagram.com/...'
							id='teacher-instagram'
						/>

						<button
							type='submit'
							className='mt-4 px-[2vw] py-[1.2vh] bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 max-[300px]:text-[4.5vw] max-[500px]:text-[3vw] max-[995px]:text-[2.3vw] text-[1.5vw] w-[40%] mb-[3.5vh] disabled:opacity-60 disabled:cursor-not-allowed'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Submitting...' : 'Create Teacher'}
						</button>
					</form>
				</FormTemplate_Secondary>
			</AdminTemplate>
		</>
	);
}

