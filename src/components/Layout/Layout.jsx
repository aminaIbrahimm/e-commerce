import React, {useEffect, useState} from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout() {
  return <>
    <Navbar />
    <ScrollRestoration />
    <div className='container mx-auto mt-16'>
      <Outlet />
    </div>
    <Footer />
  </>
}
