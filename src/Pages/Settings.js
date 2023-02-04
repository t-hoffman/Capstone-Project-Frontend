
import { AuthContext } from "Components/UserAuth/AuthContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../css/Settings.css"

const Settings = () => {
  const { token, navigate } = useContext(AuthContext)

  useEffect(() => {
    if (!token) return navigate('/signin')
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="p-3 mb-3"><h4>Settings</h4></div>
      <ul>
        <Link to="/settings/username"><li>Username</li></Link>
        <Link to="/settings/email"><li>Email</li></Link>
        <Link to="/settings/password"><li>Password</li></Link>
        <Link to="/settings/name"><li>Name</li></Link>
      </ul>
    </>
  )
}

const SettingsRightBar = () => {
  return (
    <div className="p-3">
      <h4 className="mb-4">Account settings</h4>
      Please select from the options on the left
    </div>
  )
}

const SettingsForm = ({ type }) => {
  const { userInfo, token, setUserInfo, location } = useContext(AuthContext)
  const [input, setInput] = useState({ [type]: '' })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({...input, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (type === 'password') {
      if (input.password.length <= 0 || input.passwordCheck.length <= 0) return setError(1)
      if (input.password !== input.passwordCheck) return setError(2)
    }

    if (input[type] <= 0) return setError(1)
    setError(false)

    const body = JSON.stringify({ [type]: input[type] })
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: body
    }

    const user = await (await fetch(`/users/${userInfo.id}`, options)).json()
    if (!user['error'] && !user['msg']) {
      setSuccess(true)
      setUserInfo({...userInfo, [type]: input[type]})
    }
  }

  useEffect(() => {
    if (userInfo) setInput({[type]: userInfo[type] })
    if (type === 'password') setInput({password: '', passwordCheck: ''})
  }, [type, userInfo])

  useEffect(() => {
    setError(false)
    setSuccess(false)
  }, [location])

  const displayError = {
    1: 'Cannot leave field blank, please try again',
    2: 'Passwords do not match'
  }

  const firstLetter = type.charAt(0).toUpperCase()
  const remainingWord = type.substring(1)
  const displayType = firstLetter + remainingWord

  return (
    <form>
      <div className="pt-3">
        <h4 className="mb-4">Account settings</h4>
        {error && <span className="header-error">{displayError[error]}</span>}
        {success && <span className="header-success">Successfully updated your {type}</span>}
        {
          type !== 'password' && 
          <div className="input-cont">
            {displayType}
            <input type="text" 
                  name={type} 
                  value={input[type] ? input[type] : ''} 
                  onChange={handleChange} 
            />
          </div>
        }
        {
          type === 'password' &&
          <>
            <div className='input-cont'>
              Password
              <input type="password" 
                     name="password" 
                     value={input.password ? input.password : ''} 
                     onChange={handleChange} 
                     autoComplete="off" 
              />
            </div>
            <div className='input-cont'>
              Password
              <input type="password" 
                     name="passwordCheck" 
                     value={input.passwordCheck ? input.passwordCheck : ''} 
                     onChange={handleChange} 
                     autoComplete="off" 
              />
            </div>
          </>
        }
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" onClick={handleSubmit} className="tw-blue-btn-sm">Save</button>
        </div>
      </div>
    </form>
  )
}

export { Settings, SettingsRightBar, SettingsForm }