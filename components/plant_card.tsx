import * as React from "react";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

interface PlantCardProps {
    image: string;
    name: string;
    description: string;
    price: number;
}

const PlantCard: React.FC<PlantCardProps> = ({
    image,
    name,
    description,
    price,
}) => {
    return (
        <Card className="w-64">
            <CardHeader className="p-0">
                <Image src={image} width={500} height={500} alt={name} className="w-full h-auto rounded-md" />
            </CardHeader>
            <CardContent className="p-2">
                <CardTitle className="text-xl">{name}</CardTitle>
                <CardDescription className="text-sm text">{description}</CardDescription>
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