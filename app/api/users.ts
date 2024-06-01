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
