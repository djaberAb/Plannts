// components/MessageForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const MessageForm: React.FC<{ userId: number }> = ({ userId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/messages', { userId, content });
      setContent('');
      // Optionally, you can refresh the message list here
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here..."
        required
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
