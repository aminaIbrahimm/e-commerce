import React, { useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
export default function ProductDetails() {
  const [isLoading,setisLoading] = useState(false)
  let {id,category} = useParams()
  const [product,setProduct] = useState(null)
  const [relatedProduct,setRelatedProduct] = useState(null)
  async function getSpecifiProduct(){
   setisLoading(true)
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   console.log(data.data);
   setProduct(data.data)
   setisLoading(false)
  }
  async function getProducts(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    console.log(data.data);
    let newProduct = data.data.filter((product)=>{
      return product.category.name == category
    })
    setRelatedProduct(newProduct)
  }
  useEffect(()=>{
    getSpecifiProduct(id)
    getProducts(category)
  } , [id])
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
  return <>
  <div className='grid grid-cols-[1fr_2fr] gap-5 items-center'>
    <div className='bg-amber-400'>
      <img src={product?.imageCover} alt="" />
    </div>
    <div className=''>
      <h2 className='mb-3'>{product?.title}</h2>
      <h3 className='mb-3 text-gray-400'>{product?.description}</h3>
      <h3>{product?.category.name}</h3>
      <div className="flex justify-between">
        {product?.priceAfterDiscount ?<div className='flex gap-2'>
        <h3 className='text-red-500 line-through'>{product?.price} EGP</h3>
        <h3>{product?.priceAfterDiscount} EGP</h3></div>
         : <h3>{product?.price}</h3>}
        <span><i className="fa-solid fa-star text-yellow-400"></i>{product?.ratingsAverage}</span>
      </div>
      <button className=' hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-200 border border-green-400 rounded-md w-full py-1.5 my-5'>Add To Cart</button>
    </div>
  </div>
  <h2>Related Products</h2>
  <div className="parent gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {relatedProduct ?.map((product)=><div className='group cursor-pointer relative shadow-xl p-2 overflow-hidden' key={product._id}>
        <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} alt={product.title} />
          <h3 className='text-sm text-green-700'>{product.category.name}</h3>
          <h2>{product.title.split(" ",2).join(" ")}</h2>
          <div className='flex justify-between'>
            {product.priceAfterDiscount ?<>
            <h3 className='text-red-500 line-through'>{product.price} EGP</h3>
            <h3>{product.priceAfterDiscount} EGP</h3>
            </> : <h3>{product.price}</h3> }
            <span><i className="fa-solid fa-star text-yellow-400"></i>{product.ratingsAverage}</span>
          </div>
          {product.priceAfterDiscount ? <span className="bg-red-100 text-red-800 absolute top-0 text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm dark:bg-red-900 dark:text-red-300">Sale</span> : null}
        </Link>
        <button className='group-hover:translate-y-0 translate-y-[200%] hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-200 border border-green-400 rounded-md w-full py-1.5 my-5'>Add To Cart</button>
      </div>)}
    </div>
  </>
}