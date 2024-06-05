import { query } from "@/utils/db";

export async function getMessages() {
    try {
      const messages = await query(
        `SELECT m.message_id, m.content, m.created_at, u.username 
         FROM messages m 
         JOIN users u ON m.user_id = u.user_id 
         ORDER BY m.created_at DESC`,
        []
      );
      return messages;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }
  
  export async function addMessage(userId: number, content: string) {
    try {
      await query(
        'INSERT INTO messages (user_id, content, created_at) VALUES (?, ?, NOW())',
        [userId, content]
      );
      return { message: 'Message sent successfully' };
    } catch (error) {
      console.error('Failed to send message:', error);
      throw new Error('Failed to send message');
    }
  }