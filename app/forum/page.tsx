"use client";

import React, { useEffect, useRef, useState } from 'react';
import { getMessages, addMessage } from '@/app/api/messages'; // Adjust the path if needed
import { useUser } from '@/utils/user_context';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';

const CommandesPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const { userData } = useUser();
  const userId = userData?.user_id;

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages.reverse()); // Reverse the order of messages
    };
    fetchMessages();
  }, []);


  const handleSendMessage = async (content: string) => {
    if (!userId) return;
    try {
      await addMessage(userId, content);
      const updatedMessages = await getMessages();
      setMessages(updatedMessages.reverse()); // Reverse the order of messages
      (document.getElementById('messageContent') as HTMLTextAreaElement).value = '';
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col h-screen">
        <h2 className="text-2xl font-semibold mb-4">Forum</h2>
        <div className="flex-grow overflow-y-auto mb-4">
          {messages.map(message => (
            <div
              key={message.message_id}
              className={`p-4 mb-4 rounded-md ${message.user_id === userId ? 'bg-green-100 self-end text-right' : 'bg-gray-100'}`}
            >
              <p className="text-lg font-semibold">{message.username}</p>
              <p className="text-gray-600">{message.content}</p>
              <p className="text-gray-600 text-sm">{new Date(message.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 bg-white py-4">
          <textarea
            id="messageContent"
            className="w-full border rounded p-2 mb-2"
            placeholder="Type your message here..."
          ></textarea>
          <Button
            className="w-full bg-blue-500 text-white rounded py-2"
            onClick={() => handleSendMessage((document.getElementById('messageContent') as HTMLTextAreaElement).value)}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default CommandesPage;
