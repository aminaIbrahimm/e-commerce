import React, { useContext, useEffect, useState } from 'react'
import Style from './AllOrder.module.css'
import { authContext } from '../../Context/AuthContextProvider'
import axios from 'axios'
export default function AllOrder() {
  let {idUser} = useContext(authContext)
  async function getUserOrder(){

    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`)
    console.log(data);
  }
  
  
  useEffect(()=>{
    getUserOrder()
  },[])
  return <>
  <div>AllOrder</div>
  </>
}