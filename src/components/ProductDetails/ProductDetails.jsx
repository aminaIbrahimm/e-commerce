import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { wishlistContext } from '../../Context/WishlistContextProvider';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { addToWishlist, removeFromWishlist, getWishlist,wishlistIds } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);

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

  async function toggleWishlist(id) {
    if (wishlistIds.includes(id)) {
      const flag = await removeFromWishlist(id);
      if (flag) {
        toast.success("Removed from wishlist!");
        await getWishlist();
      } else {
        toast.error("Error while removing!");
      }
    } else {
      const flag = await addToWishlist(id);
      if (flag) {
        toast.success("Added to wishlist!");
        await getWishlist();     
      } else {
        toast.error("Error while adding!");
      }
    }
  }

  async function addCart(id) {
    const flag = await addToCart(id);
    flag ? toast.success('Added to cart!') : toast.error('Something went wrong!');
  }
  
  if(isLoading || !product){
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
  return (
    <>
      <div className="grid grid-1 md:grid-[1fr_2fr] gap-5 items-center justify-center bg-neutral-100 p-6 mb-3">
        <h3 className="text-center text-3xl font-bold">
          {product?.category.name}
        </h3>
        <div className="flex justify-center shadow-2xl rounded-2xl">
          <img
            src={product?.imageCover}
            className="w-72"
            alt={product?.title}
          />
        </div>
        <div className="bg-neutral-200 rounded-2xl shadow-2xl p-5 w-84">
          <div className="flex justify-between">
            <h2 className="mb-1">{product?.title}</h2>
            <span>
              <i className="fa-solid fa-star text-yellow-400"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <h3 className="mb-3 text-gray-400">{product?.description}</h3>

          <div className="flex justify-between">
            {product?.priceAfterDiscount ? (
              <div className="">
                <h3 className="text-red-500 line-through">
                  {product?.price} EGP
                </h3>
                <h3>{product?.priceAfterDiscount} EGP</h3>
              </div>
            ) : (
              <h3>{product?.price} EGP</h3>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => toggleWishlist(product._id)}
                className=" transition-all duration-300 hover:scale-110 "
              >
                <i
                  className={`cursor-pointer text-2xl transition-all duration-300
                    ${
                      wishlistIds.includes(product._id)
                        ? "fa fa-heart text-red-600"
                        : "fa-regular fa-heart text-red-600"
                    }
                  `}
                ></i>
              </button>
              <button
                onClick={() => addCart(product._id)}
                className="fa fa-cart-plus cursor-pointer text-2xl text-green-600 transition-all duration-300 hover:scale-110"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-semibold mb-2 mx-2">Related Products</h2>
      <div className="parent gap-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-5 mx-5">
        {relatedProduct?.map((product) => (
          <div
            className="group cursor-pointer relative shadow-xl p-2 overflow-hidden"
            key={product._id}
          >
            <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} alt={product.title} />
              <h3 className="text-sm text-green-700">
                {product.category.name}
              </h3>
              <div className="flex justify-between items-center">
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <span>
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  {product.ratingsAverage}
                </span>
              </div>
              <div className="flex justify-between items-center relative py-2">
                <div className="">
                  {product.priceAfterDiscount ? (
                    <>
                      <h3 className="text-red-500 line-through">
                        {product.price} EGP
                      </h3>
                      <h3>{product.priceAfterDiscount} EGP</h3>
                    </>
                  ) : (
                    <h3>{product.price} EGP</h3>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className=" transition-all duration-300 hover:scale-110 "
                  >
                    <i
                      className={`cursor-pointer text-2xl transition-all duration-300
                    ${
                      wishlistIds.includes(product._id)
                        ? "fa fa-heart text-red-600"
                        : "fa-regular fa-heart text-red-600"
                    }
                  `}
                    ></i>
                  </button>
                  <button
                    onClick={() => addCart(product._id)}
                    className="fa fa-cart-plus cursor-pointer text-2xl text-green-600 transition-all duration-300 hover:scale-110"
                  ></button>
                </div>
              </div>
              {product.priceAfterDiscount ? (
                <span className="bg-red-100 text-red-800 absolute top-0 text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm dark:bg-red-900 dark:text-red-300">
                  Sale
                </span>
              ) : null}
            </Link>
            {/* <button className="group-hover:translate-y-0 translate-y-[200%] hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-200 border border-green-400 rounded-md w-full py-1.5 my-5">
              Add To Cart
            </button> */}
          </div>
        ))}
      </div>
    </>
  );
}