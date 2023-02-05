import { AuthContext } from "Components/UserAuth/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import socketio from "socket.io-client";

const socket = socketio.connect('http://127.0.0.1:5000')

const Messages = () => {
  const { userInfo } = useContext(AuthContext)
  const [update, setUpdate] = useState(false)

  const sendMessage = () => {
    socket.emit('message', userInfo.id)
  }

  useEffect(() => {
    const sendMessage = () => setUpdate(update => !update)
    socket.on('message', sendMessage)

    return () => socket.off('message', sendMessage)
  }, [socket, update])
  
  return (
    <button onClick={sendMessage}>Send</button>
  )
}

export default Messages
