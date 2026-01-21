import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import AuthContextProvider from './Context/AuthContextProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContextProvider';
import { Toaster } from 'react-hot-toast';
import WishList from './components/WishList/WishList';
import WishlistContextProvider from './Context/WishlistContextProvider';
import Payment from './components/Payment/Payment';
import AllOrder from './components/AllOrder/AllOrder';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './components/Profile/Profile';
import UpdateData from './components/UpdateData/UpdateData';
import AddAddress from './components/Address/AddAddress';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import FilterProducts from './components/FilterProducts/FilterProducts'

let client = new QueryClient()
export default function App() {
  const router =createBrowserRouter([
    {path: '',element: <Layout />, children: [
      {path: '', element:<ProtectedRoute><Home /></ProtectedRoute> },
      {path: 'products', element:<ProtectedRoute><Products /></ProtectedRoute>},
      {path: 'productDetails/:id/:category', element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
      {path: 'cart', element:<ProtectedRoute><Cart /></ProtectedRoute>},
      {path: 'brand', element:<ProtectedRoute><Brands /></ProtectedRoute>},
      {path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute>},
      {path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute>},
      {path: 'allOrder', element: <ProtectedRoute><AllOrder /></ProtectedRoute>},
      {path: 'categories', element:<ProtectedRoute><Categories /></ProtectedRoute>},
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path: 'forgetPassword', element: <ForgetPassword />},
      {path: 'verify-code', element: <VerifyCode />},
      {path: 'reset-password', element: <ResetPassword />},
      {path: 'profile', element: <Profile />},
      {path: 'addAddress', element: <AddAddress />},
      {path: 'updateData', element: <UpdateData />},
      {path: 'updatePassword', element: <UpdatePassword />},
      {path: 'filterProducts', element: <FilterProducts />},
      {path: '*', element: <NotFoundPage />},
    ]}
  ])
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <QueryClientProvider client={client}>
              <RouterProvider router={router} />
            </QueryClientProvider>
            <Toaster />
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}