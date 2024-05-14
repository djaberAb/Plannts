import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface PlantCardProps {
    image: string;
    name: string;
    description: string;
    price: number;
    category: string; 
    owner: string; 
    rating: number; 
    species: string;
    stock: number; 
}

const PlantCard: React.FC<PlantCardProps> = ({
    image,
    name,
    description,
    price,
    category,
    owner,
    rating,
    species,
    stock,
}) => {
    return (
        <Card className="w-64">
            <CardHeader className="p-0">
                <Image src={image} width={500} height={400} alt={name} className="w-full max-h-64 min-h-64 rounded-md" />
            </CardHeader>
            <CardContent className="p-2">
                <CardTitle className="text-xl">{name}</CardTitle>
                <CardDescription className="text-sm text">{description}</CardDescription>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="text-sm text-gray-500">Owner: {owner}</p>
                <p className="text-sm text-gray-500">Rating: {rating}</p>
                <p className="text-sm text-gray-500">Species: {species}</p>
                <p className="text-sm text-gray-500">Stock: {stock}</p>
            </CardContent>
            <CardFooter className="mt-2 p-2">
                <p className="text-lg font-semibold">${price}</p>
                <button className="ml-auto bg-green-500 text-white px-4 py-2 rounded">
                    Add to Cart
                </button>
            </CardFooter>
        </Card>
    );
};

export default PlantCard;
