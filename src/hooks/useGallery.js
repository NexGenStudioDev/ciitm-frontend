import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { set_Gallery } from '../store/GallerySlice';

export let useGallery = () => {
   const dispatch = useDispatch();
   const gallery = useSelector(state => state.gallery);

  

   const fetchData = async () => {
      try {
         if (gallery.length < 1) {
            let res = await axios.get('/api/v1/user/get/All/Image');

            let data = res.data.data;

            dispatch(set_Gallery([...data]));
         }
      } catch (error) {
         console.error(error);
         throw new Error(error.message);
      }
   };

   useEffect(() => {
      fetchData();
   }, [gallery]);
};
