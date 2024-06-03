import { query } from '@/utils/db';

export async function addCommande(userId: number, cartData: any[], total_price:string): Promise<number | null> {
    try {
      // Convert the cart data to JSON string
        const cartJson = JSON.stringify(cartData);
        // console.log(cartJson["0"]["owner_id"];
        // SQL query to insert the command into the commandes table
        const sql = `
            INSERT INTO commandes (user_id, cart, created_at, total_price) 
            VALUES (?, ?, NOW(), ?)
        `;
        
        // Execute the SQL query
        const result = await query(sql, [userId, cartJson, total_price]);
      
      // Return the ID of the inserted row
      return result?.insertId || null;
    } catch (error) {
      console.error('Error adding command:', error);
      return null;
    }
  }

  // Function to fetch commands for a specific owner
export async function getCommandsForOwner(seller_id: number): Promise<any[]> {
    try {
      const sql = 'SELECT * FROM commandes WHERE `seller_id` = ? AND `status` = "pending" ORDER BY `created_at` DESC';
      const commands = await query(sql, [seller_id]);
      return commands || [];
    } catch (error) {
      console.error('Error fetching commands for owner:', error);
      return [];
    }
  }
  
  // Function to update the status of a command
  export async function updateCommandStatus(commandId: number, status: string): Promise<boolean> {
    try {
      const sql = 'UPDATE commandes SET status = ? WHERE order_id = ?'; // Change 'order_id' to 'commande_id'
      await query(sql, [status, commandId]);
      return true;
    } catch (error) {
      console.error('Error updating command status:', error);
      return false;
    }
  }