import ContactForm from "./ContactForm"
import { Element } from 'react-scroll';
import ContactDetails from "./ContactDetails";
const Contact = () => {
  return (
    <Element name="contact" smooth={true} duration={500} className="bg-richblack-900 w-[100%]">
    <div className=" pb-8 ">
       <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row'>
       {/* contact Details */}
       <div className='lg:w-[40%]'>
          <ContactDetails/>
       </div>
       {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      
      
    </div>
    </Element>
  )
}

export default Contact