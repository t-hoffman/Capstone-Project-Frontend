import { AuthContext } from "Components/UserAuth/AuthContext"
import SignInForm from "Components/UserAuth/SignInForm"
import SignUpForm from "Components/UserAuth/SignUpForm"
import { useContext, useState } from "react"

const Home = () => {
  const { setToken } = useContext(AuthContext)
  const [signUp, setSignUp] = useState(false)
  const [signIn, setSignIn] = useState(false)

  return (
    <div>
      <h2>Homepage</h2>
      <button onClick={() => setSignUp(!signUp)}>Sign up</button>
      <SignUpForm show={signUp} setShow={setSignUp} />
      <button onClick={() => setSignIn(!signIn)}>Sign In</button>
      <SignInForm setToken={setToken} show={signIn} setShow={setSignIn} />
    </div>
  )
}

export default Home
