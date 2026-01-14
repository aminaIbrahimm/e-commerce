import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as YUP from 'yup';
import { authContext } from '../../Context/AuthContextProvider';
import bgLogin from '../../assets/ecommerce.PNG'


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [setUserName] = useContext(authContext);
  let navigate = useNavigate()
  const [errMessage, setErrMessage] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let validationSchema = YUP.object().shape({
    name: YUP.string().min(3,"name min 3 char").max(20,"name max 10 char").required("name is required"),
    email: YUP.string().email("email is in-valid").required("email is required"),
    // password: YUP.string().matches(/^\w{6,15}$/, "password min 6 to 15 letters").required("password is required"),
    password: YUP.string().min(6, "password min 6 to 15 letters").required("password is required"),
    rePassword: YUP.string().oneOf([YUP.ref("password")],"password and rePassword don't match").required("rePassword is required"),
    phone:YUP.string().matches(/^01[0125][0-9]{8}$/,"phone must be egyption number").required("phone is required"),
  })
  let registerForm = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema,
    onSubmit:(values)=>{
      setisLoading(true)
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      .then((res)=>{
        localStorage.setItem("token", res.data.token);
        // localStorage.setItem("userName", values.name);
        // localStorage.setItem("resetEmail", values.email);

        setUserName(res.data.user.name)
setUserEmail(res.data.user.email)
localStorage.setItem("userName", res.data.user.name)
localStorage.setItem("resetEmail", res.data.user.email)


        // setUserName(values.name);
        console.log(res);
        navigate("/");
      })
      .catch((error)=>{
        console.log(error);
        setErrMessage(error.response.data.message)
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
      <div>

        <form
          onSubmit={registerForm.handleSubmit}
          className="relative w-[80%] m-25 md:w-1/2 mx-auto rounded-2xl p-5 shadow-2xl"
        >
          <h2 className="my-3 text-green-700 text-2xl">
            <i className="fa-solid fa-user-plus"></i> Register Now :
          </h2>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              name :
            </label>
            <input
              name="name"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {registerForm.errors.name && registerForm.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.name}
            </div>
          ) : null}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              email :
            </label>
            <input
              name="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {registerForm.errors.email && registerForm.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.email}
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
                value={registerForm.values.password}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>
          {registerForm.errors.password && registerForm.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.password}
            </div>
          ) : null}
          <div>
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              rePassword :
            </label>
            <div className="relative">
              <input
                name="rePassword"
                value={registerForm.values.rePassword}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                type={showRePassword ? "text" : "password"}
                id="rePassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <span
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
              >
                {showRePassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.rePassword}
            </div>
          ) : null}
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              phone :
            </label>
            <input
              name="phone"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {registerForm.errors.phone && registerForm.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.phone}
            </div>
          ) : null}
          <p className="text-center mt-2">
            Login to your existing account :
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="capitalize text-green-600 cursor-pointer hover:text-green-800"
            >
              {" "}
              sign in
            </button>
          </p>
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className="my-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fa-solid fa-spinner"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}