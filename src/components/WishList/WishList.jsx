import React, { useContext, useEffect } from 'react';
import { wishlistContext } from '../../Context/WishListContextProvider.jsx';
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
  return (
    <div className='bg-gray-100 m-15 p-7 rounded'>
      <h2 className='text-3xl mb-4'>My wish List</h2>
      {wishlist?.length === 0 ? <p>No items in wishlist.</p> : (
        <div className="">
          {wishlist?.map(product => (
            <div key={product._id} className="p-4 rounded shadow flex items-center justify-between">
              <img src={product.imageCover} alt={product.title} className=" h-32 object-cover mb-2" />
                <div className='flex-1 ms-3'>
                  <h3 className="text-lg">{product.title}</h3>
                  <h3 className='text-green-600'>{product.price} EGP</h3>
                  <button onClick={() => {removeItems(product._id)}} className=" text-red-600 cursor-pointer font-semibold mt-1">
                    <i className="fa-solid fa-trash me-1"></i>
                    Remove</button>
                </div>
                <button onClick={()=>{addCart(product._id)}} className='ms-auto p-2  hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-200 border border-green-400 rounded-md'>add To Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}