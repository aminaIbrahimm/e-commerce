import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import AllOrder from '../AllOrder/AllOrder';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function Profile() {
  const { userName,userEmail,token} = useContext(authContext);
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get("https://ecommerce.routemisr.com/api/v1/addresses", {
      headers: { token }
    })
    .then(res => {
      
      const apiAddresses = res.data.data;
      const tempAddresses = JSON.parse(localStorage.getItem("tempAddresses")) || [];
      const filteredTempAddresses = tempAddresses.filter(addr => addr && addr.name);
      setAddress([...apiAddresses, ...filteredTempAddresses]);
    })
    .catch(err => {
      console.log(err)
    }).finally(()=>setIsLoading(false))
  },[token])

  function deleteAddress(addressId){
    axios.delete(`https:ecommerce.routemisr.com/api/v1/addresses/${addressId}`,{headers:{token}}) 
    .then(()=>{ 
      setAddress(prev => prev.filter(addr => addr._id !== addressId) ) 
      const tempAddresses = JSON.parse(localStorage.getItem("tempAddresses")) || [];
      const updatedTemp = tempAddresses.filter( addr => addr._id !== addressId ); 
      localStorage.setItem( "tempAddresses", JSON.stringify(updatedTemp) ) 
    }).catch(err => { console.log(err); })
  }
  
  return (
    <div className="mt-24 text-gray-900">
                <h2 className="text-2xl md:text-3xl font-bold ms-5">
            Hello, {userName || "Guest"} !{" "}
            <i className="fa-regular fa-face-grin-beam text-green-700"></i>
          </h2>
          <p className="text-lg ms-10">
            <i className="fa-regular fa-envelope me-2"></i>
            {userEmail || "Not provided"}
          </p>
          
        <div className='p-5 shadow-lg md:mx-80'>
          <div className='mt-2 mb-7'>
            <h3 className='text-2xl font-bold my-3'>My Address</h3>
            {isLoading? (<div className='flex justify-center items-center'>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  /> 
            </div>
            ) : ( <>
            {address.map((addr, index) => (<>
              <div key={addr._id || index} className="shadow-lg p-3 my-2 rounded flex justify-between items-center md:mx-20">
                <div className=''>
                <p className='text-xl pb-3'><i className="fa-solid fa-user text-green-700"></i> {addr.name}</p>
                <p className='text-xl pb-3'><i className="fa-solid fa-phone text-green-700"></i> {addr.phone}</p>
                <p className='text-xl pb-3'><i className="fa-solid fa-location-dot text-green-700"></i> {addr.details}, {addr.city}</p>
                </div>
              <button onClick={()=> deleteAddress(addr._id)} className='cursor-pointer transition hover:scale-110 duration-100'><i className="fa-solid fa-trash-can text-red-600 text-2xl"></i></button>
              </div>
              
            </>))}
            {address.length === 0 && <p className='text-center text-2xl shadow-lg p-3 bg-gray-100 rounded'>No Addresses Yet !</p>}
            </>)}
          </div>
          <div className="flex justify-center">
          <Link to={"/updateData"} className='text-white shadow-lg bg-green-700 rounded py-2 px-5 hover:bg-green-800 transition duration-150 me-5'>Update My Account</Link>
          <Link to={"/addAddress"} className='text-white shadow-lg bg-green-700 rounded py-2 px-5 hover:bg-green-800 transition duration-150'>Add New Address</Link>
          
          </div>
        </div>
      
      <AllOrder/>
    </div>
  )
}