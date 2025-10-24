import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContextProvider'
import { ColorRing } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Cart() {
  let {getCart,totalPrice,products, numOfCart,isLoading,removeItem,updateQuantityProduct,deleteCart} = useContext(cartContext)
  useEffect(()=>{
    getCart()
  },[])
  async function removeItemFromCart(id){
   let flag= await removeItem(id)
   if(flag){
    toast.success('Deleted !');

   }else{
    toast.error('This is an error!');
   }
  }
  async function updateProduct(id,count){
    let flag = await updateQuantityProduct(id,count)
    if(flag){
    toast.success('Updated !');

   }else{
    toast.error('This is an error!');
   }
  }
  if(isLoading){
      return <div className='flex justify-center items-center h-screen'>
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
  }
  return <div className=''>
    <div className='text-center my-10 '>
      <div>
        <h2 className='capitalize'>num of cart : {numOfCart} </h2>
      </div>
    </div>
    {products?.length>0 ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product)=> <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src= {product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {product.product.title}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <button onClick={()=>{updateProduct(product.product._id,product.count-1)}}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Quantity button</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                  </svg>
                </button>
                <div>
                  <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
                </div>
                <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Quantity button</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {product.price} 
            </td>
            <td className="px-6 py-4">
              <span onClick={()=>{removeItemFromCart(product.product._id)}} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
            </td>
          </tr> )}
          
        </tbody>
      </table>
      <div className="flex justify-center">
        <h2 className='capitalize text-2xl text-green-600 my-2'>total price: {totalPrice} EGP</h2>
      </div>
      <div className="flex justify-end mt-3">
        <button onClick={deleteCart} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear Cart </button>
        <Link to="/payment" type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Payment </Link>
      </div>
    </div>
     : <div class="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Not Product Found</span></div>}
  </div>
}