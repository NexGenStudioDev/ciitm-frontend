import CiitmLogo from '../assets/images/ciitmLogo.png'
import LoginImage from '../assets/images/loginImage.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Login_EndPoint } from '../utils/constants';

const Login = () => {
    const Form_schema = yup
        .object({
            uEmail: yup
                .string()
                .email('Enter a valid email address')
                .required('Email is required'),
            uPassword: yup
                .string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,
                    { message: 'Password must contain at least one letter, one number, one special character, and one uppercase letter' })
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
            const response = await axios.post((Login_EndPoint), data);

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
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                alt="Your Company"
                                src={CiitmLogo}
                                className="h-8 w-auto"
                            />
                            <h2 className="mt-8 text-2xl/9 font-semibold tracking-tight text-[#333333]">Welcome Back</h2>
                            <p className="mt-2 text-sm/6 text-[#333333]">
                                Allows you to pay online at all applications and website that accepts MasterCard cards
                            </p>
                        </div>

                        <div className="mt-5">
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-[#5F5F5F]">
                                            Email
                                        </label>
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
                                                className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5F5F5F] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-[#5F5F5F]">
                                            Password
                                        </label>
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
                                                className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5F5F5F] sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <div className="flex h-6 shrink-0 items-center">
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input
                                                        id="remember-me"
                                                        name="remember-me"
                                                        type="checkbox"
                                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-[#FF6603] checked:bg-[#FF6603] indeterminate:border-[#FF6603] indeterminate:bg-[#FF6603] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6603] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                    />
                                                    <svg
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                    >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-checked:opacity-100"
                                                        />
                                                        <path
                                                            d="M3 7H11"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label htmlFor="remember-me" className="block text-sm/6 text-[#5F5F5F]">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm/6">
                                            <a href="#" className="font-semibold text-[#FF6603] hover:text-[#5F5F5F]">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-[#333333] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#5F5F5F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Log in
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-4">
                                <a
                                    href="#"
                                    className="flex items-center gap-5 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
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

                            <div className="mt-5 text-sm/6 flex justify-end">
                                <p>
                                    <span className='text-[#333333]'> Registered?  </span>
                                    <a href="/sign-up" className="font-semibold text-[#FF6603] hover:text-[#5F5F5F]">
                                        Create an account
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2 h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${LoginImage})` }}></div>
            </div>
        </>
    )
}

export default Login;