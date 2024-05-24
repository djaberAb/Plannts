"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PlantDetail = () => {
  const searchParams = useSearchParams();

  const plant_id = searchParams.get('plant_id');
  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const price = searchParams.get('price');
  const category = searchParams.get('category');
  const owner_id = searchParams.get('owner_id');
  const rating = searchParams.get('rating');
  const species = searchParams.get('species');
  const stock = searchParams.get('stock');
  const image_url = searchParams.get('image_url');

  // Ensure you handle cases where the query parameters might not be immediately available
  if (!plant_id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='pt-24 px-3 flex p-40'>
        <div className='w-1/2'>
          <Image src={image_url as string} alt={name as string} style={{objectFit: "cover"}} width={600} height={400} className='mt-4 '/>
        </div>
        <div className='w-1/2 pt-8'>
          <h1 className='text-4xl font-bold'>{name}</h1>
          <Label className='mt-4 text-lg'>{description}</Label>
          <div className='mt-2 grid gap-10'>
            <div className='grid gap-2'>
              <Label className='text-lg font'>Price: {price}</Label>
              <Label className='text-lg'>Category: {category}</Label>
              <Label className='text-lg'>Owner: {owner_id}</Label>
              <Label className='text-lg'>Rating: {rating}</Label>
              <Label className='text-lg'>Species: {species}</Label>
              <Label className='text-lg'>Stock: {stock}</Label>
            </div>
          <Button>Ajouter aux Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
