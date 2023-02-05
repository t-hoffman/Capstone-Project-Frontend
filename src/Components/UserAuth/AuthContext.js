import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useToken from './useToken'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const { token, setToken, deleteToken, userInfo, setUserInfo, navigate } = useToken()
  const [update, setUpdate] = useState(false)
  const location = useLocation().pathname.split('/') 
  const defaultImage = 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg'
  const defaultBanner = 'https://pbs.twimg.com/profile_banners/44196397/1576183471/1500x500'
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
    defaultImage,
    defaultBanner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider