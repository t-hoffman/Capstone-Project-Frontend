import { AuthContext } from 'Components/UserAuth/AuthContext'
import SignInForm from 'Components/UserAuth/SignInForm'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const { token, setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) navigate('/profile')
  }, [])
  

  return <SignInForm setToken={setToken} show={true} />
}

export default SignIn
