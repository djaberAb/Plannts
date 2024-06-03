// pages/api/threads.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/utils/db';

// API route to fetch threads
const threadsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const threads = await query('SELECT * FROM threads', []);
            res.status(200).json(threads);
        } catch (error) {
            console.error('Error fetching threads:', error);
            res.status(500).json({ message: 'Error fetching threads' });
        }
    } else if (req.method === 'POST') {
        const { title, content } = req.body;
        try {
            await query('INSERT INTO threads (title, content) VALUES (?, ?)', [title, content]);
            res.status(201).json({ message: 'Thread created successfully' });
        } catch (error) {
            console.error('Error creating thread:', error);
            res.status(500).json({ message: 'Error creating thread' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default threadsHandler;
