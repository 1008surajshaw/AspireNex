import {BiLogoGmail} from "react-icons/bi"
import { motion } from "framer-motion"
import {BsLinkedin} from "react-icons/bs"
import {AiFillGithub} from "react-icons/ai"


const Socialbar = () => {
    
   
  return (
    <div className="w-1/15 xl:flex flex-col fixed left-[3rem] top-1/2 gap-7 hidden md:block z-50 ">
    <motion.div className="pb-3"
       whileHover={{ x: 10,scale: 1.5  }}
       initial={{ x: 0 }}
       transition={{ duration: 0.3 }}
      >
        <a href="mailto:iamsuraj3000@gmail.com" target="_blank">
            <BiLogoGmail
                className="icon"
                size={30}
                fill="red"
            />
        </a>
    </motion.div>
    <motion.div className="pb-3"
     whileHover={{ x: 10 ,scale: 1.5 }}
     initial={{ x: 0 }}
     transition={{ duration: 0.3 }}>
        <a href="https://www.linkedin.com/in/suraj-shaw-16675624b" target="_blank">
            <BsLinkedin
                className="icon" size={30} fill="#0E76A8"
                
            />
        </a>
    </motion.div>
    <motion.div className=""
     whileHover={{ x: 10 ,scale: 1.5  }}
     initial={{ x: 0 }}
     transition={{ duration: 0.3 }}>
        <a href="https://github.com/1008surajshaw" target="_blank">
            <AiFillGithub
                className="icon " size={30} fill="black"
                
            />
        </a>
    </motion.div>
    <div className="h-24 align-middle justify-center mx-auto flex bg-richblack-50 w-1"></div>
</div>


  )
}

export default Socialbar