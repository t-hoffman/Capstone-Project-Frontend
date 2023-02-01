import { AuthContext } from 'Components/UserAuth/AuthContext'
import SignInForm from 'Components/UserAuth/SignInForm'
import { useContext, useEffect } from 'react'

const SignIn = () => {
  const { token, setToken, navigate } = useContext(AuthContext)

  useEffect(() => {
    if (token) navigate('/profile')
    // eslint-disable-next-line
  }, [])
  

  return <SignInForm setToken={setToken} show={true} />
}

export default SignIn
