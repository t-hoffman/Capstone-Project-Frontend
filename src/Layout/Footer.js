import { AuthContext } from "Components/UserAuth/AuthContext"
import SignInForm from "Components/UserAuth/SignInForm"
import SignUpForm from "Components/UserAuth/SignUpForm"
import { useContext, useState } from "react"

const Footer = () => {
  const { token, setToken } = useContext(AuthContext)
  const [signUp, setSignUp] = useState(false)
  const [signIn, setSignIn] = useState(false)

  return !token && (
    <>
    <div className="tw-footer">
      <div className="w-25" id="tw-footer-left"></div>
      <div className="w-50" id="tw-footer-mid">
        <h4 className="mb-0">Don’t miss what’s happening</h4>
        People on Twitter are the first to know.
      </div>
      <div className="w-25 mt-2" id="tw-footer-right">
        <button className="login-btn me-2" onClick={() => setSignIn(!signIn)}>Log in</button>
        <button className="signup-btn" onClick={() => setSignUp(!signUp)}>Sign up</button>
      </div>
    </div>
    <SignUpForm show={signUp} setShow={setSignUp} />
    <SignInForm setToken={setToken} show={signIn} setShow={setSignIn} />
    </>
  )
}

export default Footer
