import { IoMenu, IoClose, IoChevronDown } from 'react-icons/io5';
import gsap from 'gsap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/ciitmLogo.png';
import { useRef, useState, useEffect } from 'react';

const Navbar = () => {
   const menu = useRef(null);
   const open = useRef(null);
   const close = useRef(null);
   const dropdownRef = useRef(null); // Ref for dropdown
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   // Open/Close menu methods
   const openMenu = () => {
      gsap.to(menu.current, {
         y: '0%',
         duration: 0.5,
      });
      open.current.style.display = 'none';
      close.current.style.display = 'block';
   };

   const closeMenu = () => {
      gsap.to(menu.current, {
         y: '-100%',
         duration: 0.5,
      });
      open.current.style.display = 'block';
      close.current.style.display = 'none';
   };

   // Toggle dropdown state
   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   // Close dropdown when clicked outside

   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {

         setIsDropdownOpen(false);
      }
   };

   useEffect(() => {
      // Attach event listener to the document to detect outside clicks
      document.addEventListener('mousedown', handleClickOutside);

      // Cleanup on unmount
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   const navLinks = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Us' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/students', label: 'Students' },
      { to: '/contact', label: 'Contact Us' },
   ];

   return (
      <>
         <div
            ref={menu}
            className='mobile-menu w-full h-screen bg-[#333] text-[6vw] font-semibold text-white hidden max-[599px]:block -translate-y-[100%] fixed top-0 left-0 z-[99]'
         >
            <nav className='w-full h-full flex items-center justify-center gap-6 flex-col'>
               {navLinks.map((link) => (
                  link.label !== 'Students' ? (
                     <NavLink
                        key={link.to}
                        to={link.to}
                        state={{ scrollToSection: true }}
                        className={({ isActive }) =>
                           isActive
                              ? 'font-semibold transition-all'
                              : 'hover:font-normal transition-all'
                        }
                        onClick={closeMenu}
                     >
                        {link.label}
                     </NavLink>
                  ) : (
                     <div key={link.to} className='relative'>
                        <button
                           onClick={toggleDropdown}
                           className={`flex items-center gap-1 transition-all font-semibold`}
                        >
                           {link.label}
                           <IoChevronDown
                              className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                              size={16}
                           />
                        </button>
                        {isDropdownOpen && (
                           <div
                              ref={dropdownRef} // Attach ref here
                              className='flex flex-col bg-white text-black w-full text-[13px] absolute overflow-hidden top-full left-0 shadow-md rounded-md mt-1 border border-gray-200'
                           >
                              <NavLink to='/admission' className='px-4 py-2 hover:bg-gray-100 hover:font-medium border-b border-gray-300'>
                                 Admission
                              </NavLink>
                              <NavLink to='/status' className='px-4 py-2 hover:bg-gray-100 hover:font-medium border-b border-gray-300'>
                                 Check Status
                              </NavLink>
                              <NavLink to='/payment' className='px-4 py-2 hover:bg-gray-100 hover:font-medium'>
                                 Payment
                              </NavLink>
                           </div>
                        )}
                     </div>

                  )
               ))}
               <div className='btns flex items-center justify-between gap-3 text-[5vw]'>
                  <NavLink
                     to='/login'
                     state={{ scrollToSection: true }}
                     className='px-8 py-2 w-full bg-[#f9f9f9] text-[#333] rounded-lg font-[Poppins]'
                     onClick={closeMenu}
                  >
                     Login
                  </NavLink>
                  <NavLink
                     to='/signup'
                     state={{ scrollToSection: true }}
                     className='px-3 py-2 w-full bg-[#F9F9F9] text-[#333] border-[1px] border-[#D7D7D74D] rounded-lg font-[Poppins]'
                     onClick={closeMenu}
                  >
                     Registration
                  </NavLink>
               </div>
            </nav>
         </div>

         <nav className='w-full fixed top-0 left-0 px-10 max-[599px]:px-6 py-3 z-[999] bg-white flex items-center justify-between'>

            <NavLink to='/' state={{ scrollToSection: true }} className='logo'>
               <img src={logo} alt='Logo' />
            </NavLink>
            <div className='links flex items-center justify-between gap-6 text-[1vw] font-light font-[Poppins] max-[599px]:hidden'>
               {navLinks.map((link) => (
                  link.label !== 'Students' ? (
                     <NavLink
                        key={link.to}
                        to={link.to}
                        state={{ scrollToSection: true }}
                        className={({ isActive }) =>
                           isActive
                              ? 'font-medium transition-all'
                              : 'hover:font-normal transition-all'
                        }
                     >
                        {link.label}
                     </NavLink>
                  ) : (
                     <div key={link.to} className='relative'>
                        <button
                           onClick={toggleDropdown}
                           className={`flex items-center gap-1 transition-all ${isDropdownOpen ? 'font-bold' : 'font-normal'}`}
                        >
                           {link.label}
                           <IoChevronDown
                              className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                              size={16}
                           />
                        </button>
                        {isDropdownOpen && (
                           <div
                              ref={dropdownRef} // Attach ref here
                              className='flex flex-col bg-white text-black w-40 text-[13px] absolute overflow-hidden top-full left-0 shadow-md rounded-md mt-1 border border-gray-200'
                           >

                              <NavLink
                                 to='/admission'
                                 className='px-4 py-2 hover:bg-gray-100 hover:font-medium border-b border-gray-300'
                              >
                                 Admission
                              </NavLink>
                              <NavLink
                                 to='/status'
                                 className='px-4 py-2 hover:bg-gray-100 hover:font-medium border-b border-gray-300'
                              >
                                 Check Status
                              </NavLink>
                              <NavLink
                                 to='/payment'
                                 className='px-4 py-2 hover:bg-gray-100 hover:font-medium'
                              >
                                 Payment
                              </NavLink>
                           </div>
                        )}
                     </div>
                  )
               ))}

            </div>
            <div className='btns flex items-center justify-between gap-3 max-[599px]:hidden'>
               <NavLink
                  to='/login'
                  state={{ scrollToSection: true }}
                  className='px-8 py-2 w-full bg-[#333] text-white rounded-lg text-sm font-[Poppins]'
               >
                  Login
               </NavLink>
               <NavLink
                  to='/signup'
                  state={{ scrollToSection: true }}
                  className='px-3 py-2 w-full bg-[#F9F9F9] border-[1px] border-[#D7D7D74D] rounded-lg text-sm font-[Poppins]'
               >
                  Registration
               </NavLink>
            </div>
            <div
               ref={open}
               className='bg-[#333] rounded-full text-white p-2 hidden max-[599px]:block'
               onClick={openMenu}
            >
               <IoMenu size={25} />
            </div>
            <div
               ref={close}
               className='bg-[#333] rounded-full text-white p-2 hidden'
               onClick={closeMenu}
            >
               <IoClose size={25} />
            </div>
         </nav>
      </>
   );
};

export default Navbar;
