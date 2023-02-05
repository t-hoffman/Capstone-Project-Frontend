import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { AuthContext } from './AuthContext'

const SignUpForm = ({ show, setShow }) => {
  const { navigate } = useContext(AuthContext)
  const initialState = { name: '', email: '', username: '', password: '', passwordCheck: '', image: '', banner: '' }
  const [input, setInput] = useState(initialState)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({...input, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { password, passwordCheck } = input;
    
    for (let key in input) { if (input[key].length <= 0 && key !== 'image' && key !== 'banner') return setError(3) }

    if (password !== passwordCheck) return setError(4)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }

    const newUser = await (await fetch('/register', options)).json()
    
    const success = async () => {
      setInput(initialState)
      setShow(!show);
      navigate('/signin/');
    }

    newUser['message'] ? success() : setError(newUser['code'])
  }

  const handleClose = () => {
    setShow(!show)
    setInput(initialState)
    setError(false)
  }

  const displayError = {
    1: 'Email already being used',
    2: 'Username already taken',
    3: 'Please try again, cannot leave fields blank',
    4: 'Passwords do not match',
  }

  return (
    <Modal show={show} onHide={() => setShow ? handleClose() : navigate('/')}>
      <Modal.Header closeButton /* closeVariant="white" */>
        <Modal.Title><h2>Create your account</h2></Modal.Title>
      </Modal.Header>
      <form className="signup-form">
        <Modal.Body>
          {error && <span className="header-error">{displayError[error]}</span>}
          <div className="input-cont">
            Name
            <input type="text" name="name" value={input.name} onChange={handleChange} autoComplete="off" /><br />
          </div>
          <div className={`input-cont ${error === 1 && `input-error`}`}>
            Email
            <input type="text" name="email" value={input.email} onChange={handleChange} autoComplete="off" /><br />
          </div>
          <div className={`input-cont ${error === 2 && `input-error`}`}>
            Username
            <input type="text" name="username" value={input.username} onChange={handleChange} autoComplete="off" />
          </div>
          <div className={`input-cont ${error === 4 && `input-error`}`}>
            Password
            <input type="password" name="password" value={input.password} onChange={handleChange} autoComplete="off" />
          </div>
          <div className={`input-cont ${error === 4 && `input-error`}`}>
            Password
            <input type="password" name="passwordCheck" value={input.passwordCheck} onChange={handleChange} autoComplete="off" />
          </div>
          <div className="input-cont">
            Photo URL
            <input type="text" name="image" value={input.image} onChange={handleChange} autoComplete="off" />
          </div>
          <div className="input-cont">
            Banner URL
            <input type="text" name="banner" value={input.banner} onChange={handleChange} autoComplete="off" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" onClick={handleSubmit}>Sign up</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default SignUpForm
