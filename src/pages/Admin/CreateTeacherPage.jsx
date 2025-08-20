import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';

export default function CreateTeacherPage() {
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
				</div>
			</AdminTemplate>
		</>
	);
}

