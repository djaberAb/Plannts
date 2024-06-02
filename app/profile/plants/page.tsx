"use client"

import React, { useState, useEffect } from 'react';
import { useUser } from '@/utils/user_context';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/sideNav';
import { fetchPlantsByUserId, addPlant, editPlant, deletePlant } from '../../api/plants';
import { Plant } from '@/utils/interfaces';
import PlantCard from '@/components/plant_card';
import PlantModal from '@/components/plant_modal';

const ProfilePage = () => {
  const { isLoggedIn, userData } = useUser();
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPlantData, setEditPlantData] = useState<Partial<Plant> | undefined>(undefined);

  useEffect(() => {
    if (userData) {
      fetchPlantsByUserId(userData.user_id).then(setPlants);
    }
  }, [userData]);

  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const handleAddPlant = async (plant: Plant) => {
    if (userData) {
      await addPlant({ ...plant, owner_id: userData.user_id });
      const updatedPlants = await fetchPlantsByUserId(userData.user_id); 
      setPlants(updatedPlants);
    }
  };

  const handleEditPlant = async (plant: Plant) => {
    if (userData) {
      await editPlant(plant);
      const updatedPlants = await fetchPlantsByUserId(userData.user_id);
      setPlants(updatedPlants);
    }
  };

  const handleDeletePlant = async (plantId: number) => {
    await deletePlant(plantId);
    if (userData) {
      const updatedPlants = await fetchPlantsByUserId(userData.user_id);
      setPlants(updatedPlants);
    }
  };

  const openModal = (plant?: Plant) => {
    setEditPlantData(plant || undefined);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditPlantData(undefined);
  };

  const handleSave = (plant: Plant) => {
    if (editPlantData) {
      handleEditPlant(plant);
    } else {
      handleAddPlant(plant);
    }
    closeModal();
  };

  return (
    <div className="flex">
      <SideNav title={'Dashboard'} />
      <div className="ml-60 pt-2 px-4 space-y-2 bg-green-500 flex-grow pb-4 align">
        {userData && (
          <div>
            <h1 className='text-white font-bold mb-4 mt-1'>My Plants</h1>
            <button onClick={() => openModal()} className="mb-4 p-2 bg-blue-500 text-white rounded">Add Plant</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plants.map(plant => (
                <div key={plant.plant_id} className="relative">
                  <PlantCard {...plant} />
                  <div className="absolute top-0 right-0 p-2 space-x-2">
                    <button onClick={() => openModal(plant)} className="p-1 bg-yellow-300 rounded">Edit</button>
                    <button onClick={() => handleDeletePlant(plant.plant_id)} className="p-1 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <PlantModal isOpen={modalOpen} onClose={closeModal} onSave={handleSave} initialPlant={editPlantData} />
    </div>
  );
};

export default ProfilePage;
