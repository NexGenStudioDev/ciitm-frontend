import Hero from '../components/homeComponents/Hero';
import Empower from '../components/homeComponents/Empower';
import Skills from '../components/homeComponents/Skills';
import Album from '../components/homeComponents/Album';
import Testimonials from '../components/homeComponents/Testimonials';
import { Helmet } from 'react-helmet-async';
import useHomeUi from '../hooks/useHomeUi';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

function Home() {
   useHomeUi();
   let data = useSelector(state => state.home.landingPage);

   if (!data) {
      return <Loader />;
   }

   return (
      <>
         <Helmet>
            <title>
               Top BCA Colleges In Dhanbad | BCA Course In Dhanbad –
               CIITM
            </title>
            <meta
               name='description'
               content="Top BCA Colleges In Dhanbad: List of BCA Colleges offering Bachelor's Degree in Dhanbad, along with course duration, course fees, and other important details."
            />
         </Helmet>
         <Hero />
         <Empower />
         <Skills />
         <Album />
         <Testimonials />
      </>
   );
}

export default Home;
