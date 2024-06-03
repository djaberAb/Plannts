// interfaces.ts
// utils/interfaces.ts
export interface User {
    user_id: number;
    username: string;
    email: string;
    password?: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
    role?: "admin" | "client";
  }
  

export interface Plant {
    plant_id: number;
    name: string;
    description: string;
    price: number;
    category: 'intérieur' | 'extérieur' | 'succulent';
    owner_id: number;
    rating: number;
    species: string;
    stock: number;
    image_url: string;
    quantity?: number;
}
