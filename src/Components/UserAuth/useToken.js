import { useEffect, useState } from 'react'

const useToken = () => {
  const getToken = () => {
    const userToken = window.localStorage.getItem('token');
    return userToken;
  }

  const [token, setToken] = useState(getToken())
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const getUserInfo = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
      const user = await (await fetch('/verify', options)).json()
  
      setUserInfo(user)
    }

    if (token) getUserInfo()
  }, [token])

  const saveToken = (userToken) => {
    window.localStorage.setItem('token', userToken)
    setToken(userToken)
  }

  const deleteToken = async () => {
    if (!token) return false

    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }

    await fetch('/logout', options)
    setToken(null)
    window.localStorage.removeItem('token')
  }

  return {
    setToken: saveToken,
    deleteToken: deleteToken,
    userInfo: userInfo,
    token
  }
}

export default useToken
