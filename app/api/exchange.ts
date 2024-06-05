// lib/exchange.ts
import { query } from '@/utils/db';

export async function requestExchange(requesterId: number, ownerId: number, plantId: number, exchangePlantId: number) {
    try {
      await query(
        'INSERT INTO exchanges (requester_id, owner_id, plant_id, exchange_plant_id, status, created_at) VALUES (?, ?, ?, ?, "pending", NOW())',
        [requesterId, ownerId, plantId, exchangePlantId]
      );
      return true;
    } catch (error) {
      console.error('Error requesting exchange:', error);
      return false;
    }
  }


export async function getUserPlants(userId: number): Promise<any>{
    try {
      const plants = await query('SELECT * FROM plants WHERE owner_id = ?', [userId]);
      return plants;
    } catch (error) {
      console.error('Error fetching user plants:', error);
      return null;
    }
  }



  export async function getExchangesForOwner(owner_id: number): Promise<any[]> {
    try {
      const sql = 'SELECT * FROM exchanges WHERE owner_id = ? AND status = "pending" ORDER BY created_at DESC';
      const exchanges = await query(sql, [owner_id]);
      return exchanges || [];
    } catch (error) {
      console.error('Error fetching exchanges for owner:', error);
      return [];
    }
  }
  
  // Update the status of an exchange request
  export async function updateExchangeStatus(exchangeId: number, status: string): Promise<boolean> {
    try {
      const sql = 'UPDATE exchanges SET status = ? WHERE exchange_id = ?';
      await query(sql, [status, exchangeId]);
      return true;
    } catch (error) {
      console.error('Error updating exchange status:', error);
      return false;
    }
  }