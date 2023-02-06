import { AuthContext } from "Components/UserAuth/AuthContext"
import { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import "../../css/Tweets.css"

const TweetModal = ({ modal, show, setShow }) => {
  const { token } = useContext(AuthContext)
  
  return token && modal && (
    <>
    <Modal show={show} onHide={() => setShow(!show)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <TweetForm setShow={setShow} />
      </Modal.Body>
    </Modal>
    </>
  )
}

const TweetForm = ({ setShow }) => {
  const { token, userInfo, navigate, update, setUpdate, defaultImage, API_URL } = useContext(AuthContext)
  const [input, setInput] = useState({ content: '', retweet_id: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const loader = loading ? {display: 'inline-block'} : {display: 'none'}
  const button = loading ? {display: 'none'} : {display: 'block'}
  const userImage = userInfo?.image ? userInfo.image : defaultImage

  const textAreaAdjust = (e) => {
    e.target.style.height = '1px'
    e.target.style.height = (14+e.target.scrollHeight)+'px'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }

    if (input.content.length <= 0) { setError(true); setLoading(false); return; }

    await (await fetch(`${API_URL}/tweet`, options)).json()

    setLoading(false)
    setShow && setShow(false)
    setShow && setUpdate(!update)
    navigate('/profile')
  }

  useEffect(() => {
    if (userInfo?.id) setInput({...input, user_id: userInfo.id})
    // eslint-disable-next-line
  }, [userInfo?.id])

  return token && (
    <div className="tweet-box" style={{borderTop:'none'}}>
      <div className="profile-icon">
        <img src={userImage} alt="Tweeter" />
      </div>
      <div className="content-right">
        {error && <span className="header-error">Cannot leave content blank</span>}
        <textarea type="text" 
                  name="content" 
                  placeholder="What's happening?" 
                  onKeyUp={textAreaAdjust} 
                  onChange={({ target }) => {setInput({...input, [target.name]: target.value}); setError(false)}} 
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

export { TweetForm, TweetModal }
