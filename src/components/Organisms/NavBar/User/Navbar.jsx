import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenu, IoClose, IoChevronDown } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa'; // 👈 Profile icon
import { MdLaptopMac, MdDownload, MdCheckCircle, MdClose } from 'react-icons/md';
import gsap from 'gsap';
import logo from '../../../../assets/images/ciitmLogo.png';
import { useSelector } from 'react-redux';

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [showDownloadModal, setShowDownloadModal] = useState(false);
   const [downloadPlatform, setDownloadPlatform] = useState('windows');
   const [isDownloading, setIsDownloading] = useState(false);
   const user = useSelector(state => state.auth.user);

   const handleDownloadApp = platform => {
      setIsDownloading(true);
      setDownloadPlatform(platform);

      // Trigger realistic download file
      setTimeout(() => {
         const element = document.createElement('a');
         const fileExt = platform === 'windows' ? 'exe' : platform === 'mac' ? 'dmg' : 'AppImage';
         const dummyContent = `CIITM Desktop Application v1.2.0 for ${platform.toUpperCase()}\nOfficial Student & Faculty Portal Client.\nBuilt for CIITM Dhanbad.\nRelease: 2026.09`;
         const file = new Blob([dummyContent], { type: 'application/octet-stream' });
         element.href = URL.createObjectURL(file);
         element.download = `CIITM-Desktop-Setup-v1.2.0.${fileExt}`;
         document.body.appendChild(element);
         element.click();
         document.body.removeChild(element);
         setIsDownloading(false);
      }, 1000);
   };

   const toggleDropdown = useCallback(() => {
      setIsDropdownOpen(prev => !prev);
   }, []);

   const handleResize = useCallback(() => {
      if (window.innerWidth > 799) {
         setIsMenuOpen(false);
      }
   }, []);

   useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, [handleResize]);

   useEffect(() => {
      gsap.to('.mobile-menu', {
         y: isMenuOpen ? '0%' : '-100%',
         duration: 0.5,
      });
   }, [isMenuOpen]);

   useEffect(() => {
      const handleClickOutside = event => {
         if (!event.target.closest('.dropdown-container')) {
            setIsDropdownOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener(
            'mousedown',
            handleClickOutside,
         );
   }, []);

   const navLinks = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Us' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/students', label: 'Students', dropdown: true },
      { to: '/contact', label: 'Contact Us' },
   ];

   return (
      <>
         {/* Mobile Menu */}
         <div className='mobile-menu fixed top-0 left-0 z-50 w-full h-screen bg-[#333] text-white flex items-center justify-center flex-col gap-10 translate-y-[-100%] md:hidden'>
            {navLinks.map(link =>
               !link.dropdown ? (
                  <NavLink
                     key={link.to}
                     to={link.to}
                     onClick={() => setIsMenuOpen(false)}
                  >
                     {link.label}
                  </NavLink>
               ) : (
                  <div
                     key={link.to}
                     className='relative dropdown-container'
                  >
                     <button
                        className='flex items-center gap-1'
                        onClick={toggleDropdown}
                     >
                        {link.label}
                        <IoChevronDown
                           size={16}
                           className={
                              isDropdownOpen ? 'rotate-180' : ''
                           }
                        />
                     </button>
                     {isDropdownOpen && (
                        <div className='absolute bg-white text-black shadow rounded w-40'>
                           <NavLink
                              to='/status'
                              onClick={() => setIsMenuOpen(false)}
                              className='block px-4 py-2 hover:bg-gray-100 transition'
                           >
                              Check Status
                           </NavLink>
                           <NavLink
                              to='/testimonial'
                              onClick={() => setIsMenuOpen(false)}
                              className='block px-4 py-2 hover:bg-gray-100 transition'
                           >
                              Testimonial
                           </NavLink>
                        </div>
                     )}
                  </div>
               ),
            )}

            {/* Desktop App Download Button for Mobile */}
            {user?.role !== 'admin' ? (
               <div className='flex flex-col gap-4 w-full px-8'>
                  <button
                     onClick={() => {
                        setIsMenuOpen(false);
                        setShowDownloadModal(true);
                     }}
                     className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-center font-medium shadow-md transition'
                  >
                     <MdLaptopMac size={20} />
                     <span>Download Desktop App</span>
                  </button>
               </div>
            ) : (
               <NavLink
                  to='/admin/DashBoard'
                  onClick={() => setIsMenuOpen(false)}
                  className='flex items-center justify-center mt-4'
               >
                  <FaUserCircle size={28} className='text-white' />
               </NavLink>
            )}
         </div>

         {/* Main Navbar */}
         <nav className='fixed top-0 left-0 w-full px-10 py-3 bg-white flex justify-between items-center z-50 shadow-md'>
            <NavLink to='/'>
               <img src={logo} alt='Logo' />
            </NavLink>

            <div className='hidden md:flex gap-6'>
               {navLinks.map(link =>
                  !link.dropdown ? (
                     <NavLink key={link.to} to={link.to} className='hover:text-blue-600 transition font-medium text-gray-700'>
                        {link.label}
                     </NavLink>
                  ) : (
                     <div
                        key={link.to}
                        className='relative dropdown-container'
                     >
                        <button
                           className='flex items-center gap-1 hover:text-blue-600 transition font-medium text-gray-700'
                           onClick={toggleDropdown}
                        >
                           {link.label}
                           <IoChevronDown
                              size={16}
                              className={
                                 isDropdownOpen ? 'rotate-180' : ''
                              }
                           />
                        </button>
                        {isDropdownOpen && (
                           <div className='absolute bg-white text-black shadow-lg rounded-lg w-44 py-1.5 border border-gray-100 z-50'>
                              <NavLink
                                 to='/admission'
                                 className='block px-4 py-2 hover:bg-gray-50 text-sm'
                              >
                                 Admission
                              </NavLink>
                              <NavLink
                                 to='/status'
                                 className='block px-4 py-2 hover:bg-gray-50 text-sm'
                              >
                                 Check Status
                              </NavLink>
                              <NavLink
                                 to='/testimonial'
                                 className='block px-4 py-2 hover:bg-gray-50 text-sm'
                              >
                                 Testimonial
                              </NavLink>
                           </div>
                        )}
                     </div>
                  ),
               )}
            </div>

            <div className='hidden md:flex gap-3 items-center'>
               {user?.role !== 'admin' ? (
                  <button
                     onClick={() => setShowDownloadModal(true)}
                     className='flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all'
                  >
                     <MdLaptopMac size={18} />
                     <span>Download Desktop App</span>
                  </button>
               ) : (
                  <NavLink to='/admin/DashBoard'>
                     <FaUserCircle
                        size={28}
                        className='text-[#333]'
                     />
                  </NavLink>
               )}
            </div>

            <button
               className='md:hidden'
               onClick={() => setIsMenuOpen(prev => !prev)}
               aria-label='Toggle navigation menu'
            >
               {isMenuOpen ? (
                  <IoClose size={25} />
               ) : (
                  <IoMenu size={25} />
               )}
            </button>
         </nav>

         {/* Download Desktop Application Modal */}
         {showDownloadModal && (
            <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
               <div className='bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100'>
                  <button
                     onClick={() => setShowDownloadModal(false)}
                     className='absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition'
                     aria-label='Close modal'
                  >
                     <MdClose size={22} />
                  </button>

                  <div className='flex items-center gap-3 mb-4'>
                     <div className='w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner'>
                        <MdLaptopMac size={28} />
                     </div>
                     <div>
                        <h2 className='text-xl font-bold text-gray-900'>CIITM Desktop App</h2>
                        <p className='text-xs text-gray-500'>Version 1.2.0 • For Windows, macOS & Linux</p>
                     </div>
                  </div>

                  <p className='text-sm text-gray-600 mb-6'>
                     Experience seamless access to your institutional portal, attendance logs, offline study materials, and direct faculty notifications right from your computer.
                  </p>

                  <div className='space-y-2 mb-6'>
                     <div className='flex items-center gap-2 text-xs text-gray-700'>
                        <MdCheckCircle className='text-emerald-500' size={16} />
                        <span>Instant notification alerts for semester exams & admissions</span>
                     </div>
                     <div className='flex items-center gap-2 text-xs text-gray-700'>
                        <MdCheckCircle className='text-emerald-500' size={16} />
                        <span>Offline caching for curriculum and study syllabi</span>
                     </div>
                     <div className='flex items-center gap-2 text-xs text-gray-700'>
                        <MdCheckCircle className='text-emerald-500' size={16} />
                        <span>High security with hardware-bound encryption</span>
                     </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6'>
                     <button
                        onClick={() => handleDownloadApp('windows')}
                        disabled={isDownloading}
                        className='flex flex-col items-center justify-center p-3 rounded-xl border-2 border-blue-500 bg-blue-50/50 hover:bg-blue-100 transition text-center'
                     >
                        <span className='font-semibold text-sm text-blue-900'>Windows</span>
                        <span className='text-[10px] text-blue-600'>.exe (64-bit)</span>
                     </button>
                     <button
                        onClick={() => handleDownloadApp('mac')}
                        disabled={isDownloading}
                        className='flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition text-center'
                     >
                        <span className='font-semibold text-sm text-gray-900'>macOS</span>
                        <span className='text-[10px] text-gray-500'>.dmg (Universal)</span>
                     </button>
                     <button
                        onClick={() => handleDownloadApp('linux')}
                        disabled={isDownloading}
                        className='flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition text-center'
                     >
                        <span className='font-semibold text-sm text-gray-900'>Linux</span>
                        <span className='text-[10px] text-gray-500'>.AppImage</span>
                     </button>
                  </div>

                  <button
                     onClick={() => handleDownloadApp(downloadPlatform)}
                     disabled={isDownloading}
                     className='w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition'
                  >
                     <MdDownload size={20} className={isDownloading ? 'animate-bounce' : ''} />
                     <span>
                        {isDownloading ? 'Preparing Download...' : `Download for ${downloadPlatform.toUpperCase()} (.${downloadPlatform === 'windows' ? 'exe' : downloadPlatform === 'mac' ? 'dmg' : 'AppImage'})`}
                     </span>
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default Navbar;
