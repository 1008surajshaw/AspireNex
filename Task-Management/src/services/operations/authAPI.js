import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice"
const BASE_URL =process.env.REACT_APP_BASE_URL

export function signUp(formData) {
  return async (dispatch) => {
    console.log(formData, "data is ...");
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", BASE_URL + "/auth/signup", formData);

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Successfully created");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Failed to add user");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", BASE_URL+"/auth/login", {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response.data.user.type)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        //console.log(response.data?.user?.type,"response of theis")
       
          navigate("/dashboard");
       
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
     
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function logout(navigate) {
    return (dispatch) => {
      console.log("one")
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
  
      // Logging to verify localStorage and state changes
      console.log("Token removed:", localStorage.getItem("token") === null)
      console.log("User removed:", localStorage.getItem("user") === null)
  
      toast.success("Logged Out")
      navigate("/")
    }
  }
  
  
  
  export function getPasswordResetToken(email , setEmailSent) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        console.log("hellow world")
        const response = await apiConnector("POST",BASE_URL+"/auth/reset-password-token" , {email,})
  
        console.log("RESET PASSWORD TOKEN RESPONSE....", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Reset Email Sent");
        setEmailSent(true);
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Failed to send email for resetting password");
      }
      dispatch(setLoading(false));
    }
  }
  
  export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", BASE_URL+"/auth/reset-password", {password, confirmPassword, token});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }
      dispatch(setLoading(false));
    }
  }

 