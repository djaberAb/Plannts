"use client"

import { useState, useEffect } from 'react';

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/threads');
      const data = await res.json();
      setThreads(data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      fetchThreads();
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Forum Threads</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-2"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Thread'}
        </button>
      </form>
      <ul>
        {threads.map((thread: any) => (
          <li key={thread.id} className="border border-gray-300 rounded-md py-2 px-3 mb-2">
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
