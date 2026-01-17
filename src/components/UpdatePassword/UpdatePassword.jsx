import React, { useContext, useState } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast'
import * as Yup from "yup";


export default function UpdatePassword() {
    const{token} = useContext(authContext)
    const[isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const passwordForm= useFormik({
        initialValues:{
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        validationSchema : Yup.object({
            currentPassword: Yup.string()
              .required("Current password is required"),
          
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("New password is required"),
          
            rePassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords do not match")
              .required("Confirm password is required"),
          }),
        onSubmit: (values)=>{
            setIsLoading(true)
            axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",values,{headers:{token}})
            .then((res)=>{
                toast.success("Password updated successfully");

                if (res.data.token) {
                localStorage.setItem("userToken", res.data.token);
                }
                navigate("/profile")
            }).catch((err)=>{
                toast.error(err.response?.data?.message || "Failed to update password")
                console.log("error");
                
            }).finally(()=>setIsLoading(false))
        }
    })


  return (
    <div className='shadow-lg p-5 text-gray-800 rounded mt-30 mb-10 w-10/12 md:w-5/12 mx-auto'>
      <h3 className='text-2xl font-bold text-center mb-5'>Update Your Password</h3>
      <form onSubmit={passwordForm.handleSubmit} className='space-y-2'>
        <label htmlFor="currentPassword">Current Password:</label>
        <input type="password" name='currentPassword' value={passwordForm.values.currentPassword} onChange={passwordForm.handleChange} onBlur={passwordForm.handleBlur} id='currentPassword' className='shadow-lg px-2 py-1 rounded w-full border border-gray-100'/>
        {passwordForm.touched.currentPassword && passwordForm.errors.currentPassword && (
  <p className="text-red-600 text-sm">{passwordForm.errors.currentPassword}</p>
)}
        <label htmlFor="password">Password:</label>
        <input type="password" name='password' value={passwordForm.values.password} onChange={passwordForm.handleChange} onBlur={passwordForm.handleBlur} id='password' className='shadow-lg px-2 py-1 rounded w-full border border-gray-100'/>
        {passwordForm.touched.password && passwordForm.errors.password && (
  <p className="text-red-600 text-sm">{passwordForm.errors.password}</p>
)}
        <label htmlFor="rePassword">rePassword:</label>
        <input type="password" name='rePassword' value={passwordForm.values.rePassword} onChange={passwordForm.handleChange} onBlur={passwordForm.handleBlur} id='rePassword' className='shadow-lg px-2 py-1 rounded w-full border border-gray-100'/>
        {passwordForm.touched.rePassword && passwordForm.errors.rePassword && (
  <p className="text-red-600 text-sm">{passwordForm.errors.rePassword}</p>
)}
        <button
            disabled={isLoading ? true : false}
            type="submit"
            className="cursor-pointer my-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fa-solid fa-spinner"></i> : "Add New Password"}
          </button>
      </form>
    </div>
  )
}
