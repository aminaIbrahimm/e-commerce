import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContextProvider';
import { wishlistContext } from '../../Context/WishlistContextProvider';
import { useQuery } from '@tanstack/react-query';

export default function DisplayProducts({ filterproducts }) {
  
  const { addToWishlist, removeFromWishlist, getWishlist,wishlistIds } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);

  // const [isLoading, setIsLoading] = useState(false);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    // getProducts();
    getWishlist();
  }, []);

  // async function fetchWishlistIds() {
  //   try {
  //     const res = await getWishlist();
  //     const ids = res?.data?.map(item => item._id) || [];
  //     setWishlistIds(ids);
  //   } catch (error) {
  //     console.error("Failed to load wishlist", error);
  //   }
  // }

  // async function getProducts() {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //     setProducts(data.data);
  //   } catch (error) {
  //     console.error("Failed to fetch products", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function callApi() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let {isLoading, data} = useQuery({
    queryKey: ["product"],
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

  return (
    <div className="parent mx-2 mb-14 gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
      {displayData.map((product) => (
        <div
          key={product._id}
          className="group cursor-pointer relative shadow-xl p-2 overflow-hidden"
        >
          <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} alt={product.title} />
            <h3 className="text-sm text-green-700">{product.category.name}</h3>
            <div className="flex justify-between items-center">
              <h2>{product.title.split(" ", 2).join(" ")}</h2>
              <span>
                <i className="fa-solid fa-star text-yellow-400"></i>
                {product.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center relative px-2 py-5">
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
              <div className='flex gap-3'>
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
