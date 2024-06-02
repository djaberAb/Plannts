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
                <CardHeader className="p-0">
                    <Image src={image_url} width={500} height={400} alt={name} className="w-full max-h-64 min-h-64 rounded-md" />
                </CardHeader>
                <CardContent className="p-2 h-32">
                    <CardTitle className="text-xl">{name}</CardTitle>
                    <CardDescription className="text-sm">{description}</CardDescription>
                </CardContent>
            <CardFooter className="mt-2 p-2">
                <p className="text-lg font-semibold flex justify-end">{price} DZD</p>
            </CardFooter>
        </Card>
    );
};

export default PlantCard;


