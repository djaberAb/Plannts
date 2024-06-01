"use server"

import mysql from 'mysql2/promise';
// Create a connection pool
const pool = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    database: "plannt",
    user: "root",
    password: ""
});

export async function query(query: string, data: any[]) {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute(query, data);
        connection.release();
        return JSON.parse(JSON.stringify(rows));
    } catch (error) {
        console.error(error);
        return null;
    }
}
