import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as Yup from "yup";

export default function UpdateData() {
  const {token,setUserName , setUserEmail} = useContext(authContext)
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()

  const dataForm = useFormik({
    initialValues:{
      name: "",
      email: "",
      phone: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
        .required("Phone is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true)
      axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/",values,{headers:{token}})
      .then((res)=>{
        const updatedUser = res.data.user
        const currentData = JSON.parse(localStorage.getItem("tempData")) || {};
        currentData.push(updatedUser);
        console.log("Updated Data from API:", updatedUser);
        localStorage.setItem("tempData",JSON.stringify(currentData))
        toast.success("Profile updated successfully");
        setUserName(updatedUser.name);
        setUserEmail(updatedUser.email);
        navigate("/profile")
      }).catch((err)=>{
        toast.error("Something went wrong")
        console.log("error");
      }).finally(()=> setIsLoading(false))
    }
  })
  return (
    <div className='shadow-lg p-5 text-gray-800 rounded mt-30 mb-10 w-10/12 md:w-5/12 mx-auto'>
      <h3 className='text-2xl font-bold text-center mb-5'>Update Your Data</h3>
      <form onSubmit={dataForm.handleSubmit} className='space-y-2'>
        <label htmlFor="name">Name:</label>
        <input type="text" name='name' value={dataForm.values.name} onChange={dataForm.handleChange} onBlur={dataForm.handleBlur} id='name' className='shadow-lg px-2 py-1 rounded w-full border border-gray-100' placeholder='your name...'/>
        <label htmlFor="email">Email:</label>
        <input type="text" name='email' value={dataForm.values.email} onChange={dataForm.handleChange} onBlur={dataForm.handleBlur} id='email' className='shadow-lg px-2 py-1 rounded w-full border border-gray-100' placeholder='your email...'/>
        <label htmlFor="phone">Phone:</label>
        <input type="text" name='phone' value={dataForm.values.phone} onChange={dataForm.handleChange} onBlur={dataForm.handleBlur} id='phone' className='shadow-lg px-2 py-1 rounded w-full border border-gray-100' placeholder='your phone...'/>

        <button
            disabled={isLoading ? true : false}
            type="submit"
            className="cursor-pointer my-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fa-solid fa-spinner"></i> : "Add New Data"}
          </button>
      </form>
    </div>
  )
}
