import CiitmLogo from '../assets/images/ciitmLogo.png'
import SignUpImage from '../assets/images/signUpImage.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Login_EndPoint } from '../utils/constants';

const SignUp = () => {
    const Form_schema = yup
        .object({
            uFirstName: yup
                .string()
                .required('First Name is required'),
            uLastName: yup
                .string()
                .required('Last Name is required'),
            uEmail: yup
                .string()
                .email('Enter a valid email address')
                .required('Email is required'),
            uPassword: yup
                .string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,
                    { message: 'Password must contain at least one letter, one number, one special character, and one uppercase letter' }),
            uConfirmPassword: yup
                .string()
                .oneOf([yup.ref('uPassword'), null], 'Passwords must match')
                .required('Confirm Password is required')
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(Form_schema),
    });

    const onSubmit = async (data) => {
        console.log('data', data);
        try {
            const response = await axios.post((SignUp_EndPoint), data);

            if (response.data.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
            }

            if (response.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                });
            }

            console.log('response', response);
        } catch (error) {
            if (error.response.error || error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message
                        ? error.response.data.message
                        : 'Something went wrong!',
                });
            }
            console.error('error', error);
            console.error('error response', error.response.message);
        }
    };

    return (
        <>
            <div className="flex h-screen flex-1">
                <div className="hidden lg:block lg:w-1/2 h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${SignUpImage})` }}></div>
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-md">
                        <div>
                            <img
                                alt="Your Company"
                                src={CiitmLogo}
                                className="h-8 w-auto"
                            />
                            <h2 className="mt-8 text-2xl/9 font-semibold tracking-tight text-[#333333]">Let’s Go Started Together</h2>
                        </div>

                        <div className="mt-5">
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="mt-2 flex flex-col md:flex-row items-center justify-between gap-5">
                                        <div className='w-full'>
                                            {errors.uFirstName && (
                                                <p className='text-red-800 mt-[1vh] text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                                                    {errors.uFirstName.message}
                                                </p>
                                            )}
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                {...register('uFirstName')}
                                                required
                                                placeholder='First Name'
                                                className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5F5F5F] sm:text-sm/6"
                                            />
                                        </div>
                                        <div className='w-full'>
                                            {errors.uLastName && (
                                                <p className='text-red-800 mt-[1vh] text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                                                    {errors.uLastName.message}
                                                </p>
                                            )}
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                {...register('uLastName')}
                                                required
                                                placeholder='Last Name'
                                                className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5F5F5F] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        {errors.uEmail && (
                                            <p className='text-red-800 mt-[1vh] text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                                                {errors.uEmail.message}
                                            </p>
                                        )}
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            {...register('uEmail')}
                                            required
                                            autoComplete="email"
                                            placeholder='Enter your Email'
                                            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5F5F5F] sm:text-sm/6"
                                        />
                                    </div>

                                    <div className="mt-2">
                                        {errors.uPassword && (
                                            <p className='text-red-800 mt-[1vh] text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                                                {errors.uPassword.message}
                                            </p>
                                        )}
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            {...register('uPassword')}
                                            required
                                            autoComplete="current-password"
                                            placeholder='Create Password'
                                            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5F5F5F] sm:text-sm/6"
                                        />
                                    </div>

                                    <div className="mt-2">
                                        {errors.uConfirmPassword && (
                                            <p className='text-red-800 mt-[1vh] text-[0.9vw] max-[410px]:text-[2.5vw] max-[823px]:text-[2.2vw] font-bold'>
                                                {errors.uConfirmPassword.message}
                                            </p>
                                        )}
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            {...register('uConfirmPassword')}
                                            required
                                            autoComplete="current-password"
                                            placeholder='Confirm Password'
                                            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5F5F5F] sm:text-sm/6"
                                        />
                                    </div>

                                    <div className='flex flex-col md:flex-row items-center justify-between gap-5'>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-[#333333] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#5F5F5F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign Up
                                        </button>

                                        <a
                                            href="#"
                                            className="flex items-center gap-5 w-full justify-center rounded-md bg-[#333333] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#5F5F5F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                                                <path
                                                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                                    fill="#EA4335"
                                                />
                                                <path
                                                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                                    fill="#34A853"
                                                />
                                            </svg>
                                            <span className="text-sm/6 font-semibold">Sign up with Google</span>
                                        </a>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-5 text-sm/6 flex justify-start">
                                <p>
                                    <span className='text-[#333333]'> Already have an account ?  </span>
                                    <a href="login" className="font-semibold text-[#FF6603] hover:text-[#5F5F5F]">
                                        LogIn
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;