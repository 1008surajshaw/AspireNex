import {  useLocation } from 'react-router-dom';
import logo from '../../assets/favicon_io/favicon.ico';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const navlinks = [
    { name: 'Home', to: 'home' },
    { name: 'Tech', to: 'tech' },
    { name: 'Project', to: 'pro' },
    { name: 'Contact', to: 'contact' },
  ];

  const location = useLocation();
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  
  return (
    <div className={`fixed bg-richblack-25 top-0 left-0 right-0 z-50 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== '/' ? 'bg-richblack-800' : ''} transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <ScrollLink 
                  to="home"  
                  spy={true}
                  smooth={true}
                  duration={500}>
          <img src={logo} width={50} height={12} alt="Logo" loading="lazy" />
        </ScrollLink>
  
        <nav className={`${showNav ? 'block' : 'hidden'} md:block`}>
          <ul className="flex gap-x-6 text-richblack-25">
            {navlinks.map((link, index) => (
              <motion.li
                key={index}
                
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1, opacity: 0, x: '-100%'  }}
                animate={{ opacity: 1, x: '0%' }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 1 }}
              >
                <ScrollLink
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  className={`text-blue-500 cursor-pointer hover:text-blue-800 ${location.pathname === link.to ? 'font-bold' : ''}`}
                >
                  {link.name}
                </ScrollLink>
              </motion.li>
            ))}
          </ul>
        </nav>
  
        <div className="md:hidden mt-5">
          <button onClick={toggleNav}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -translate-y-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Navbar;
