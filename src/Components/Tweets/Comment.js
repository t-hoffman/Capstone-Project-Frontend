import { AuthContext } from "Components/UserAuth/AuthContext";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap"
import { Link } from "react-router-dom";

const CommentBox = ({ show, setShow, tweet }) => {
  const { token, userInfo, navigate } = useContext(AuthContext)
  const defaultImage = 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_x96.jpg'
  const userImage = userInfo?.image ? userInfo.image : defaultImage
  const tweetImage = tweet && (tweet.user.image ? tweet.user.image : defaultImage)
  const [input, setInput] = useState({ comment: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      comment: input.comment,
      user_id: userInfo.id,
      tweet_id: tweet.id
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    if (input.comment.length <= 0) return

    await (await fetch('/comment', options)).json()

    setShow(false)
    setInput({ comment: '' })
    navigate(`/tweet/${tweet.id}`)
  }

  const formatDate = (date) => {
    const now = new Date().getTime()
    const then = new Date(date).getTime()
    const hours = Math.abs(Math.round(((now - then) / 1000) / (60*60)))

    if (hours >= 24) {
      const days = Math.abs(Math.round(hours / 24))
      return `${days}days`
    } else if (hours < 1) {
      const min = Math.abs(Math.round(hours*60))
      return `${min < 1 ? 1 : min}min`
    } else {
      return `${Math.abs(Math.round(hours))}hr`
    }
  }

  const textAreaAdjust = (e) => {
    e.target.style.height = '1px'
    e.target.style.height = (14+e.target.scrollHeight)+'px'
  }
  
  return tweet && (
    <Modal show={show} onHide={() => setShow(!show)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="content-box" style={{borderTop:'none'}}>
          <div className="profile-icon">
            <img src={tweetImage} alt="Tweeter" />
          </div>
          <div className="content-right" style={{cursor:'default'}}>
            <div>
              <b>{tweet.user.name}</b>&nbsp;
              <span style={{color:'#849099'}}>@{tweet.user.username} - {formatDate(tweet.created_at)}</span>
            </div>
            <div>
              {tweet.content}
            </div>
            <div className="pt-2" style={{color:'#849099'}}>
              Replying to <span className="blue-link"><Link to="">@{tweet.user.username}</Link></span>
            </div>
          </div>
        </div>
        <div className="tweet-box mt-3" style={{borderTop:'none'}}>
          <div className="profile-icon">
            <img src={userImage} alt="Tweeter" />
          </div>
          <div className="content-right">
            <textarea type="text" 
                      name="content" 
                      placeholder="Tweet your reply" 
                      onKeyUp={textAreaAdjust} 
                      onChange={({ target }) => setInput({comment: target.value})} 
                      value={input.comment}
            ></textarea>
            <div className="tweet-box justify-content-end" style={{borderTop:'none'}}>
              <button className="tw-blue-btn-sm" onClick={handleSubmit}>Comment</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CommentBox
