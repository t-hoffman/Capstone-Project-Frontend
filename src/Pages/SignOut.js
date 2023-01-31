import { AuthContext } from 'Components/UserAuth/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
  const { deleteToken } = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    deleteToken()
    navigate('/signin')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default SignOut
