import loginImg from "../asset/Image/loginImg.png"
import Template from "../components/auth/Template"

 function Login ()  {
  return (
    <Template
    title="welcome back"
    formType="login"
    description1="login to check your  work ."
    description2="Task."
    image={loginImg}
    />

  )
}

export default Login