import loginImg from "../asset/Image/loginImg.png"
import Template from "../components/auth/Template"

 function Signup ()  {
  return (
    <Template
    title="welcome to Task"
    formType="signup"
    description1="Easy and simple way to manage work."
    description2="Create a account and add your team start track there work."
    image={loginImg}
    />

  )
}

export default Signup