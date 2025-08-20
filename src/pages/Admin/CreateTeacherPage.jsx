import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/AuthSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
	name: yup.string().required('Name is required'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	image: yup
		.string()
		.url('Enter a valid image URL')
		.required('Image URL is required'),
	role: yup.string().required('Role is required'),
	specialization: yup
		.string()
		.required('Specialization is required'),
	experience: yup
		.number()
		.typeError('Experience must be a number')
		.min(0, 'Experience cannot be negative')
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

	const onSubmit = async data => {
		const token = user?.token || localStorage.getItem('token');
		const payload = {
			name: data.name,
			email: data.email,
			image: data.image,
			role: data.role,
			Specialization: data.specialization,
			Experience: Number(data.experience),
			social_media: [
				{
					facebook: data.facebook,
					linkedin: data.linkedin,
					twitter: data.twitter,
					instagram: data.instagram,
				},
			],
		};

		try {
			if (!token) {
				throw new Error('Missing auth token. Please log in as admin.');
			}

			// Dev-only bypass: simulate success when using placeholder dev token
			if (token === 'dev-admin-token') {
				toast.success('Teacher created successfully (dev)');
				reset();
				setTimeout(() => navigate('/admin/DashBoard'), 500);
				return;
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
						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Name</label>
							<input
								{...register('name')}
								placeholder='Enter full name'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.name && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.name.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Email</label>
							<input
								{...register('email')}
								placeholder='teacher@example.com'
								type='email'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.email && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.email.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Image URL</label>
							<input
								{...register('image')}
								placeholder='https://...'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.image && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.image.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Role</label>
							<input
								{...register('role')}
								placeholder='e.g. Math Teacher'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.role && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.role.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Specialization</label>
							<input
								{...register('specialization')}
								placeholder='e.g. Physics'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.specialization && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.specialization.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Experience (years)</label>
							<input
								{...register('experience')}
								type='number'
								placeholder='e.g. 5'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.experience && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.experience.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Facebook</label>
							<input
								{...register('facebook')}
								placeholder='https://facebook.com/...'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.facebook && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.facebook.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>LinkedIn</label>
							<input
								{...register('linkedin')}
								placeholder='https://linkedin.com/in/...'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.linkedin && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.linkedin.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Twitter</label>
							<input
								{...register('twitter')}
								placeholder='https://twitter.com/...'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.twitter && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.twitter.message}
								</span>
							)}
						</div>

						<div className='Form_input_Container w-full flex flex-col justify-center mb-4'>
							<label className='text-white mb-2'>Instagram</label>
							<input
								{...register('instagram')}
								placeholder='https://instagram.com/...'
								className='p-2 rounded-md bg-[#2B2C2B] text-white border focus:outline-none w-[95%]'
							/>
							{errors.instagram && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.instagram.message}
								</span>
							)}
						</div>

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

