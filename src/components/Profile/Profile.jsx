import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import AllOrder from '../AllOrder/AllOrder';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { TfiEmail } from "react-icons/tfi";
import { FaPhone, FaRegTrashAlt, FaUser } from 'react-icons/fa';
import { FaLocationDot, FaRegFaceLaughBeam } from 'react-icons/fa6';


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
                <h2 className="text-2xl md:text-3xl font-bold ms-5 flex items-center gap-1">
            Hello, {userName || "Guest"} !{" "}
            <FaRegFaceLaughBeam className='text-green-700'/>
          </h2>
          <p className="text-lg ms-10 mb-3 flex items-center">
            <TfiEmail className='me-2'/>
            {userEmail || "Not provided"}
          </p>
          <Link to={"/updateData"} className='shadow-lg px-3 py-2 bg-green-700 hover:bg-green-800 text-white transition duration-100 rounded me-5 ms-20'>
            Update Data
          </Link>
          <Link to={"/updatePassword"} className='shadow-lg px-3 py-2 bg-green-700 hover:bg-green-800 text-white transition duration-100 rounded'>
            Change Password
          </Link>
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
            {address.map((addr, index) => (
              <div key={addr._id || index} className="shadow-lg p-3 my-2 rounded flex justify-between items-center md:mx-20">
                <div className=''>
                <p className='text-xl pb-3 flex items-center gap-1'><FaUser className='text-green-700'/>
                {addr.name}</p>
                <p className='text-xl pb-3 flex items-center gap-1'><FaPhone className='text-green-700'/>
                {addr.phone}</p>
                <p className='text-xl pb-3 flex items-center gap-1'><FaLocationDot className='text-green-700'/>
                {addr.details}, {addr.city}</p>
                </div>
              <button onClick={()=> deleteAddress(addr._id)} className='cursor-pointer transition hover:scale-110 duration-100'><FaRegTrashAlt className='text-red-600 text-2xl'/>
              </button>
              </div>
              
            ))}
            {address.length === 0 && <p className='text-center text-2xl shadow-lg p-3 bg-gray-100 rounded'>No Addresses Yet !</p>}
            </>)}
          </div>
          <div className="flex justify-center">
          <Link to={"/addAddress"} className='text-white shadow-lg bg-green-700 rounded py-2 px-5 hover:bg-green-800 transition duration-150'>Add New Address</Link>
          </div>
        </div>
      
      <AllOrder/>
    </div>
  )
}