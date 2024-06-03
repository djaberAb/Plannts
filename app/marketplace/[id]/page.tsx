"use client";

import { useCart } from '@/utils/cart_context';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Cart from '@/components/cart';
import { Plant } from '@/utils/interfaces';

const PlantDetail: React.FC = () => {
  const searchParams = useSearchParams();

  const plant_id = parseInt(searchParams.get('plant_id') || '0');
  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const price = parseFloat(searchParams.get('price') || '0');
  const category = searchParams.get('category') as 'intérieur' | 'extérieur' | 'succulent';
  const owner_id = parseInt(searchParams.get('owner_id') || '0');
  const rating = parseFloat(searchParams.get('rating') || '0');
  const species = searchParams.get('species');
  const stock = parseInt(searchParams.get('stock') || '0');
  const image_url = searchParams.get('image_url');

  const { addToCart, toggleCart } = useCart();

  const plant : Plant = {
    plant_id,
    name: name ?? '',
    description: description ?? '',
    image_url: image_url ?? '',
    price,
    rating,
    species: species ?? '',
    stock,
    category,
    owner_id,
  };

  if (!plant_id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-24 px-3 flex p-40">
        <div className="w-1/4 mr-4">
          <Image
            src={image_url as string}
            alt={name as string}
            style={{ objectFit: 'cover' }}
            width={600}
            height={400}
            className="mt-4"
          />
        </div>
        <div className="w-1/2 pt-6">
          <h1 className="text-3xl font-bold">{name}</h1>
          <Label className="mt-4 text-lg">{description}</Label>
          <div className="mt-2 grid gap-4">
            <div className="grid gap-2">
              <Label className="text-lg">Prix: {price} DZD</Label>
              <Label className="text-lg">Catégorie: {category}</Label>
              <Label className="text-lg">Propriétaire: {owner_id}</Label>
              <Label className="text-lg">Évaluation: {rating}</Label>
              <Label className="text-lg">Espèce: {species}</Label>
              <Label className="text-lg">Stock: {stock}</Label>
            </div>
            <Button className="bg-green-500 hover:bg-green-800 text-white rounded" onClick={() => addToCart(plant)}>Ajouter au panier</Button>
            <Button className="bg-green-500 hover:bg-green-800 text-white rounded" onClick={toggleCart}>Voir le panier</Button>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default PlantDetail;
