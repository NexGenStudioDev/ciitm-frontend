import _axios from 'axios';

const axiosInstance = _axios.create({
   baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
   withCredentials: true,
});

export { axiosInstance as axios };
