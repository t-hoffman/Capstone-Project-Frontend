import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useToken = () => {
  const getToken = () => {
    const userToken = window.localStorage.getItem('token');
    return userToken;
  }

  const [token, setToken] = useState(getToken())
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }
        const user = await (await fetch('/verify', options)).json()
        
        setUserInfo(user)
      } catch(err) {
        console.error('err', err)
        window.localStorage.removeItem('token')
        navigate('/')
      }
    }

    if (token) getUserInfo()
    // eslint-disable-next-line
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
    navigate: navigate,
    token
  }
}

export default useToken
