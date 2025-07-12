import axios from 'axios'
import React, {  createContext, useContext } from 'react'
import { authContext } from './AuthContextProvider'
import { useState } from 'react'

export let cartContext = createContext()

export default function CartContextProvider({children}) {
    const [products,setProducts] = useState(null)
    const [numOfCart,setNumOfCart] = useState(null)
    const [totalPrice,setTotalPrice] = useState(null)
    const [isLoading,setisLoading] = useState(false)
    const [cartId,setcartId] = useState(null)
    let {token} = useContext(authContext)
    async function addToCart(productId){
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{
        headers:{token}
    })
    .then((res)=>{
        return true
    }).catch((error)=>{
        return false
    })
    }
    function getCart(){
        setisLoading(true)
        axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token}})
        .then((res)=>{
            setProducts(res.data.data.products)
            setNumOfCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            setcartId(res.data.cartId)
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setisLoading(false)
        })
    }
    async function removeItem(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers:{token}})
        .then((res)=>{
            console.log(res);
            setProducts(res.data.data.products)
            setNumOfCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            return true
        }).catch((error)=>{
            console.log(error);
            return false
        })
    }
    async function updateQuantityProduct(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{token}})
        .then((res)=>{
            console.log(res);
            setProducts(res.data.data.products)
            setNumOfCart(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            return true
        }).catch((error)=>{
            return false
        })
    }
    function deleteCart(){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{token}})
        .then((res)=>{
            console.log(res);
            setProducts([])
            setNumOfCart(0)
            setTotalPrice(0)
        }).catch((error)=>{
            console.log(error);
            
        })
    }
  return <cartContext.Provider value={{addToCart,getCart,products,numOfCart,totalPrice,isLoading,cartId,removeItem,updateQuantityProduct,deleteCart}}>
    {children}
  </cartContext.Provider>
}