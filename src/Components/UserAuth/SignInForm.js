import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const SignInForm = ({ setToken, show, setShow }) => {
  const initialState = { username: '', password: '' }
  const [input, setInput] = useState(initialState)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }
    const userLogin = await (await fetch('/login', options)).json()

    if (!userLogin['access_token']) return setError(true)

    setToken(userLogin['access_token'])
    navigate('/profile')
  }

  const handleClose = () => {
    setShow(!show)
    setInput(initialState)
    setError(false)
  }

  return (
    <Modal show={show} onHide={() => setShow ? handleClose() : navigate('/')}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="Tweeter" width="30px" /> Sign in to Tweeter</h2>
        </Modal.Title>
      </Modal.Header>
      <form className="signup-form">
        <Modal.Body>
        {error && <span className="header-error"><b>User credentials  incorrect, please try again</b></span>}
          <div className="input-cont">
            Username
            <input type="text" name="username" value={input.username} onChange={handleChange} />
          </div>
          <div className="input-cont">
            Password
            <input type="password" name="password" value={input.password} onChange={handleChange} autoComplete="off" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" onClick={handleSubmit}>Sign in</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default SignInForm
