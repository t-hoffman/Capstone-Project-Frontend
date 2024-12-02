import { AuthContext } from "Components/UserAuth/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";

// eslint-disable-next-line
// const socket = socketio.connect()

const Messages = () => {
  const { token, userInfo, update, navigate, API_URL } =
    useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const data = await (
      await fetch(`${API_URL}/messages/${userInfo.id}`, options)
    ).json();

    setMessages(data);
  };

  console.log(messages);

  useEffect(() => {
    if (!token) navigate("/signin");
    if (userInfo) getMessages();
    // eslint-disable-next-line
  }, [userInfo, update]);

  return (
    messages && (
      <>
        <div className="p-3 mb-3">
          <h4>Messages</h4>
        </div>
        <ul>
          {messages.map((message, idx) => (
            <Link to={`/messages/${message.id}`} key={idx}>
              <li>@{message.username}</li>
            </Link>
          ))}
        </ul>
      </>
    )
  );
};

export default Messages;
