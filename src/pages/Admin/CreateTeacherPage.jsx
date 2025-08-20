import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/AuthSlice';
import { axios } from '../../utils/apiUrl';
import { toast } from 'react-toastify';

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
				<div className='w-full p-4 md:p-6'>
					<h2 className='text-xl md:text-2xl font-semibold'>Create New Teacher</h2>
					<p className='text-sm text-gray-400 mt-2'>Fill in the details to add a new teacher.</p>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'
					>
						<div className='flex flex-col'>
							<label className='text-sm font-medium mb-1'>Name</label>
							<input
								{...register('name')}
								className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
								placeholder='Full name'
							/>
							{errors.name && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.name.message}
								</span>
							)}
						</div>

						<div className='flex flex-col'>
							<label className='text-sm font-medium mb-1'>Email</label>
							<input
								{...register('email')}
								type='email'
								className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
								placeholder='teacher@example.com'
							/>
							{errors.email && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.email.message}
								</span>
							)}
						</div>

						<div className='flex flex-col'>
							<label className='text-sm font-medium mb-1'>Image URL</label>
							<input
								{...register('image')}
								className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
								placeholder='https://...'
							/>
							{errors.image && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.image.message}
								</span>
							)}
						</div>

						<div className='flex flex-col'>
							<label className='text-sm font-medium mb-1'>Role</label>
							<input
								{...register('role')}
								className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
								placeholder='e.g. Math Teacher'
							/>
							{errors.role && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.role.message}
								</span>
							)}
						</div>

						<div className='flex flex-col'>
							<label className='text-sm font-medium mb-1'>Specialization</label>
							<input
								{...register('specialization')}
								className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
								placeholder='e.g. Physics'
							/>
							{errors.specialization && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.specialization.message}
								</span>
							)}
						</div>

						<div className='flex flex-col'>
							<label className='text-sm font-medium mb-1'>Experience (years)</label>
							<input
								{...register('experience')}
								type='number'
								min={0}
								className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
								placeholder='e.g. 5'
							/>
							{errors.experience && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.experience.message}
								</span>
							)}
						</div>

						<div className='md:col-span-2 mt-2'>
							<h3 className='text-sm font-semibold mb-2'>Social Media Links</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='flex flex-col'>
									<label className='text-sm font-medium mb-1'>Facebook</label>
									<input
										{...register('facebook')}
										className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
										placeholder='https://facebook.com/...'
									/>
									{errors.facebook && (
										<span className='text-red-500 text-xs mt-1'>
											{errors.facebook.message}
										</span>
									)}
								</div>

								<div className='flex flex-col'>
									<label className='text-sm font-medium mb-1'>LinkedIn</label>
									<input
										{...register('linkedin')}
										className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
										placeholder='https://linkedin.com/in/...'
									/>
									{errors.linkedin && (
										<span className='text-red-500 text-xs mt-1'>
											{errors.linkedin.message}
										</span>
									)}
								</div>

								<div className='flex flex-col'>
									<label className='text-sm font-medium mb-1'>Twitter</label>
									<input
										{...register('twitter')}
										className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
										placeholder='https://twitter.com/...'
									/>
									{errors.twitter && (
										<span className='text-red-500 text-xs mt-1'>
											{errors.twitter.message}
										</span>
									)}
								</div>

								<div className='flex flex-col'>
									<label className='text-sm font-medium mb-1'>Instagram</label>
									<input
										{...register('instagram')}
										className='rounded-md border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500'
										placeholder='https://instagram.com/...'
									/>
									{errors.instagram && (
										<span className='text-red-500 text-xs mt-1'>
											{errors.instagram.message}
										</span>
									)}
								</div>
							</div>
						</div>

						<div className='md:col-span-2 flex items-center gap-3 mt-2'>
							<button
								type='submit'
								className='bg-[#FF6603] hover:bg-[#e05600] text-white font-semibold rounded-md px-5 py-2 disabled:opacity-60 disabled:cursor-not-allowed'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Submitting...' : 'Submit'}
							</button>
							<button
								type='button'
								className='bg-gray-200 text-gray-700 font-medium rounded-md px-5 py-2'
								onClick={() => reset()}
							>
								Reset
							</button>
						</div>
					</form>
				</div>
			</AdminTemplate>
		</>
	);
}

