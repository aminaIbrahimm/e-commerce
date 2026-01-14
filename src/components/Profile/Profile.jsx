import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function Profile() {
  const { userName,userEmail,idUser } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getOrders(){
    try {
      setIsLoading(true);
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`)
      setOrders(res.data)
    }catch(err){
      console.log("error");
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

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

      {isLoading ? (<div className='flex justify-center items-center'>
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
      ):(<>{orders.length > 0 ? (
        <div className="flex justify-center items-center flex-col">
        <table className="my-5 text-center">
          <thead>
            <tr>
              <th className="px-3">Image</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Count</th>
              <th>Price</th>
              <th className="px-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,idx) => (
            <tr key={`${order._id}-${idx}`} className='shadow-lg'>
              <td className="md:p-5 ps-3">
                <img
                  src={order.cartItems[0].product.imageCover}
                  className="w-50 rounded"
                  alt={order.cartItems[0].product.title}
                />
              </td>
              <td className="py-5 px-2 md:p-0 w-50 md:w-60">
                <h4>{order.cartItems[0].product?.title}</h4>
              </td>
             <td className="w-12 md:w-30 px-1">
               <h4>{order.cartItems[0].product?.brand.name}</h4>
              </td>
              <td className="w-8 md:w-30 px-1">
               <h4>{order.cartItems[0].count}</h4>
              </td>
              <td className="w-12 md:w-30 px-1">
               <h4>{order.cartItems[0].price} EGP</h4>
              </td>
              <td className="w-20 md:w-30 px-1 pe-3">
               <h4>{order.createdAt.split("T")[0]}</h4>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      ):(<p className='text-center text-2xl m-5 mb-10 bg-neutral-100 p-5 rounded shadow-lg'>
        You have no orders yet. <i className="fa-regular fa-face-frown text-red-700"></i>
        </p>)}</>
    )}
    
    </div>
  );
}