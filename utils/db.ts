"use server"

import mysql from 'mysql2/promise';
import { Plant } from './interfaces';

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
        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Execute the query
        const [rows, fields] = await connection.execute(query, data);

        // Release the connection back to the pool
        connection.release();

        return rows;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchPlants(): Promise<Plant[]> {
    const plants = await query('SELECT * FROM plants', []);
    return plants as Plant[];
}
