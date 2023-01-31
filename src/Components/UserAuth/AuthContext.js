import React from 'react'
import useToken from './useToken'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const { token, setToken, deleteToken, userInfo } = useToken()

  return (
    <AuthContext.Provider value={{token, setToken, deleteToken, userInfo}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider