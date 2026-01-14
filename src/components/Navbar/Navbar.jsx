import React, {useContext, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContextProvider'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  let {token,setToken,logoutUser} = useContext(authContext)
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
            {/* <img src={logo} alt="Logo Fresh cart" /> */}
            <i className="fa-brands fa-opencart px-3 text-green-700 text-3xl"></i>
            SooqNow
          </Link>
          <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
            <ul className="flex flex-col md:flex-row gap-2 ms-auto">
              {/* <ul className="flex gap-3">
                <li>
                  <i className="fa-brands fa-facebook-f cursor-pointer hover:text-green-500  "></i>
                </li>
                <li>
                  <i className="fa-brands fa-tiktok cursor-pointer hover:text-green-500 "></i>
                </li>
                <li>
                  <i className="fa-brands fa-twitter cursor-pointer hover:text-green-500 "></i>
                </li>
                <li>
                  <i className="fa-brands fa-yahoo cursor-pointer hover:text-green-500 "></i>
                </li>
                <li>
                  <i className="fa-brands fa-github cursor-pointer hover:text-green-500 "></i>
                </li>
              </ul> */}
              <ul className="flex items-center me-3">
                <li>
                  <Link
                    to="/wishlist"
                    className={`block px-2 rounded-sm ${
                      location.pathname === "/wishlist"
                        ? "md:text-green-700"
                        : ""
                    }`}
                  >
                    <i className="fa-solid fa-heart text-red-600 text-xl hover:scale-110"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className={`block px-1 rounded-sm ${
                      location.pathname === "/cart" ? "md:text-green-700" : ""
                    }`}
                  >
                    <i className="fa-solid fa-cart-shopping text-xl text-green-600 hover:scale-110"></i>{" "}
                  </Link>
                </li>
              </ul>

              {token ? (
                <>
                  <li className="text-end hidden md:block me-3">
                    <Link
                      to="/profile"
                      className={`cursor-pointer  hover:text-green-700 font-semibold text-lg ${
                        location.pathname === "/profile"
                          ? "md:text-green-700"
                          : ""
                      }`}
                    >
                      My Account
                      <i className="fa-solid fa-user ms-1 "></i>
                    </Link>
                  </li>
                  <li className="text-end hidden md:block">
                    <span
                      onClick={() => logout()}
                      className="cursor-pointer  hover:text-red-700 font-semibold text-lg"
                    >
                      Logout
                      <i className="fa-solid fa-arrow-right-from-bracket ms-1"></i>
                    </span>
                  </li>
                  
                </>
              ) : (
                <>
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
                </>
              )}
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
                  <li>
                    <Link
                      to="/"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/" ? "md:text-green-700" : ""
                      }`}
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
                    >
                      Products
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/wishlist"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/wishlist"
                          ? "md:text-green-700"
                          : ""
                      }`}
                    >
                      Wishlist
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link
                      to="/cart"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/cart" ? "md:text-green-700" : ""
                      }`}
                    >
                      Cart
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/categories"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/categories"
                          ? "md:text-green-700"
                          : ""
                      }`}
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/brand"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/brand"
                          ? "md:text-green-700"
                          : ""
                      }`}
                    >
                      Brand
                    </Link>
                  </li>
                  <li className="md:hidden py-2 px-3 rounded-sm ">
                    <span
                      onClick={() => logout()}
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
                  <li className="md:hidden py-2 px-3 rounded-sm">
                    <Link
                      to="/profile"
                      className={`font-semibold  ${
                        location.pathname === "/profile"
                          ? "md:text-green-700"
                          : ""
                      }`}
                    >
                      <i className="fa-solid fa-user me-1 "></i>
                      My Profile
                    </Link>
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