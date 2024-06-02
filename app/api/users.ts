"use server"

import { query } from "@/utils/db";
import { User } from "@/utils/interfaces";

export async function fetchUser(email: string, username: string,): Promise<User[]> {
    const user = await query('SELECT * FROM plants', []);
    if (!user) {
        alert("Utilisateur non trouvé");
    }
    return user as User[];
}


export async function handleUpdateUser(username :string, email :string, firstName:string, lastName:string, address:string, phone:string, userId:string): Promise<void>{
    await query("UPDATE users SET `username` = ?, `email` = ?, `firstname` = ?, `lastname` = ?, `address` = ?, `phone` = ? WHERE `user_id` = ?", [username, email, firstName, lastName, address, phone, userId]);
    
    console.log("Utilisateur mis à jour avec succès");
}

export async function fetchUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await query('SELECT user_id, username, email, firstname, lastname, address, phone, role FROM users', []);
    if (!users) {
      return [];
    }
    return users;
  }
  
export async function addUser(user: Omit<User, 'user_id'>): Promise<void> {
const { username, email, password, firstname, lastname, address, phone, role } = user;
await query('INSERT INTO users (username, email, password, firstname, lastname, address, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [username, email, password, firstname, lastname, address, phone, role]);
}
  
export async function editUser(user: Omit<User, 'password'> & { password?: string }): Promise<void> {
const { user_id, username, email, firstname, lastname, address, phone, role, password } = user;
if (password) {
    await query('UPDATE users SET username = ?, email = ?, password = ?, firstname = ?, lastname = ?, address = ?, phone = ?, role = ? WHERE user_id = ?', [username, email, password, firstname, lastname, address, phone, role, user_id]);
} else {
    await query('UPDATE users SET username = ?, email = ?, firstname = ?, lastname = ?, address = ?, phone = ?, role = ? WHERE user_id = ?', [username, email, firstname, lastname, address, phone, role, user_id]);
}
}

export async function deleteUser(userId: number): Promise<void> {
    await query('DELETE FROM users WHERE user_id = ?', [userId]);
}