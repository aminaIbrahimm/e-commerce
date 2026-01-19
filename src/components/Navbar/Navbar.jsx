import React, {useContext, useRef, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContextProvider'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let {token,logoutUser} = useContext(authContext)
  const dropdownRef = useRef(null);
  let navigate = useNavigate("token")
  const location = useLocation();

  function logout() {
    logoutUser()
    navigate("/login")
  }
  
  return (
    <>
      <nav className="bg-white w-full z-20 top-0 start-0 fixed shadow-lg">
        <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="text-2xl md:text-3xl font-semibold">
            <i className="fa-brands fa-shopify text-green-700 px-3 text-4xl"></i>
            SooqNow
          </Link>
          <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
            <ul className="flex flex-col md:flex-row gap-2 ms-auto">
              {token ? (<>
                <div className=" relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hidden md:flex items-center gap-1 font-semibold cursor-pointer hover:text-green-700"
              >
                <i className="fa-solid fa-user"></i>
                Account
                <i className="fa-solid fa-chevron-down text-sm ms-1"></i>
              </button>
                
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:text-green-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="fa-regular fa-user me-2"></i> My Profile
                    </Link>
                    {/* <Link
                      to="/cart"
                      className="block px-4 py-2 hover:text-green-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="fa-solid fa-cart-shopping me-2"></i> Cart
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 hover:text-green-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="fa-regular fa-heart me-2"></i> Wishlist
                    </Link> */}
                    
                    <Link
                      onClick={()=> {logout(); setDropdownOpen(false);}}
                      className="block px-4 py-2 hover:text-red-600 cursor-pointer "
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout
                    </Link>
                </div>
                )}
                </div>
                </>) : (<>
                  <ul className="flex gap-3">
                    <li>
                      <Link
                        className={`hover:text-green-500 ${
                          location.pathname === "/login"
                            ? "text-green-500 font-bold"
                            : ""
                        }`}
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`hover:text-green-500 ${
                          location.pathname === "/register"
                            ? "text-green-500 font-bold"
                            : ""
                        }`}
                        to="/register"
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </>)}
            </ul>
            {token && (
              <button
                onClick={() => setOpen(!open)}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="navbar-sticky"
                aria-expanded={open}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            )}

            <div
              id="navbar-sticky"
              className={`${
                open ? "block" : "hidden"
              }  w-full md:block md:w-auto md:absolute md:left-[50%] md:top-[20%]`}
            >
              {token && (
                <ul className="absolute right-0 top-full w-5/12 bg-white shadow-md rounded-b-lg flex flex-col md:p-0 font-medium md:flex-row md:mt-0 justify-center transition duration-100">
                  <li className="md:hidden py-2 px-3 rounded-sm">
                    <Link
                      to="/profile"
                      className={`font-semibold  ${
                        location.pathname === "/profile"
                          ? "md:text-green-700"
                          : ""
                      }`}
                      onClick={()=> setOpen(false)}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/" ? "md:text-green-700" : ""
                      }`}
                      onClick={()=> setOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/products"
                          ? "md:text-green-700"
                          : ""
                      }`}
                      onClick={()=> setOpen(false)}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wishlist"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/wishlist"
                          ? "md:text-green-700"
                          : ""
                      }`}
                      onClick={()=> setOpen(false)}
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/cart" ? "md:text-green-700" : ""
                      }`}
                      onClick={()=> setOpen(false)}
                    >
                      Cart
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/categories"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/categories"
                          ? "md:text-green-700"
                          : ""
                      }`}
                      onClick={()=> setOpen(false)}
                    >
                      Categories
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link
                      to="/brand"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/brand"
                          ? "md:text-green-700"
                          : ""
                      }`}
                      onClick={()=> setOpen(false)}
                    >
                      Brand
                    </Link>
                  </li> */}
                  
                  <li className="md:hidden py-2 px-3 rounded-sm ">
                    <span
                      onClick={() => {logout(); setOpen(false)}}
                      className={`font-semibold  ${
                        location.pathname === "/logout"
                          ? "md:text-green-700"
                          : ""
                      }`} 
                      
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>
                      Logout
                    </span>
                  </li>
                  
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}