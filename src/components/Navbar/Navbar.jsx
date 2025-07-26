import React, {useContext, useEffect, useState} from 'react'
import Style from './Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { authContext } from '../../Context/AuthContextProvider'

export default function Navbar() {
  let {token,setToken} = useContext(authContext)
  let navigate = useNavigate("token")
  const location = useLocation();
  function logout() {
    setToken(null)
    localStorage.removeItem("token")
    navigate("/login")
  }
  return <>
    <nav className='bg-gray-200 py-3 fixed w-full z-[999] overflow-auto top-0'>
      <div className="container mx-auto flex items-center">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        {token ? <ul className='flex gap-3 ms-4'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>products</Link></li>
          <li><Link to='/wishlist'>wishlist</Link></li>
          <li><Link to='/cart'>cart</Link></li>
          <li><Link to='/categories'>categories</Link></li>
          <li><Link to='/brand'>brand</Link></li>
        </ul> : null}
        <ul className='flex gap-3 ms-auto'>
          <li><i className="fa-brands fa-facebook-f"></i></li>
          <li><i className="fa-brands fa-tiktok"></i></li>
          <li><i className="fa-brands fa-twitter"></i></li>
          <li><i className="fa-brands fa-yahoo"></i></li>
          <li><i className="fa-brands fa-github"></i></li>
          {token ? <li><span onClick={()=>logout()}>Logout</span></li> : <>
            <li><Link className={`hover:text-green-600 ${location.pathname === "/login" ? "text-green-600 font-bold" : ""}`} to='/login'>Login</Link></li>
            <li><Link className={`hover:text-green-600 ${location.pathname === "/register" ? "text-green-600 font-bold" : ""}`} to='/register'>Register</Link></li>
          </>}
        </ul>
      </div>
    </nav>
 </>
}