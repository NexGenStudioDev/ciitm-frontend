import Hero from '../components/Templates/home/Hero';
import Empower from '../components/Templates/home/Empower';
import Skills from '../components/Templates/home/Skills';
import Album from '../components/Templates/home/Album';
import Testimonials from '../components/Templates/home/Testimonials';

import useHomeUi from '../hooks/useHomeUi';
import { useSelector } from 'react-redux';
import Loader from '../components/Molecules/Loader/Loader';
import { useEffect } from 'react';

function Home() {
   let data = useSelector(state => state.home.landingPage);

   useHomeUi();

   if (!data) {
      return <Loader />;
   }

   return (
      <>
         <title>
            Top BCA Colleges In Dhanbad | BCA Course In Dhanbad –
            CIITM
         </title>
         <meta
            name='description'
            content="Top BCA Colleges In Dhanbad: List of BCA Colleges offering Bachelor's Degree in Dhanbad, along with course duration, course fees, and other important details."
         />

         <Hero />
         <Empower />
         <Skills />
         <Album />
         <Testimonials />
      </>
   );
}

export default Home;
