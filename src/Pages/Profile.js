import TweetList from 'Components/Tweets/TweetList'
import { AuthContext } from 'Components/UserAuth/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/Profile.css'

const Profile = () => {
  const { token, userInfo, navigate, defaultImage, defaultBanner } = useContext(AuthContext)
  const { id } = useParams()
  const [data, setData] = useState(null)

  const getUserInfo = async () => {
    if (!token || id) {
      const userId = id ? id : userInfo?.id,
            data = await (await fetch(`/users/${userId}`)).json()
      setData(data)
    } else {
      setData(userInfo)
    }
  }

  useEffect(() => {
    if (!token && !id) return navigate('/')
    if (!data) getUserInfo()
    // eslint-disable-next-line
  }, [token, userInfo])

  const profileImage = data && (data.image ? data.image : defaultImage)
  const bannerImage = data && (data.banner ? data.banner : defaultBanner)

  return data && (
    <>
      <div className="profile-banner">
        <div className="profile-banner-top" style={{backgroundImage:`url(${bannerImage})`}}>
          <div className="profile-avatar">
            <img src={profileImage} alt={data.username} />
          </div>
          <div className="overlay"></div>
        </div>
        <div className="profile-bottom">
          <span className="prof-button" onClick={() => navigate(`/messages/${data.id !== userInfo.id ? data.id : ''}`)}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{color: 'rgb(239, 243, 244)'}}><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
          </span>
        </div>
      </div>
      <div className="ps-3 pt-3 pb-3">
        <h5 style={{margin:'0'}}>{data.name}</h5>
        <span style={{color:'#849099'}}>@{data.username}<br />{data.email}</span>
      </div>

      <TweetList profilePage={true} id={data.id} />
    </>
  )
}

export default Profile
