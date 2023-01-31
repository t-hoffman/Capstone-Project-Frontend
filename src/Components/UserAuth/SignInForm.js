import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignInForm = ({ setToken }) => {
  const [input, setInput] = useState({ username: '', password: '' })
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
    const userLogin = await (await fetch('http://127.0.0.1:5000/login', options)).json()

    if (!userLogin['access_token']) return setError(true)

    setToken(userLogin['access_token'])
    navigate('/profile')
  }

  return (
    <form>
      {error && <><span style={{color:'red'}}><b>User credentials  incorrect, please try again</b></span><br /></>}
      Username: <input type="text" name="username" value={input.username} onChange={handleChange} /><br />
      Password: <input type="password" name="password" value={input.password} onChange={handleChange} /><br />
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default SignInForm
