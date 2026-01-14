import React, { createContext, useState } from 'react'

export let authContext = createContext()

export default function AuthContextProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [idUser, setidUser] = useState(localStorage.getItem("id") || null)
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  // const []

  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("id");
    localStorage.removeItem("phone");

    setUserEmail(null);
    setPhone(null);
    setToken(null);
    setUserName(null);
    setidUser(null);
  }


  return <authContext.Provider 
    value={{token, setToken,setidUser,idUser,userName,userEmail,logoutUser,setUserName,setUserEmail,setPhone,phone}}>
    {children}
  </authContext.Provider>
}