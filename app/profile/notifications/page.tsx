// components/CommandesPage.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { getCommandsForOwner, updateCommandStatus } from '@/app/api/checkout';
import { getExchangesForOwner, updateExchangeStatus } from '@/app/api/exchange';
import { useUser } from '@/utils/user_context';
import { Button } from '@/components/ui/button';
import SideNav from '@/components/sideNav';

const CommandesPage: React.FC = () => {
  const [commands, setCommands] = useState<any[]>([]);
  const [exchanges, setExchanges] = useState<any[]>([]);
  const { userData } = useUser();
  const ownerId = userData?.user_id;

  useEffect(() => {
    const fetchData = async () => {
      if (ownerId) {
        const [fetchedCommands, fetchedExchanges] = await Promise.all([
          getCommandsForOwner(ownerId),
          getExchangesForOwner(ownerId)
        ]);
        setCommands(fetchedCommands);
        setExchanges(fetchedExchanges);
      }
    };
    fetchData();
  }, [ownerId]);

  const handleCommandStatusUpdate = async (commandId: number, newStatus: string) => {
    const success = await updateCommandStatus(commandId, newStatus);
    if (success) {
      const updatedCommands = await getCommandsForOwner(ownerId || 0);
      setCommands(updatedCommands);
    } else {
      console.error('Échec de la mise à jour du statut de la commande');
    }
  };

  const handleExchangeStatusUpdate = async (exchangeId: number, newStatus: string) => {
    const success = await updateExchangeStatus(exchangeId, newStatus);
    if (success) {
      const updatedExchanges = await getExchangesForOwner(ownerId || 0);
      setExchanges(updatedExchanges);
    } else {
      console.error('Échec de la mise à jour du statut de l\'échange');
    }
  };

  return (
    <div className="flex">
      <SideNav title={'Notifications'} />
      <div className="ml-60 pt-2 px-4 space-y-2 bg-green-500 flex-grow pb-4 align">
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div>
        <h3 className="text-xl font-semibold mb-4">Commandes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commands.map(command => (
            <div key={command.order_id} className="border rounded-md p-4 bg-white">
              <p className="text-lg font-semibold">ID de la commande : {command.order_id}</p>
              <p className="text-gray-600">Prix total : {command.total_price}</p>
              <p className="text-gray-600">Statut : {command.status}</p>
              <div className="flex justify-end mt-4">
                <Button
                  className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600"
                  onClick={() => handleCommandStatusUpdate(command.order_id, "confirmed")}
                >
                  Confirmer
                </Button>
                <Button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleCommandStatusUpdate(command.order_id, 'refused')}
                >
                  Refuser
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 mt-8">Demandes d'échange</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exchanges.map(exchange => (
            <div key={exchange.exchange_id} className="border rounded-md p-4 bg-white">
              <p className="text-lg font-semibold">ID de l'échange : {exchange.exchange_id}</p>
              <p className="text-gray-600">ID de la plante demandée : {exchange.plant_id}</p>
              <p className="text-gray-600">ID de la plante offerte : {exchange.exchange_plant_id}</p>
              <p className="text-gray-600">Statut : {exchange.status}</p>
              <div className="flex justify-end mt-4">
                <Button
                  className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 hover:bg-green-600"
                  onClick={() => handleExchangeStatusUpdate(exchange.exchange_id, "confirmed")}
                >
                  Confirmer
                </Button>
                <Button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleExchangeStatusUpdate(exchange.exchange_id, 'refused')}
                >
                  Refuser
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      </div>
    </div>  
  );
};

export default CommandesPage;
