import React from 'react';
import logo from '../assets/images/ciitmLogo.png';
import { Link } from 'react-router-dom';
import useSocialLinks from '../hooks/useSocialLinks';

const SocialLink = ({ href, label, isEmail = false }) => {
   if (!href) return null;

   return (
      <a
         href={isEmail ? `mailto:${href}` : href}
         target='_blank'
         rel='noopener noreferrer'
         className='text-[0.9vw] max-[599px]:text-[3.5vw]'
      >
         {label}
      </a>
   );
};


const Footer = () => {
   const socialLinks = useSocialLinks();

   return (
      <footer className='w-full flex items-center justify-between p-10 max-[999px]:flex-col'>
         <div className='left w-[50%] max-[599px]:pb-10 max-[999px]:w-full h-full flex items-start max-[999px]:items-center justify-center flex-col gap-4'>
            <Link to='/'>
               <img src={logo} alt='' />
            </Link>
            <p className='w-[47%] text-[1vw] max-[599px]:hidden text-[#333] max-[999px]:text-center max-[999px]:pb-6'>
               See why students love learning with us and how we&apos;ve
               made a difference in their journeys.{' '}
            </p>
         </div>

         <div className='right w-[50%] max-[999px]:w-full h-full flex items-center justify-center gap-10 flex-wrap'>
            <div className='flex max-[599px]:w-[25%] items-center justify-evenly flex-col gap-4 mb-4 mx-8'>
               <p className='text-[1vw] max-[599px]:text-[4.5vw] text-[#333] font-bold'>
                  Navigation
               </p>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Home
               </Link>
               <Link
                  to='/about'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  About Us
               </Link>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Gallery
               </Link>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Student
               </Link>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Contact Us
               </Link>
            </div>
            <div className='flex max-[599px]:w-[45%] mx-0 items-center justify-between flex-col gap-4 text-center mb-4'>
               <p className='text-[1vw] text-[#333] font-bold max-[599px]:text-[4.5vw]'>
                  Important Links
               </p>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Privacy Policy
               </Link>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Terms of Services
               </Link>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Contact Us
               </Link>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Blog
               </Link>
               <Link
                  to='/'
                  className='text-[0.9vw] max-[599px]:text-[3.5vw]'
               >
                  Support
               </Link>
            </div>
            <div className='flex max-[599px]:w-full items-center justify-between flex-col gap-4 mb-4 mx-8'>
               <p className='text-[1vw] text-[#333] font-bold max-[599px]:text-[4.5vw]'>
                  Social Media
               </p>
               <div className='links flex flex-col max-[599px]:flex-row gap-4 flex-wrap justify-center text-center'>
                  <SocialLink href={socialLinks?.instagram} label='Instagram' />
                  <SocialLink href={socialLinks?.facebook} label='Facebook' />
                  <SocialLink href={socialLinks?.twitter} label='Twitter' />
                  <SocialLink href={socialLinks?.youtube} label='Youtube' />
                  <SocialLink href={socialLinks?.linkedin} label='LinkedIn' />
                  <SocialLink href={socialLinks?.email} label='Email' isEmail />
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
