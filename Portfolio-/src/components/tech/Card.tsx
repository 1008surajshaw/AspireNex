import {motion} from "framer-motion"
import {Link} from "react-router-dom"
const Card = (props :any) => {
    const {item} = props;
    
  return (
    <div className="reletive h-full">
        
        <Link to={item.officialSite} className="relative">
      
        <motion.img
          src={item.image}
          alt=""
          width={80}
          height={80}
          whileHover={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          style={{ position: 'relative' }}
        />
      <motion.div className="flex justify-center w-[85px] h-[85px] bg-richblack-900 text-white items-center my-auto mx-auto font-bold rounded-md"
      
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: "white",
      }}>
      <h3
      >
        {item.name}
      </h3>
      </motion.div>
      
    </Link>

    </div>
  )
}

export default Card