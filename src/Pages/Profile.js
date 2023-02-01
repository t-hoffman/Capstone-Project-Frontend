import TweetList from 'Components/Tweets/TweetList'
import { AuthContext } from 'Components/UserAuth/AuthContext'
import { useContext, useEffect } from 'react'

const Profile = () => {
  const { token, deleteToken, userInfo, navigate } = useContext(AuthContext)

  useEffect(() => {
    if (!token) return navigate('/signin')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return userInfo && (
    <>
      <div className="p-3"><h4>Profile</h4></div>
      <div className="content-box flex-column">
        <b>Email:</b> {userInfo.email}<br />
        <b>Username:</b> {userInfo.username}<br />
        <button onClick={deleteToken}>Sign out</button>
      </div>
      <TweetList profilePage={true} />
    </>
  )
}

export default Profile
