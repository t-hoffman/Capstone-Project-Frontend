import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useToken from './useToken'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const { token, setToken, deleteToken, userInfo, setUserInfo, navigate } = useToken()
  const [update, setUpdate] = useState(false)
  const location = useLocation().pathname.split('/') 
  const defaultImage = 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_x96.jpg'
  const value = {
    token,
    setToken,
    deleteToken,
    userInfo,
    setUserInfo,
    navigate,
    update,
    setUpdate,
    location,
    defaultImage
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider