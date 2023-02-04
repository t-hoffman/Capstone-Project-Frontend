import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useToken from './useToken'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const { token, setToken, deleteToken, userInfo, setUserInfo, navigate } = useToken()
  const [update, setUpdate] = useState(false)
  const location = useLocation().pathname.split('/') 
  const value = {
    token,
    setToken,
    deleteToken,
    userInfo,
    setUserInfo,
    navigate,
    update,
    setUpdate,
    location
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider