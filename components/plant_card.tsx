import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Plant } from "@/utils/interfaces";
import { Button } from "./ui/button";
import { useCart } from "@/utils/cart_context";
import Link from "next/link";

const PlantCard: React.FC<Plant> = ({
    plant_id,
    image_url,
    name,
    description,
    price,
    category,
    owner_id,
    rating,
    species,
    stock
}) => {
    const { addToCart } = useCart();

    const plant : Plant = {
        plant_id,
        image_url,
        name,
        description,
        price,
        category,
        owner_id,
        rating,
        species,
        stock
    };


    
    return (
        
        
        <Card className="w-64">
            <Link href={{
                pathname: `/marketplace/${plant.plant_id}`,
                query: {
                  plant_id: plant.plant_id,
                  name: plant.name,
                  description: plant.description || '',
                  price: plant.price,
                  category: plant.category,
                  owner_id: plant.owner_id,
                  rating: plant.rating,
                  species: plant.species,
                  stock: plant.stock,
                  image_url: plant.image_url,
                },
            }}
                key={plant.plant_id}
                >
                <CardHeader className="p-0">
                    <Image src={image_url} width={500} height={400} alt={name} className="w-full max-h-64 min-h-64 rounded-md" />
                </CardHeader>
                <CardContent className="p-2 h-32">
                    <CardTitle className="text-xl">{name}</CardTitle>
                    <CardDescription className="text-sm">{description}</CardDescription>
                </CardContent>
            </Link>
            <CardFooter className="mt-2 p-2">
                <p className="text-lg font-semibold flex justify-end">{price} €</p>
                {/* <Button className="ml-auto bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded" onClick={() => addToCart(plant)}>
                    Ajouter au panier
                </Button> */}
            </CardFooter>
        </Card>
    );
};

export default PlantCard;
