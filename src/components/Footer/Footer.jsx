import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
import amazon from '../../assets/Amazon_Pay-Logo.wine.svg'
import american from '../../assets/American-Express-Color.png'
import paypal from '../../assets/PayPal.svg.webp'
import mastercard from '../../assets/MasterCard_early_1990s_logo.png'
import applelogo from '../../assets/Download_on_the_App_Store_Badge.svg.webp'
import googlelogo from '../../assets/Google_Play_Store_badge_EN.svg.webp'
export default function Footer() {
  return <>
  <div className=' bg-gray-300 start-0 end-0 p-8 bottom-0'>
    <h2 className='capitalize text-2xl px-4 md:px-0'>get the freshCart app</h2>
      <p className='text-gray-400 px-4 md:px-0'>We will send you a link, open it on your phone to download the app.</p>
      <div className="flex  px-8 my-5 space-x-3">
      <div className="w-full">
        <input type="email" id="email" className="outline-none
        w-full
        shadow-xs
        bg-white
        border 
        border-gray-300
          text-gray-900 
          text-sm rounded-lg
          focus:ring-blue-500
            focus:border-blue-500
            block
              p-2.5 
              
              dark:border-gray-600
                dark:placeholder-gray-400 
                
                dark:focus:ring-blue-500 
                dark:focus:border-blue-500 
                dark:shadow-xs-light" placeholder="Email..." />
      </div>
      <button type="button" className="xl:w-1/7 lg:w-1/5 md:w-1/4 sm:w-1/3 w-2/3 outline-none capitalize cursor-pointer  text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-2 py-1.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">share app link</button>
      </div>
    <hr className='text-gray-400 px-8' />
      <div className="flex items-center justify-between container mx-auto">
        <div className='flex items-center gap-2'>
          <h3 className='capitalize'>payment partners</h3>
          <img src={amazon} alt="" className='w-22 me-1'/>
          <img src={paypal} alt="" className='w-15 me-1'/>
          <img src={mastercard} alt="" className='w-15 me-1'/>
          <img src={american} alt="" className='w-15 me-1'/>
        </div>
        <div className='flex items-center gap-2'>
          <h3 className='capitalize'>get delevries with fresh cart</h3>
          <img src={applelogo} alt="" className='w-20 me-1'/>
          <img src={googlelogo} alt="" className='w-20 me-1'/>
        </div>
      </div>
    <hr className='text-gray-400 px-8' />
  </div>
  </>
}