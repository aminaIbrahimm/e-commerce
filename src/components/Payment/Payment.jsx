import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { authContext } from '../../Context/AuthContextProvider';
import { cartContext } from '../../Context/CartContextProvider';
import { useNavigate } from 'react-router-dom';
export default function Payment() {
  const [cashFlag, setCashFlag] = useState(false)
  let navigate = useNavigate()
  let {token} = useContext(authContext)
  let {cartId} = useContext(cartContext)
  function cashOrder(values){
    
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{headers:{token}})
    .then((res)=>{
      console.log(res);
      navigate("/allOrder")
    }).catch((error)=>{
      console.log(error);
    })
  }
  function onlineOrder(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,values,{headers:{token}})
    .then((res)=>{
      console.log(res);
      window.open(res.data.session.url, "_self");
    }).catch((error)=>{
      console.log(error);
    }) 
  }
  function paymentOrder(values){
    let shippingAddress = {
      shippingAddress:values
    }
    console.log(shippingAddress);
    if(cashFlag){
      cashOrder(shippingAddress)
    }else{
      onlineOrder(shippingAddress)
    }
  }
  let paymentForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: paymentOrder
  })
  return <>
  <form onSubmit={paymentForm.handleSubmit} className='w-1/2 mx-auto my-10'>
    <div className="relative z-0 w-full mb-5 group">
      <input name="details" value={paymentForm.values.details} onChange={paymentForm.handleChange} type="text"  id="floating_details" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>
    <div class="relative z-0 w-full mb-5 group">
      <input name="phone" value={paymentForm.values.phone} onChange={paymentForm.handleChange} type="tel" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
    <div class="relative z-0 w-full mb-5 group">
      <input name="city" value={paymentForm.values.city} onChange={paymentForm.handleChange} type="text" id="floating_city" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>
  <button onClick={()=>setCashFlag(true)} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cash</button>
  <button onClick={()=>setCashFlag(false)} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Online</button>

  </form>
  </>
}