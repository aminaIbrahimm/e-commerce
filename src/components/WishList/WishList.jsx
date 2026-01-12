import React, { useContext, useEffect } from 'react';
import { wishlistContext } from '../../Context/WishlistContextProvider';
import { ColorRing } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';

export default function WishList() {
  const { wishlist, isLoading, getWishlist, removeFromWishlist } = useContext(wishlistContext);
  let {addToCart} = useContext(cartContext)
  
  useEffect(() => {
    getWishlist();
  }, []);
  async function addCart(id){
   let flag = await addToCart(id)
   if(flag){
    toast.success('Successfully added!');

   }else{
    toast.error('This is an error!');
   }
  }
  async function removeItems(id){
   let flag= await removeFromWishlist(id)
   if(flag){
    toast.success('Deleted !');
    getWishlist();
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
  return (<div className='flex justify-center items-center'>
    <div className="shadow-xl m-2 md:m-15 p-7 mx-auto rounded mt-24 md:w-6/12 ">
      <h2 className="text-3xl font-bold text-teal-900 mb-4">
        From Your Wish List
      </h2>
      {wishlist?.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="">
          {wishlist?.map((product) => (
            <div
              key={product._id}
              className="py-1 rounded shadow flex items-center justify-between"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="md:w-64 h-32 md:h-50 object-cover rounded-2xl"
              />
              <div className="flex justify-around w-full items-center ml-3 md:ml-0">
                <div>
                  <h3 className="text-2xl font-semibold">{product.title}</h3>
                  <h3 className="text-green-600 text-2xl">
                    {product.price} EGP
                  </h3>
                </div>
                <div className=" flex gap-2 justify-center items-center">
                  <button
                    onClick={() => {
                      removeItems(product._id);
                    }}
                    className=" text-red-600 cursor-pointer font-semibold transition-all duration-300 hover:scale-110"
                  >
                    <i className="fa-solid fa-trash me-1 text-2xl"></i>
                  </button>
                  <button
                    onClick={() => addCart(product._id)}
                    className="fa fa-cart-plus cursor-pointer text-2xl text-green-600 transition-all duration-300 hover:scale-110"
                  ></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>);
}