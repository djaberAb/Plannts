import { query } from "@/utils/db";
import { Plant } from "@/utils/interfaces";

export async function fetchPlants(): Promise<Plant[]> {
    return query('SELECT * FROM plants', []);
}

export async function fetchPlantsByUserId(userId: number): Promise<Plant[]> {
    return query('SELECT * FROM plants WHERE owner_id = ?', [userId]);
}

export async function addPlant(plant: Omit<Plant, 'plant_id'>): Promise<void> {
    const { name, description, price, category, owner_id, rating, species, stock, image_url } = plant;
    await query(
        'INSERT INTO plants (name, description, price, category, owner_id, rating, species, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, price, category, owner_id, rating, species, stock, image_url]
    );
}

export async function editPlant(plant: Plant): Promise<void> {
    const { plant_id, name, description, price, category, owner_id, rating, species, stock, image_url } = plant;
    await query(
        'UPDATE plants SET name = ?, description = ?, price = ?, category = ?, owner_id = ?, rating = ?, species = ?, stock = ?, image_url = ? WHERE plant_id = ?',
        [name, description, price, category, owner_id, rating, species, stock, image_url, plant_id]
    );
}

export async function deletePlant(plantId: number): Promise<void> {
    await query('DELETE FROM plants WHERE plant_id = ?', [plantId]);
}
