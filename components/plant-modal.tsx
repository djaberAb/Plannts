import React, { useState, useEffect } from 'react';
import { Plant } from '@/utils/interfaces';

interface PlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plant: Plant) => void;
  initialPlant?: Partial<Plant>;
}

const PlantModal: React.FC<PlantModalProps> = ({ isOpen, onClose, onSave, initialPlant }) => {
  const [plant, setPlant] = useState<Partial<Plant>>(initialPlant || {});

  useEffect(() => {
    setPlant(initialPlant || {});
  }, [initialPlant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlant(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(plant as Plant);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl mb-4">Manage Plant</h2>
        <input type="text" name="name" placeholder="Name" value={plant.name || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="text" name="description" placeholder="Description" value={plant.description || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="number" name="price" placeholder="Price" value={plant.price || 0} onChange={handleChange} className="mb-2 p-2 border" />
        <select name="category" value={plant.category || ''} onChange={handleChange} className="mb-2 p-2 border">
          <option value="" disabled>Select Category</option>
          <option value="intérieur">Intérieur</option>
          <option value="extérieur">Extérieur</option>
          <option value="succulent">Succulent</option>
        </select>
        <input type="text" name="species" placeholder="Species" value={plant.species || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="number" name="stock" placeholder="Stock" value={plant.stock || 0} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="text" name="image_url" placeholder="Image URL" value={plant.image_url || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 p-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default PlantModal;
