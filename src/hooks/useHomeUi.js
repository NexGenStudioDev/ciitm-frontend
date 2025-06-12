import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLandingPage } from '../store/homeSlice';
import axios from 'axios';
import { frontend_EndPoint } from '../utils/constants';
import socket from '../config/socket.mjs';

const useHomeUi = () => {
   const dispatch = useDispatch();
   const landingPage = useSelector(state => state.home.landingPage);

   // Fallback HTTP fetch
   const fetchData = async () => {
      try {
         console.log('Fetching frontend data via HTTP fallback...');
         const response = await axios.get(frontend_EndPoint);
         const data = response.data.data;
         dispatch(setLandingPage(data.landingPage));
      } catch (error) {
         console.error('Error fetching frontend data:', error);
      }
   };

   useEffect(() => {
      let didFallback = false;

      // Only connect if not already connected
      if (!socket.connected) {
         socket.connect();
      }

      // Handler for socket data
      const handleFrontend = (data) => {
         console.log('Received frontend data from socket:', data);
         // If no data or landingPage is not present, fallback to HTTP fetch
         if (!data || !data.landingPage) {
            if (!didFallback) {
               didFallback = true;
               fetchData();
            }
         } else {
            dispatch(setLandingPage(data.landingPage));
         }
      };

      // Handler for socket connection error
      const handleConnectError = () => {
         if (!didFallback) {
            didFallback = true;
            fetchData();
         }
      };

      if (!landingPage) {
         socket.emit('requestFrontend');
         socket.once('frontend', handleFrontend);
         socket.once('connect_error', handleConnectError);
      }

      return () => {
         socket.off('frontend', handleFrontend);
         socket.off('connect_error', handleConnectError);
      };
   }, [landingPage, dispatch]);

};

export default useHomeUi;
