// components/MessageList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Message } from '@/utils/interfaces';



const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('/api/messages');
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.message_id}>
            <strong>{message.username}</strong>: {message.content} <br />
            <small>{new Date(message.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
