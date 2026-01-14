import React, { createContext, useEffect, useState } from 'react'

export let authContext = createContext()

export default function AuthContextProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [idUser, setidUser] = useState(null)
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("resetEmail") || "");

  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("resetEmail");
    localStorage.removeItem("id");

    setToken(null);
    setUserName(null);
    setidUser(null);
  }


  return <authContext.Provider value={{token, setToken,setidUser,idUser,userName,userEmail,logoutUser,setUserName,setUserEmail}}>
    {children}
  </authContext.Provider>
}