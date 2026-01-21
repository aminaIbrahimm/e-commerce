import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContextProvider';
import { wishlistContext } from '../../Context/WishlistContextProvider';
import { useQuery } from '@tanstack/react-query';
import { FaHeart} from "react-icons/fa";
import { FaCartPlus, FaRegHeart,FaStar } from "react-icons/fa6";

export default function DisplayProducts({ filterproducts }) {
  
  const { addToWishlist, removeFromWishlist, getWishlist,wishlistIds } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);
  // const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getWishlist();
  }, []);

  async function callApi() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}&limit=40`)
  }
  let {isLoading, data} = useQuery({
    queryKey: ["product" , currentPage],
    queryFn: callApi,
  });

  async function addCart(id) {
    const flag = await addToCart(id);
    flag ? toast.success('Added to cart!') : toast.error('Something went wrong!');
  }

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  const displayData = filterproducts?.length > 0 ? filterproducts : data?.data?.data || [];
  

  console.log("Display");
  
  return (
    <div className="parent mx-2 mb-14 gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
      {displayData.map((product) => (
        <div
          key={product._id}
          className="group cursor-pointer relative shadow-xl p-2 overflow-hidden"
        >
          <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>

            <img loading='lazy' width={300} height={300} src={product.imageCover} srcSet={`
              ${product.imageCover}?w=300 300w,
              ${product.imageCover}?w=600 600w,
              ${product.imageCover}?w=900 900w
            `}
            sizes="(max-width: 768px) 50vw, 187px" alt={product.title} className='object-cover w-full h-72'/>
            <h3 className="text-sm text-green-700">{product.category.name}</h3>
            <div className="flex justify-between items-center">
              <h2>{product.title.split(" ", 2).join(" ")}</h2>
              <span className='flex items-center gap-1'>
                <FaStar className='text-yellow-400'/>
                {product.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center relative px-2 py-5">
              <div>
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
              <div className='flex gap-3'>
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className=" transition-all duration-300 hover:scale-110 "
                >
                  {wishlistIds.includes(product._id)
                    ? (<FaHeart className='text-red-700 text-2xl'/>)
                    : (<FaRegHeart className='text-red-700 text-2xl'/>)
                  }
                </button>
                <button
                  onClick={() => addCart(product._id)}
                  className=" cursor-pointer text-2xl text-green-600 transition-all duration-300 hover:scale-110"
                ><FaCartPlus /></button>
              </div>
              
            </div>
            {product.priceAfterDiscount && (
              <span className="bg-red-100 text-red-800 absolute top-0 text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm dark:bg-red-900 dark:text-red-300">
                Sale
              </span>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
