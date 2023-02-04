import { AuthContext } from 'Components/UserAuth/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import socketio from "socket.io-client";

const socket = socketio.connect('http://127.0.0.1:5000')

const ShowMessages = () => {
  const { token, userInfo, update, setUpdate } = useContext(AuthContext)
  const [messages, setMessages] = useState(null)
  const [input, setInput] = useState({ message: '' })
  const params = useParams()

  const sendMessage = () => {
    socket.emit('message', userInfo.id)
  }

  useEffect(() => {
    const sendMessage = () => setUpdate(update => !update)
    socket.on('message', sendMessage)

    return () => socket.off('message', sendMessage)
  }, [socket])



  const getMessages = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const data = await (await fetch(`/messages/${userInfo.id}/${params.user_id}`, options)).json()
    data.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at) 
    })

    setMessages(data)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInput({...input, [name]: value})
  }

  const handleSubmit = async (e) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({...input, recipient_id: params.user_id})
    }
    const newMessage = await (await fetch('/messages', options)).json()
    console.log(newMessage)
  }

  useEffect(() => {
    if (userInfo) getMessages()
  }, [userInfo, params])

  useEffect(() => {
    setUpdate(!update)
  }, [messages?.length])
  
  return messages && (
    <div>
      <ul>
        {
          messages.map((message, idx) => (
            <li key={idx}><b>{message.sender.name}:</b><br />{message.message}<br /> {message.created_at}</li>
          ))
        }
      </ul>
      <input type="text" name="message" value={input.message} onChange={handleChange} />
      <button type="submit" onClick={() => { sendMessage(); handleSubmit(); }}>Submit ({update ? 'true' : 'false'})</button>
    </div>
  )
}

export default ShowMessages
