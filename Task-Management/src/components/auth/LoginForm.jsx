import { useDispatch, useSelector } from "react-redux"
import {Link,useNavigate} from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {login} from "../../services/operations/authAPI"
import { useState } from "react"

export default function LoginForm() {
    const navigate =useNavigate()
    const dispatch= useDispatch()
    const [formData ,setFormData ] =useState({
        email:"",
        password:"",
    })
     const [showPassword,setShowPassword] =useState(false)
     const {email,password} =formData

     const handleOnChange =(e) =>{
       setFormData((prevData) =>({
        ...prevData,
        [e.target.name] :e.target.value
       }))
     }
     const handleOnSubmit =(e) =>{
        e.preventDefault()
        dispatch(login(email,password,navigate))
     }

     return(
        <form
        onSubmit={handleOnSubmit}
        className="mt-6 flex w-full flex-col gap-y-4">
             <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.75rem] text-richblack-500">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    style={{
                        boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)",

                    }}
                    className="w-full rounder-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
             </label>
             <label className="relative">
               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-500">
                 Password <sup className="text-pink-200">*</sup>
               </p>
               <input
                required
                name="password"
                type={showPassword ? "text" :"password"}
                value={password}
                onChange={handleOnChange}
                placeholder="Enter password"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                <span
                onClick={() => setShowPassword((prev) =>!prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {
                        showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ):(
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )
                    }
                </span>
                <Link to="/forget-password">
                   <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                      Forgot Password
                   </p> 
                </Link>
             </label>
             <button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                type="submit">
                Log In
             </button>
             <div className="flex flex-row">
              <h3>new here ,create a admin account . </h3>
             <button className="text-blue-100 text-lg font-semibold px-[3px] cursor-pointer"
                onClick={()=>navigate('/sign-in')}>
                sign in
             </button>
             </div>
        </form>
     )
}

