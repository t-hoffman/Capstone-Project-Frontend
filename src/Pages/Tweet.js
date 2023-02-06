import CommentBox from "Components/Tweets/Comment"
import { AuthContext } from "Components/UserAuth/AuthContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Tweet = () => {
  const { token, navigate, defaultImage, update, setUpdate, API_URL } = useContext(AuthContext)
  const [data, setData] = useState(null)
  const [show, setShow] = useState(false)
  const { id } = useParams()

  const formatDate = (date, type) => {
    const time = { hour: 'numeric', hour12: true, minute: 'numeric' },
          month = { month: 'short', day: '2-digit', year: 'numeric' }
    
    date = new Date(date)
    if (type === 'full') {
      return `${date.toLocaleTimeString('en-US', time)} - ${date.toLocaleDateString('en-us', month)}`
    } else if (type === 'hr') {
      const now = new Date().getTime()
      const then = new Date(date).getTime()
      const hours = Math.abs(Math.round(((now - then) / 1000) / (60*60)))
  
      if (hours >= 24) {
        const days = Math.abs(Math.round(hours / 24))
        return `${days} days`
      } else if (hours < 1) {
        const min = Math.abs(Math.round(hours*60))
        return `${min < 1 ? 1 : min}min`
      } else {
        return `${Math.abs(Math.round(hours))}hr`
      }
    }
  }

  const likeTweet = async (id, likes) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ likes: likes + 1 })
    }
    await fetch(`${API_URL}/tweet/${id}`, options)
    setUpdate(!update)
  }

  useEffect(() => {
    const getTweet = async () => {
      const tweet = await (await fetch(`${API_URL}/tweet/${id}`)).json()
      setData(tweet)
    }

    getTweet()
  }, [id, update])

  const userImage = data && (data.user.image ? data.user.image : defaultImage)

  return data && (
    <>
      <div className="p-3">
        <h4>Tweet</h4>
      </div>
      <div className="content-box" style={{border:'none'}}>
        <div className="profile-icon" onClick={(e) => { e.preventDefault(); navigate(`/profile/${data.user.id}`) }}>
          <img src={userImage} alt="Tweeter" />
        </div>
        <div className="content-right">
          <div onClick={(e) => { e.preventDefault(); navigate(`/profile/${data.user.id}`) }}>
            <b>{data.user.name}</b>
          </div>
          <div style={{color:'#849099'}}>
            @{data.user.username}
          </div>
        </div>
      </div>
      <div className="ps-3 pe-3" style={{fontSize: '16pt'}}>{data.content}</div>
      <div className="pt-3 ps-3 pe-3 pb-3" style={{color:'#849099', fontSize: '11pt'}}>{formatDate(data.created_at, 'full')}</div>
      <div className="content-box">
        <div className="me-3"><b>{data.comments.length}</b> <span style={{color:'#849099'}}>Comments</span></div>
        <div><b>{data.likes}</b> <span style={{color:'#849099'}}>Likes</span></div>
      </div>
      <div className="content-box tweet-icons" id="tweet">
        <div className="tw-stretch">
          <div className="blue-icon" onClick={(e) => { e.preventDefault(); token && setShow(true) }} title="Comment">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
          </div>
        </div>
        <div className="tw-stretch">
          <div className="green-icon" title="Re-tweet">
            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
          </div>
        </div>
        <div className="tw-stretch">
          <div className="pink-icon" onClick={(e) => { token && likeTweet(id, data.likes) }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
          </div>
        </div>
      </div>
      {
        data.comments.map((comment, idx) => (
          <div className="content-box"  key={idx}>
            <div className="profile-icon" onClick={(e) => { e.preventDefault(); navigate(`/profile/${comment.user.id}`) }}>
              <img src={userImage} alt="Tweeter" />
            </div>
            <div className="content-right">
              <div onClick={(e) => { e.preventDefault(); navigate(`/profile/${comment.user.id}`) }}>
                <b>{comment.user.name}</b> &nbsp;
                <span style={{color:'#849099'}}>@{comment.user.username} - {formatDate(data.created_at, 'hr')}</span>
              </div>
              <div style={{color:'#849099'}}>Replying to <span className="blue-link">@{data.user.username}</span></div>
              <div>{comment.comment}</div>
            </div>
          </div>
        ))
      }
      <CommentBox tweet={data} show={show} setShow={setShow} update={update} setUpdate={setUpdate} />
    </>
  )
}

export default Tweet
