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
  

  return (
    <div>
      <h1>Sign in</h1>
      <SignInForm setToken={setToken} />
    </div>
  )
}

export default SignIn
