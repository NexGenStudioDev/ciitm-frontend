// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../store/UserSlice';
// import axios from 'axios';
// import { Login_EndPoint } from '../utils/constants';

// const useLogin = () => {
//   let user = useSelector(state => state.user.userInfo);

//   let dispatch = useDispatch();

//   const login = async (credentials) => {
//     try {
//       const response = await axios.post(Login_EndPoint, credentials);
//       let data = response.data;

//       dispatch(setUser(data.user));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     // You can add any logic here that needs to run on component mount
//   }, []);

//   return { user, login };
// };

// export default useLogin;