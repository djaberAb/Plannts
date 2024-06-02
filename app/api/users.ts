// api/users.ts
import { query } from "@/utils/db";
import { User } from "@/utils/interfaces";

export async function fetchUsers(): Promise<User[]> {
  return query('SELECT * FROM users', []) as Promise<User[]>;
}

export async function addUser(user: Omit<User, 'user_id'>): Promise<void> {
  const { username, email, password, firstname, lastname, address, phone, role } = user;
  await query(
    'INSERT INTO users (`username`, `email`, `password`, `firstname`, `lastname`, `address`, `phone`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [username, email, password, firstname, lastname, address, phone, role]
  );
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
