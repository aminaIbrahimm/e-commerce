import React, { createContext, useEffect, useState } from 'react'
export let authContext = createContext()

export default function AuthContextProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [idUser, setidUser] = useState(null)
  return <authContext.Provider value={{token, setToken,setidUser,idUser}}>
    {children}
  </authContext.Provider>
}