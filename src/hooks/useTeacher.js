import { useDispatch, useSelector } from 'react-redux';
import { setTeacher } from '../store/AboutSlice';
import { Find_Teacher_EndPoint } from '../utils/constants';
import { useEffect } from 'react';
import axios from 'axios';

const useTeacher = () => {
   let teacher = useSelector(state => state.about.teacher);

   let dispatch = useDispatch();

   let Handle_Teacher = async () => {
      if (!teacher) {
         let response = await axios.get(Find_Teacher_EndPoint);
         dispatch(setTeacher(response.data.data));
      }
   };

   useEffect(() => {
      Handle_Teacher();
   }, []);
};

export default useTeacher;
