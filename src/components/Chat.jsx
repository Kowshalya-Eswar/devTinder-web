import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
const Chat = () => {
  // Get the target user ID from the URL params
  const { targetUserId } = useParams();
  
  // Set up the messages state (each message will have text, a timestamp, and seen status)
  const [messages, setMessages] = useState([{ text: "hello world", timestamp: new Date(), seen: false }]);
  
  // Get the current user's ID from the Redux store
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Set up state for the new message being typed
  const [message, setMessage] = useState('');

  // Function to send a message
  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        timestamp: new Date(),
        seen: false, // New messages are initially not seen
      };
      setMessages([...messages, newMessage]);
      setMessage(''); // Clear input after sending
    }
  };

  // Function to mark a message as seen
  const markAsSeen = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].seen = true;
    updatedMessages[index].seenTime = new Date(); // Add the seen timestamp
    setMessages(updatedMessages);
  };

  // Set up socket connection when component mounts (example)
  useEffect(() => {
    debugger;
    if(!userId) {
      return;
    }
    const socket = createSocketConnection(); // Assuming you have a socket connection function
    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [userId, targetUserId]);

  return (
   <div className="chat-container">
  <div className="chat-window">
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={`chat ${userId === targetUserId ? 'chat-end' : 'chat-start'}`}>
          {/* Avatar */}
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={userId === targetUserId 
                  ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp" // Current user avatar
                  : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"} // Other user avatar
              />
            </div>
          </div>

          {/* Message Header */}
          <div className="chat-header">
            {userId === targetUserId ? 'You' : 'User'} 
            <time className="text-xs opacity-50">{msg.timestamp.toLocaleTimeString()}</time>
          </div>

          {/* Chat Bubble */}
          <div className="chat-bubble">{msg.text}</div>

          {/* Message Footer: Seen/Delivered Status */}
          <div className="chat-footer opacity-50">
            {msg.seen ? (
              <>
                <small>Seen at: {msg.seenTime ? msg.seenTime.toLocaleTimeString() : 'N/A'}</small>
              </>
            ) : (
              <span>Not Seen</span>
            )}
          </div>
          
          {/* Button to mark as seen */}
          {userId !== targetUserId && (
            <button className="btn btn-sm btn-secondary" onClick={() => markAsSeen(index)}>Mark as Seen</button>
          )}
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
