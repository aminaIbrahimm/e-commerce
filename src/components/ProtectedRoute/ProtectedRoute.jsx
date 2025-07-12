import React, { useEffect, useState } from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {
  if(localStorage.getItem("token")){
    return children
  }else{
    return <Navigate to="/login"/>
  }
}