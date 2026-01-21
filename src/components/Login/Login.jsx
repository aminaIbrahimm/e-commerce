import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as YUP from 'yup';
import { authContext } from '../../Context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let { setToken, setidUser, setUserName, setUserEmail } = useContext(authContext);
  let navigate = useNavigate()
  const [errMessage, setErrMessage] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  let validationSchema = YUP.object().shape({
    email: YUP.string().email("email is in-valid").required("email is required"),
    // password: YUP.string().matches(/^\w{6,15}$/, "password min 6 to 15 letters").required("password is required"),
    password: YUP.string().min(6, "password min 6 to 15 letters").required("password is required"),
  })
  let loginForm = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:(values)=>{
      setisLoading(true)
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      .then((res)=>{
        console.log(res);
        
        setToken(res.data.token)
        
        setUserName(res.data.user.name)
        setUserEmail(res.data.user.email)
        localStorage.setItem("userName", res.data.user.name)
        localStorage.setItem("userEmail", res.data.user.email)

        // localStorage.setItem("resetEmail", values.email);
        localStorage.setItem("token",res.data.token)
        let {id} = jwtDecode(res.data.token)
        localStorage.setItem("id",id)
        setidUser(id)
        navigate("/")
      })
      .catch((error)=>{
        console.log(error);
        setErrMessage(error.response?.data?.message)
      }).finally(()=>{
        setisLoading(false)
      })
    } 
  })
  
  return (
    <>
      {errMessage ? (
        <div
          className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errMessage}
        </div>
      ) : null}

      <div className="relative py-16">
        <form
          onSubmit={loginForm.handleSubmit}
          className="md:w-1/2 md:mx-auto mx-3  p-5 rounded-lg shadow-2xl"
        >
          <h2 className="my-5 text-2xl font-semibold text-green-700">
            {" "}
             Login Now :
          </h2>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              email :
            </label>
            <input
              name="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {loginForm.errors.email && loginForm.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {loginForm.errors.email}
            </div>
          ) : null}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password :
            </label>
            <div className="relative">
              <input
                name="password"
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>
          </div>
          {loginForm.errors.password && loginForm.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {loginForm.errors.password}
            </div>
          ) : null}
          <div className="flex flex-col justify-between items-center mt-4">
            <button
              onClick={() => navigate("/forgetPassword")}
              className=" hover:text-green-800"
            >
              Forget Your Password ?
            </button>
            <p>
              Create a New Account :{" "}
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="text-green-500 hover:text-green-700"
              >
                Register
              </button>
            </p>
          </div>
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className="cursor-pointer my-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner /> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}