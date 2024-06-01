export interface Plant {
    plant_id: number;
    name: string;
    description?: string;
    image_url: string;
    price: number;
    rating: number;
    species: string;
    stock: number;
    category: 'intérieur' | 'extérieur' | 'succulent';
    owner_id: number;
    quantity?: number;
}

export interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
}