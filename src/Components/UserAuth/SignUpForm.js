import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
  const [input, setInput] = useState({ email: '', username: '', password: '', passwordCheck: '' })
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({...input, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, username, password, passwordCheck } = input;
    
    if (email.length <= 0 || username.length <= 0 || password.length <= 0) return setError(3)
    if (password !== passwordCheck) return setError(4)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }

    const newUser = await (await fetch('http://127.0.0.1:5000/register', options)).json()
    
    newUser['message'] ? navigate('/profile') : setError(newUser['code'])
  }

  const displayError = (code) => {
    if (code === 1) return <>Email already being used</>
    if (code === 2) return <>Username already taken</>
    if (code === 3) return <>Please try again, cannot leave fields blank</>
    if (code === 4) return <>Passwords do not match</>
  }

  return (
    <form>
      {error && <><span style={{color:'red'}}><b>{displayError(error)}</b></span><br /></>}
      Email: <input type="text" name="email" value={input.email} onChange={handleChange} /><br />
      Username: <input type="text" name="username" value={input.username} onChange={handleChange} /><br />
      Password: <input type="password" name="password" value={input.password} onChange={handleChange} /><br />
      Password (again): <input type="password" name="passwordCheck" value={input.passwordCheck} onChange={handleChange} /><br />
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default SignUpForm
