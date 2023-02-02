import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useToken from './useToken'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const { token, setToken, deleteToken, userInfo, setUserInfo, navigate } = useToken()
  const [update, setUpdate] = useState(false)
  let location = useLocation().pathname.split('/') 

  return (
    <AuthContext.Provider value={{token, setToken, deleteToken, userInfo, setUserInfo, navigate, update, setUpdate, location}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider