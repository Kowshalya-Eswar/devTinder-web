import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
const Chat = () => {
  // Get the target user ID from the URL params
  const { id } = useParams();
  
  // Set up the messages state (each message will have text, a timestamp, and seen status)
  const [messages, setMessages] = useState([]);
  
  // Get the current user's ID from the Redux store
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Set up state for the new message being typed
  const [message, setMessage] = useState('');

  // Function to send a message
  const sendMessage = () => {
      const socket = createSocketConnection();
    if (message.trim() !== '') {     
      socket.emit("sendMessage",{
        firstName: user.firstName,
        id,
        text:message
      })
    }
    setMessage('');
  };

  useEffect(() => {
    if(!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, id });
    socket.on("messageReceived",({firstName,text})=> {
      setMessages((messages)=>[...messages, {firstName,text}])
    })
    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [userId, id]);

  return (
   <div className="chat-container">
  <div className="chat-window">
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={`chat ${userId === id ? 'chat-end' : 'chat-start'}`}>
          {/* Avatar */}
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={userId === id 
                  ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp" // Current user avatar
                  : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"} // Other user avatar
              />
            </div>
          </div>

          {/* Message Header */}
          <div className="chat-header">
            {userId === id ? 'You' : msg.firstName} 
          </div>

          {/* Chat Bubble */}
          <div className="chat-bubble">{msg.text}</div>

        </div>
      ))}
    </div>

    {/* Input Container */}
    <div className="input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="input input-bordered w-full"
      />
      <button className="btn btn-primary" onClick={sendMessage}>Send</button>
    </div>
  </div>
</div>

  );
};

export default Chat;
