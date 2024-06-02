import { query } from "@/utils/db";
import { Plant } from "@/utils/interfaces";

export async function fetchPlants(): Promise<Plant[]> {
    const plants = await query('SELECT * FROM plants', []);
    if (!plants) {
        return mockPlants;
    }
    return plants as Plant[];
}

export async function fetchPlantsByUserId(userId: string): Promise<Plant[]> {
    const plants = await query('SELECT * FROM plants WHERE owner_id = ?', [userId]);
    if (!plants) {
        return [];
    }
    return plants;
}

export async function addPlant(plant: Plant): Promise<void> {
    const { name, description, price, category, owner_id, rating, species, stock, image_url } = plant;
    await query('INSERT INTO plants `name`, `description`, `price`, `category`, `owner_id`, `rating`, `species`, `stock`, `image_url` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [name, description, price, category, owner_id, rating, species, stock, image_url]);
}   

export async function editPlant(plant: Plant): Promise<void> {
    const { plant_id, name, description, price, category, owner_id, rating, species, stock, image_url } = plant;
    await query('UPDATE plants SET name = ?, description = ?, price = ?, category = ?, owner_id = ?, rating = ?, species = ?, stock = ?, image_url = ? WHERE plant_id = ?', 
      [name, description, price, category, owner_id, rating, species, stock, image_url, plant_id]);
}

export async function deletePlant(plantId: number): Promise<void> {
    await query('DELETE FROM plants WHERE plant_id = ?', [plantId]);
}
const mockPlants: Plant[] = [
    {
        plant_id: 1,
        name: 'Plante serpent',
        description: 'A beautiful indoor plant',
        price: 19.99,
        category: 'intérieur',
        owner_id: 4,
        rating: 4.5,
        species: 'Ficus elastica',
        stock: 10,
        image_url: '/plants/snake_Plant.jpg',
    },
];
