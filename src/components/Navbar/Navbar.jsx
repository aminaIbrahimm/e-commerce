import React, {useContext, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { authContext } from '../../Context/AuthContextProvider'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  let {token,setToken} = useContext(authContext)
  let navigate = useNavigate("token")
  const location = useLocation();
  function logout() {
    setToken(null)
    localStorage.removeItem("token")
    navigate("/login")
  }
  
  return (
    <>
      <nav className="bg-teal-600 w-full z-20 top-0 start-0 fixed ">
        <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img src={logo} alt="Logo Fresh cart" />
          </Link>
          <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
            <ul className="flex flex-col md:flex-row gap-3 ms-auto">
              <ul className="flex gap-3">
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
              </ul>
              {token ? (
                <li className="text-end">
                  <span
                    onClick={() => logout()}
                    className="cursor-pointer hover:text-green-500"
                  >
                    Logout
                  </span>
                </li>
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
                <ul className="absolute left-0 top-full w-full bg-teal-600 shadow-md rounded-b-lg flex flex-col md:p-0 font-medium md:flex-row md:mt-0 justify-center">
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
                  <li>
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
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className={`block py-2 px-3 rounded-sm ${
                        location.pathname === "/cart" ? "md:text-green-700" : ""
                      }`}
                    >
                      Cart
                    </Link>
                  </li>
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
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}