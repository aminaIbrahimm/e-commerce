import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContextProvider';
import { wishlistContext } from '../../Context/WishlistContextProvider';

export default function DisplayProducts({ filterproducts }) {
  const { addToWishlist, removeFromWishlist, getWishlist,wishlistIds } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
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

  async function getProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  }

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

  const displayData = filterproducts?.length > 0 ? filterproducts : products;

  return (
    <div className="parent gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {displayData.map((product) => (
        <div key={product._id} className="group cursor-pointer relative shadow-xl p-2 overflow-hidden">
          <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} alt={product.title} />
            <h3 className="text-sm text-green-700">{product.category.name}</h3>
            <h2>{product.title.split(" ", 2).join(" ")}</h2>
            <div className="flex justify-between">
              {product.priceAfterDiscount ? (
                <>
                  <h3 className="text-red-500 line-through">{product.price} EGP</h3>
                  <h3>{product.priceAfterDiscount} EGP</h3>
                </>
              ) : (
                <h3>{product.price} EGP</h3>
              )}
              <span>
                <i className="fa-solid fa-star text-yellow-400"></i>
                {product.ratingsAverage}
              </span>
            </div>
            {product.priceAfterDiscount && (
              <span className="bg-red-100 text-red-800 absolute top-0 text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm dark:bg-red-900 dark:text-red-300">
                Sale
              </span>
            )}
          </Link>
          <button onClick={() => toggleWishlist(product._id)} className="absolute right-2 z-10">
            <i className={`fa fa-heart text-2xl cursor-pointer transition-colors duration-300 ${wishlistIds.includes(product._id) ? 'text-red-600' : 'text-green-600'}`}></i>
          </button>
          <button onClick={() => addCart(product._id)} className="group-hover:translate-y-0 translate-y-[200%] hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-200 border border-green-400 rounded-md w-full py-1.5 my-7">Add To Cart </button>
        </div>
      ))}
    </div>
  );
}
