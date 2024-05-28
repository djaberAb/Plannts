"use client";

import Navbar from '@/components/navbar';
import PlantCard from '@/components/plant_card';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPlants } from '@/utils/db'; // Replace with your API call
import { Plant } from '@/utils/interfaces';
import { CartProvider } from '@/utils/cart_context';

export default function Marketplace() {
  const [plants, setPlants] = useState<Plant[]>([]); // Actual data from API
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const plantsData = await fetchPlants(); // Replace with your API call
        setPlants(plantsData);
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    }
    fetchData();
  }, []);

  const filteredPlants = plants?.filter((plant: Plant) => {
    if (filter === '') {
      return true;
    }
    return plant.category === filter;
  });

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className='pt-24 px-3'>
        <div className='flex items-center justify-between mb-8'>
          <select
            className='px-4 py-2 border border-gray-300 rounded-md'
            value={filter}
            onChange={handleFilter}
          >
            <option value=''>Tous</option>
            <option value='intérieur'>Intérieur</option>
            <option value='extérieur'>Extérieur</option>
            <option value='succulent'>Succulent</option>
          </select>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
          {filteredPlants.map((plant: Plant) => (
            <CartProvider key={plant.plant_id}>
              <PlantCard
                image_url={plant.image_url}
                name={plant.name}
                description={plant.description || ''}
                price={plant.price}
                category={plant.category}
                owner_id={plant.owner_id}
                rating={plant.rating}
                species={plant.species}
                stock={plant.stock}
                plant_id={plant.plant_id}
              />
            </CartProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
