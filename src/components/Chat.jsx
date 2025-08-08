import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

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
      socket.emit('sendMessage', {
      text: message,
      senderId: {
        _id: userId,  // Include current user's ID
        firstName: user.firstName, // Include firstName
        lastName: user.lastName, // Optionally include lastName
      },
      id, // Target user ID (the chat recipient)
    });
    }
    setMessage('');
  };

  // Fetch messages when the component is mounted
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${BASE_URL}/chat/${id}`, {
          withCredentials: true,
        });

        // Assuming result.data[0].message contains the array of messages
        if (result.data && result.data[0].message) {
          console.log('Fetched Messages:', result.data[0].message); // Debug log
          setMessages(result.data[0].message); // Update the state with fetched messages
        }
      } catch (err) {
        console.log('Error fetching messages:', err.message);
      }
    };

    fetchMessages();
  }, [id]);

  // Socket listener for real-time messages
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit('joinChat', { firstName: user.firstName, id });

    socket.on('messageReceived', ({ senderId, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId, text },
      ]);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [userId, id]);

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                userId === msg.senderId._id ? 'chat-end' : 'chat-start'
              }`}
            >
          

              {/* Message Header */}
              <div className="chat-header">
                {userId === msg.senderId._id ? 'You' : msg.senderId.firstName}
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
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
