import { AuthContext } from 'Components/UserAuth/AuthContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import socketio from "socket.io-client";
import '../../css/Messages.css'

// const socket = socketio.connect()

const ShowMessages = () => {
  const { token, userInfo, navigate, update, setUpdate, defaultImage, API_URL } = useContext(AuthContext)
  const [messages, setMessages] = useState(null)
  const [data, setData] = useState(null)
  const [input, setInput] = useState({ message: '' })
  const params = useParams()
  const messagesRef = useRef()
  const [manual, setManual] = useState(false)

  const getMessages = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const data = await (await fetch(`${API_URL}/messages/${userInfo.id}/${params.user_id}`, options)).json()
    data.messages.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at) 
    })

    const userOne = data.users[0].id,
          to = userOne === userInfo.id ? 0 : 1,
          from = userOne === userInfo.id ? 1 : 0,
          usersInfo = { to: data.users[to], from: data.users[from] }

    setMessages(data.messages)
    setData(usersInfo)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInput({...input, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // socket.emit('message', userInfo.id)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({...input, recipient_id: params.user_id})
    }
    if (input.message.length > 0) await fetch(`${API_URL}/messages`, options)

    setInput({ message: '' })
    setManual(!manual)
  }

  useEffect(() => {
    if (userInfo) getMessages()
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
    // eslint-disable-next-line
  }, [userInfo, params, manual])

  // useEffect(() => {
  //   const sendMessage = () => setUpdate(update => !update)
    
  //   socket.on('message', sendMessage)
  //   setUpdate(!update)

  //   return () => socket.off('message', sendMessage)
  //   // eslint-disable-next-line
  // }, [messages?.length])
  
  const userImage = data && data.from?.image ? data.from.image : defaultImage

  return data && data.from ? (
    <>
      <div className="messages-header" onClick={() => navigate(`/profile/${params.user_id}`)}>
        <div className="profile-icon">
          <img src={userImage} alt="Tweeter" />
        </div>
        <div className="mt-3">{data.from.name}</div>
        <div style={{color:'#849099'}}>@{data.from.username}</div>
      </div>
      <div id="messages-list">
          {
            messages.length > 0 ? messages.map((message, idx) => {
              const divClass = message.sender.id !== userInfo.id ? 'message-recipient' : 'message-sender',
                    date = new Date(message.created_at),
                    options = { weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true },
                    formattedDate = date.toLocaleDateString('en-US', options)

              return (
                <div className={divClass} key={idx}>
                  <div className="message-bubble">{message.message}</div>
                  <div className="mt-2">{formattedDate}</div>
                </div>
              )
            }) : <h4 className="pb-5">No messsages yet</h4>
          }
        <div className="message-form">
          <div className="message-form-input">
            <div className="w-100">
              <form onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="message" value={input.message} onChange={handleChange} />
              </form>
            </div>
            <div onClick={handleSubmit}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g><path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path></g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div ref={messagesRef} />
    </>
  ) : (data && <h4 className="p-3">No messages found</h4>)
}

export default ShowMessages
