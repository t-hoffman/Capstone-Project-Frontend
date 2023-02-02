import { AuthContext } from 'Components/UserAuth/AuthContext'
import { useContext, useEffect } from 'react'

const SignOut = () => {
  const { deleteToken, navigate } = useContext(AuthContext)
  
  useEffect(() => {
    deleteToken()
    navigate('/signin')
    // eslint-disable-next-line
  }, [])
}

export default SignOut
