import { AuthContext } from "Components/UserAuth/AuthContext"
import { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import "../../css/Tweets.css"

const TweetForm = ({ modal, show, setShow }) => {

  return modal ? (
    <>
    <Modal show={show} onHide={() => setShow(!show)}>
      <Modal.Header closeButton /* closeVariant="white" */ />
      <Modal.Body>
        <TweetBox setShow={setShow} />
      </Modal.Body>
    </Modal>
    </>
  ) : <TweetBox />
}

const TweetBox = ({ setShow }) => {
  const { token, userInfo, navigate, update, setUpdate } = useContext(AuthContext)
  const [input, setInput] = useState({ content: '', retweet_id: null })
  const [loading, setLoading] = useState(false)
  const loader = loading ? {display: 'inline-block'} : {display: 'none'}
  const button = loading ? {display: 'none'} : {display: 'block'}
  const userImage = userInfo?.image ? userInfo.image : 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_x96.jpg'

  const textAreaAdjust = (e) => {
    e.target.style.height = '1px'
    e.target.style.height = (14+e.target.scrollHeight)+'px'
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }

    await (await fetch('/tweet', options)).json()

    setLoading(false)
    setShow && setShow(false)
    setShow && setUpdate(!update)
    navigate('/profile')
  }

  useEffect(() => {
    if (userInfo?.id) setInput({...input, user_id: userInfo.id})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id])

  return (
    <div className="tweet-box">
      <div className="profile-icon">
        <img src={userImage} alt="Tweeter" />
      </div>
      <div className="content-right">
        <textarea type="text" 
                  name="content" 
                  placeholder="What's happening?" 
                  onKeyUp={textAreaAdjust} 
                  onChange={({ target }) => setInput({...input, [target.name]: target.value})} 
                  value={input.content}
        ></textarea>
        <div className="tweet-box justify-content-end">
          <button className="tw-blue-btn-sm" onClick={handleSubmit} style={button}>Tweet</button>
          <div className="lds-ring" style={loader}><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>
  )
}

export default TweetForm
