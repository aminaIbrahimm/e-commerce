import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { authContext } from './AuthContextProvider';

export let wishlistContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const { token } = useContext(authContext);
  const [wishlistIds, setWishlistIds] = useState([]);

  async function getWishlist() {
    setIsLoading(true);
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token }
      });
      setWishlist(res.data.data);
      setWishlistIds(res.data.data.map(product => product._id));
    } catch (error) {
      console.log(error);
      setWishlist([]);
      setWishlistIds([]); 
    } finally {
      setIsLoading(false);
    }
  }

  async function addToWishlist(productId) {
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, {
        headers: { token }
      });
      await getWishlist(); 
      return true;
    } catch (error) {
      return false;
    }
  }

  async function removeFromWishlist(id) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token }
      });
      await getWishlist(); 
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <wishlistContext.Provider value={{ wishlist, isLoading, getWishlist, addToWishlist, removeFromWishlist, products, wishlistIds }}>
      {children}
    </wishlistContext.Provider>
  );
}
