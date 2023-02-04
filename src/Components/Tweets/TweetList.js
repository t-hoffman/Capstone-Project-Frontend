import { AuthContext } from "Components/UserAuth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import CommentBox from "./Comment";

const TweetList = ({ profilePage }) => {
  const { userInfo, update } = useContext(AuthContext)
  const [data, setData] = useState(null)
  const [show, setShow] = useState(false)
  const [tweet, setTweet] = useState(null)

  useEffect(() => {
    const getTweets = async () => {
      const query = profilePage ? `/${userInfo.id}` : ''
      const tweets = await (await fetch(`/tweets${query}`)).json()
      setData(tweets)
    }

    getTweets()
    // eslint-disable-next-line
  }, [userInfo?.id, update])

  const iterateTweets = () => {
    const tweets = data.tweets ? data.tweets : data;
    const showTweets = tweets.map((tweet, idx) => (<Tweet {...tweet} idx={idx} key={idx} setTweet={setTweet} setShow={setShow} />))

    return (
      <>
      {showTweets}
      <CommentBox show={show} setShow={setShow} tweet={tweets[tweet]} />
      </>
    )
  }

  return data && (data.tweets?.length > 0 || data.length > 0) && iterateTweets();
}

const Tweet = ({ idx, id, user, content, created_at, comments, likes, setTweet, setShow }) => {
  const { token, update, setUpdate, navigate } = useContext(AuthContext)
  const userImage = user.image ? user.image : 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_x96.jpg'

  const formatDate = (date) => {
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

  const likeTweet = async (e, id, likes) => {
    e.preventDefault()
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ likes: likes + 1 })
    }
    await fetch(`/tweet/${id}`, options)
    setUpdate(!update)
  }

  const likeCount = likes ? likes : 0

  return (
    <Link to={`/tweet/${id}`}>
      <div className="content-box" key={idx}>
        <div className="profile-icon" onClick={(e) => { e.preventDefault(); navigate(`/profile/${user.id}`) }}>
          <img src={userImage} alt="Tweeter" />
        </div>
        <div className="content-right">
          <div onClick={(e) => { e.preventDefault(); navigate(`/profile/${user.id}`) }}>
            <b>{user.name}</b> &nbsp;
            <span style={{color:'#849099',fontWeight:'normal'}}>@{user.username} - <span style={{fontSize:'11pt'}}>{formatDate(created_at)}</span></span>
          </div>
          <div style={{color:'#849099'}}>
            {/* Replying to <span className="blue-link"><Link to="/">@BBCScienceNews</Link></span> */}
          </div>
          <div style={{fontWeight:'normal'}}>
            {content}
          </div>
          <div className="tweet-icons">
            <div className="blue-icon" onClick={(e) => { e.preventDefault(); setTweet(idx); setShow(true) }} title="Comment">
              <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
            </div>
            <div className="d-flex align-items-center pt-1 pe-3 ps-1 blue-count">{comments.length}</div>
            <div className="green-icon" title="Re-tweet">
              <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
            </div>
            <div className="d-flex align-items-center pt-1 pe-3 ps-1 green-count">{comments.length}</div>
            <div className="pink-icon" onClick={(e) => likeTweet(e, id, likeCount)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
            </div>
            <div className="d-flex align-items-center pt-1 pe-3 ps-1 pink-count">{likeCount}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TweetList
