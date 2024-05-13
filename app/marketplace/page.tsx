"use client"
import Navbar from '@/components/navbar';
import PlantCard from '@/components/plant_card';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPlants } from "@/utils/db"
import { Plant } from '@/utils/interfaces';

export default function Marketplace() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchData() {
            const plantsData = await fetchPlants();
            setPlants(plantsData);
        }
        fetchData();
    }, []);

    const filteredPlants = plants.filter((plant: Plant) => {
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
                <div className="flex items-center justify-between mb-8">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md"
                        value={filter}
                        onChange={handleFilter}
                    >
                        <option value="">All</option>
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="succulent">Succulent</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {filteredPlants.map((plant: Plant) => (
                        <Link href={`/marketplace/${plant.id}`} key={plant.id}>
                            <PlantCard
                                key={plant.id}
                                image={plant.image_url}
                                name={plant.name}
                                description={plant.description || ''}
                                price={plant.price}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}