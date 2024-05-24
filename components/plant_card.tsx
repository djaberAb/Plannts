import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import internal from "stream";
import { Plant } from "@/utils/interfaces";


const PlantCard: React.FC<Plant> = ({
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
    return (
        <Card className="w-64">
            <CardHeader className="p-0">
                <Image src={image_url} width={500} height={400} alt={name} className="w-full max-h-64 min-h-64 rounded-md" />
            </CardHeader>
            <CardContent className="p-2 h-32">
                <CardTitle className="text-xl">{name}</CardTitle>
                <CardDescription className="text-sm text ">{description}</CardDescription>
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