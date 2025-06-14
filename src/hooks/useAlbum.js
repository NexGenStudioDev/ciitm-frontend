import { useEffect } from 'react';
import { setAlbum } from '../store/homeSlice';

import { Album_EndPoint } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../utils/apiUrl';

const useAlbum = () => {
   let Album = useSelector(state => state.home.Album);

   let dispatch = useDispatch();

   const Handle_Album = async () => {
      try {
         if (!Album) {
            const response = await axios.get(
               apiUrl('/api/v1/user/get/album'),
            );
            let data = response.data.data;
            dispatch(setAlbum(data));
         }
      } catch (error) {
         console.error(error.message);
      }
   };

   useEffect(() => {
      Handle_Album();
   }, []);
};

export default useAlbum;
