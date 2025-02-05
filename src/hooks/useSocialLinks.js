import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Social_Link_EndPoint } from '../utils/constants';
import { setSocialLinks } from '../store/SocialLinkSlice';

const useSocialLinks = () => {
   const links = useSelector(state => state.socialLink.links);
   const dispatch = useDispatch();

   const fetchSocialLinks = async () => {
      try {
         if (!links) {
            const response = await axios.get(Social_Link_EndPoint);
            const data = response.data.link;

            dispatch(setSocialLinks(data));
         }
      } catch (error) {
         console.error('Error fetching social links:', error);
      }
   };

   useEffect(() => {
      fetchSocialLinks();
   }, [links]);

   return links;
};

export default useSocialLinks;
