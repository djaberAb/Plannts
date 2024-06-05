// pages/exchange.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { useUser } from '@/utils/user_context';
import { Plant } from '@/utils/interfaces';
import { Button } from '@/components/ui/button';
import { getUserPlants } from '@/app/api/exchange';
import { requestExchange } from '@/app/api/exchange';

const ExchangePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userData } = useUser();

  const [userPlants, setUserPlants] = useState<Plant[]>([]);

  const plant_id = parseInt(searchParams.get('plant_id') || '0');
  const plant_name = searchParams.get('name');
  const owner_id = parseInt(searchParams.get('owner_id') || '0');

  useEffect(() => {
    const fetchUserPlants = async () => {
      if (userData?.user_id) {
        const plants = await getUserPlants(userData.user_id);
        setUserPlants(plants);
      }
    };

    fetchUserPlants();
  }, [userData?.user_id]);

  const handleExchange = async (exchangePlantId: number) => {
    if (userData?.user_id) {
      const success = await requestExchange(userData.user_id, owner_id, plant_id, exchangePlantId);
      if (success) {
        router.push('/exchange/success');
      } else {
        console.error('Échec de la demande d\'échange');
      }
    }
  };

  if (!userData) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Échangez votre plante</h2>
        <p>Choisissez l'une de vos plantes à échanger avec {plant_name} :</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {userPlants.map((plant) => (
            <div key={plant.plant_id} className="border rounded-md p-4">
              <p className="text-lg font-semibold">{plant.name}</p>
              <Button
                className="mt-2 bg-green-500 hover:bg-green-800 text-white rounded"
                onClick={() => handleExchange(plant.plant_id)}
              >
                Échanger avec cette plante
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangePage;
