import { AuthContext } from 'Components/UserAuth/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { token, deleteToken, userInfo } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return navigate('/signin')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return userInfo && (
    <div>
      <h1>Profile</h1>
      Email: {userInfo.email}<br />
      Username: {userInfo.username}<br />
      <button onClick={deleteToken}>Sign out</button>
    </div>
  )
}

export default Profile
