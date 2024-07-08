import { Link } from "react-router-dom";
import {motion} from "framer-motion"

const Work = (props: any) => {
  const { pro } = props;
  return (
    <motion.div
      className=" flex flex-col justify-center mx-auto w-10/12 space-y-5"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      
    >
      <Link to={pro.url} target="_blank " >
        <motion.div className={`relative w-full flex flex-col `}>
          <motion.img
            src={pro.image}
            alt={pro.name}
            style={{ width: '100%' }}
            className={`w-full lg:h-[400px] rounded-md left-0`}
          />
          <motion.div
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-center opacity-0"
            whileHover={{ opacity: 1 }}
            whileTap={{ opacity: 0 }}
          >
            <motion.h2 className="text-3xl m-3 font-thin">{pro.name}</motion.h2>
             <div className="flex flex-row">
              {
                pro?.stacks.map((itm:any,idx:number) =>(
                  <div key={idx} className="flex flex-col m-3 font-extrabold hover:scale-x-100">
                    <img src={itm} width={30} height={30}/>
                  </div>
                ))
              }
             </div>
             
        
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Work;
