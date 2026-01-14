import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import AllOrder from '../AllOrder/AllOrder';

export default function Profile() {
  const { userName,userEmail } = useContext(authContext);
  


  return (
    <div className="mt-24 text-gray-900">
      <h2 className="text-3xl font-bold ms-5">
        Hello, {userName || "Guest"} !{" "}
        <i className="fa-regular fa-face-grin-beam text-green-700"></i>
      </h2>
      <p className="text-lg ms-14">
        <i className="fa-regular fa-envelope me-2"></i>
        {userEmail || "Not provided"}
      </p>
      <p className="text-2xl font-bold mt-10 mb-5 md:ms-30 ms-5">My Orders</p>

      <AllOrder/>
    </div>
  );
}