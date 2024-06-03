"use client"

import React, { useEffect, useState } from 'react';
import { getCommandsForOwner, updateCommandStatus } from '@/app/api/checkout';
import { useUser } from '@/utils/user_context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const CommandesPage: React.FC = () => {
  const [commands, setCommands] = useState<any[]>([]);
  
  const { isLoggedIn, userData} = useUser();
  
  const ownerId = userData?.user_id;

  const router = useRouter(); 
  
  useEffect(() => {
    const fetchCommands = async () => {
      if (ownerId) {
        const commands = await getCommandsForOwner(ownerId);
        setCommands(commands);
      }
    };
    fetchCommands();
  }, [ownerId]);

  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }


  const handleStatusUpdate = async (commandId: number, newStatus: string) => {
    const success = await updateCommandStatus(commandId, newStatus);
    if (success) {
      const updatedCommands = await getCommandsForOwner(ownerId || 0);
      setCommands(updatedCommands);
    } else {
      console.error('Failed to update command status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Commandes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commands.map(command => (
          <div key={command.order_id} className="border rounded-md p-4">
            <p className="text-lg font-semibold">Order ID: {command.order_id}</p>
            <p className="text-gray-600">Total Price: {command.total_price}</p>
            <p className="text-gray-600">Status: {command.status}</p>
            <div className="flex justify-end mt-4">
              <Button
                className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600"
                onClick={() => handleStatusUpdate(command.order_id, 'confirmed')}
              >
                Confirm
              </Button>
              <Button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleStatusUpdate(command.order_id, 'refused')}
              >
                Refuse
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandesPage;
