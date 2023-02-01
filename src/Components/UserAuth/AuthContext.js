import React, { useState } from 'react'
import useToken from './useToken'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const { token, setToken, deleteToken, userInfo, navigate } = useToken()
  const [update, setUpdate] = useState(false)

  return (
    <AuthContext.Provider value={{token, setToken, deleteToken, userInfo, navigate, update, setUpdate}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider