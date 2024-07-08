
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <footer className='bg-richblack-800 text-richblack-5 min-h-fit w-screen z-50  '>
      <div className='w-8/12 mx-auto pt-5'>
        <div className='flex flex-col justify-between lg:flex-row'>
            <div className='flex flex-col'>
                <p className='text-2xl md:text-4xl font-extrabold'>Suraj</p>
              
                <p className='text-2xl md:text-4xl font-extrabold'>Shaw</p>
              
              
                <p className='text-lg md:text-4xl font-bold'>Full Stack Developer</p>
              
            </div>
            <div className='flex flex-col  text-lg md:text-xl cursor-pointer'>
             
             <ScrollLink 
             to="home" 
             spy={true}
             smooth={true}
             duration={500}>

               <p>Home</p>
             </ScrollLink>
              
            <ScrollLink spy={true}
                  smooth={true}
                  duration={500}
                  to="tech">

                 <p>Tech</p>
              </ScrollLink>

              
            <ScrollLink spy={true}
                  smooth={true}
                  duration={500}
                  to="pro">

                  <p>Project</p>
             </ScrollLink>
               
            </div>
        </div>
        <div className="flex mx-auto justify-center bottom-[20%] space-x-4 mt-4">
          <a  href="www.linkedin.com/in/suraj-shaw-16675624b" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-500" />
          </a>
          <a href="https://github.com/1008surajshaw" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-blue-500" />
          </a>
          <a href="https://twitter.com/@SurajShaw771506" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-blue-500" />
          </a>
        </div>
        <div className='flex mx-auto justify-center pt-5 pb-10'>
        &#169; Suraj shaw. All rights reserved
        </div>
        </div>
    </footer>
  );
};

export default Footer;
