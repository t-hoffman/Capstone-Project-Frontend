import { AuthContext } from "Components/UserAuth/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";

// eslint-disable-next-line
const socket = socketio.connect('http://127.0.0.1:5000')

const Messages = () => {
  const { token, userInfo, update } = useContext(AuthContext)
  const [messages, setMessages] = useState([])

  const getMessages = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    const data = await (await fetch(`/messages/${userInfo.id}`, options)).json()
    setMessages(data)
  }

  useEffect(() => {
    if (userInfo) getMessages()
    // eslint-disable-next-line
  }, [userInfo, update])

  return messages && (
    // <button onClick={sendMessage}>Send</button>
    <>
      <div className="p-3 mb-3"><h4>Messages</h4></div>
      <ul>
        {
          messages.map((message, idx) => (
            <Link to={`/messages/${message.id}`} key={idx}><li>@{message.username}</li></Link>
          ))
        }
      </ul>
    </>
  )
}

export default Messages
