import SignUpForm from "Components/UserAuth/SignUpForm"
import { useState } from "react"

const Home = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <h2>Homepage</h2>
      <button onClick={() => setShow(!show)}>Sign up</button>
      <SignUpForm show={show} setShow={setShow} />
    </div>
  )
}

export default Home
