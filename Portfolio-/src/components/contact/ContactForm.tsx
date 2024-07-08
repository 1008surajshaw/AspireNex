import ContactUsForm from "./ContactUsForm"



const ContactForm = () => {
  return (
    <div className='border border-richblack-600 text-richblack-800 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
    <h1 className='text-4xl leading-10 font-semibold text-richblack-5'>
      Contact Me
    </h1>
    <p className='text-richblack-100 text-sm'>
      Want to connect? My inbox is always open!
    </p>
    <div className='mt-7 text-richblack-200'>
       <ContactUsForm/>
    </div>
    </div>
  )
}

export default ContactForm