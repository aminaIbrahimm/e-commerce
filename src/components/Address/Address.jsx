import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { authContext } from '../../Context/AuthContextProvider';

export default function Address() {
    const {token} = useContext(authContext)
    const [isLoading , setIsLoading] = useState(false)
    const navigate = useNavigate()
    const addressForm = useFormik({
        initialValues:{
            name: "",
            phone: "",
            details: "",
            city: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, "Min 3 characters").required("Required"),
            phone: Yup.string()
              .matches(/^01[0125][0-9]{8}$/, "Must be an Egyptian phone number")
              .required("Required"),
            details: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
          }),
          onSubmit: (values) => {
            setIsLoading(true)
            axios.post("https://ecommerce.routemisr.com/api/v1/addresses",values,{headers:{token}})
            .then((res)=>{
                const newAddress = res.data.data;
                const currentAddresses = JSON.parse(localStorage.getItem("tempAddresses")) || [];
                currentAddresses.push(newAddress);
                // localStorage.setItem("userName",res.data.data.name)
                // localStorage.setItem("phone",res.data.data.phone)
                // localStorage.setItem("details",res.data.data.details)
                // localStorage.setItem("city",res.data.data.city)
                console.log(res);
                localStorage.setItem(
                    "tempAddresses",
                    JSON.stringify(currentAddresses)
                  );
                  
                navigate("/profile");
            }).catch((err)=>{
                console.log("error");
                
            }).finally(()=>{
                setIsLoading(false)
            })
            
          },
    })

  return (
    <div className='shadow-lg text-gray-800 p-5 mx-auto w-10/12 md:w-5/12 my-10 mt-30 rounded'>
        <h3 className='text-center font-bold text-2xl'>Add New Address</h3>
        <form onSubmit={addressForm.handleSubmit} className='space-y-2'>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' value={addressForm.values.name} onChange={addressForm.handleChange} onBlur={addressForm.handleBlur} id='name' placeholder='Your Name..' className='border border-gray-300 w-full rounded px-3 py-1.5' />
            
            <label htmlFor="phone">Phone number:</label>
            <input type="text" name='phone' value={addressForm.values.phone} onChange={addressForm.handleChange} onBlur={addressForm.handleBlur} id='phone' placeholder='Your Phone..' className='border border-gray-300 w-full rounded px-3 py-1.5' />
            
            <label htmlFor="details">Home Details:</label>
            <input type="text" name='details' value={addressForm.values.details} onChange={addressForm.handleChange} onBlur={addressForm.handleBlur} id='details' placeholder='Your Home Details..' className='border border-gray-300 w-full rounded px-3 py-1.5' />
            
            <label htmlFor="city">City:</label>
            <input type="text" name='city' value={addressForm.values.city} onChange={addressForm.handleChange} onBlur={addressForm.handleBlur} id='city' placeholder='Your City..' className='border border-gray-300 w-full rounded px-3 py-1.5' />

            <button
            disabled={isLoading ? true : false}
            type="submit"
            className="cursor-pointer my-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fa-solid fa-spinner"></i> : "Add New Address"}
          </button>
        </form>
    </div>
  )
}
