import { IconBaseProps } from 'react-icons';
import { BiWorld } from 'react-icons/bi';
import {HiChatBubbleLeftRight} from "react-icons/hi2"
import {IoCall} from "react-icons/io5"
const ContactDetails = () => {
  // Define a type for the icon names
  type IconName = 'HiChatBubbleLeftRight' | 'BiWorld' | 'IoCall';

  // Array with explicit typing for the icon property
  const contactDetails: {
    icon: IconName;
    heading: string;
   
    details: string;
  }[] = [
    {
      icon: 'HiChatBubbleLeftRight',
      heading: 'Chat with me',
      
      details: 'iamsuraj3000@gmail.com',
    },
    {
      icon: 'BiWorld',
      heading: 'Location',
     
      details: '1, tollygung circular road kolkata-700053',
    }
    
  ];

  return (
    <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6'>
      {contactDetails.map((ele, i) => {
        let Icon: React.ComponentType<IconBaseProps> =
          HiChatBubbleLeftRight || BiWorld || IoCall;

        switch (ele.icon) {
          case 'HiChatBubbleLeftRight':
            Icon = HiChatBubbleLeftRight;
            break;
          case 'BiWorld':
            Icon = BiWorld;
            break;
          default:
            break;
        }

        return (
          <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200' key={i}>
            <div className='flex flex-row items-center gap-3'>
              <Icon size={25} />
              <h1 className='text-lg font-semibold text-richblack-5'>{ele?.heading}</h1>
            </div>
            
            <p className='font-semibold'>{ele?.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
