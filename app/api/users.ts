// api/users.ts
import { query } from "@/utils/db";
import { User } from "@/utils/interfaces";

export async function fetchUsers(): Promise<User[]> {
  return query('SELECT * FROM users', []) as Promise<User[]>;
}

export const addUser = async (user: Partial<User>) => {
  const { username, email, password, firstname, lastname, address, phone, role } = user;
  
  // Log the user data being passed
  console.log('Adding user with params:', username, email, password, firstname, lastname, address, phone, role);

  const sql = 'INSERT INTO users (`username`, `email`, `password`, `firstname`, `lastname`, `address`, `phone`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'

  // Check the result of the query
  const result = await query(sql, [username, email, password, firstname, lastname, address, phone, role]);
  console.log('Add user result:', result);

  return result;
}

export async function editUser(user: Partial<User>): Promise<void> {
  const { user_id, username, email, password, firstname, lastname, address, phone, role } = user;
  await query(
    'UPDATE users SET username = ?, email = ?, password = ?, firstname = ?, lastname = ?, address = ?, phone = ?, role = ? WHERE user_id = ?',
    [username, email, password, firstname, lastname, address, phone, role, user_id]
  );
}

export async function deleteUser(userId: number): Promise<void> {
  await query('DELETE FROM users WHERE user_id = ?', [userId]);
}


