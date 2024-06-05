// pages/ExchangeSuccessPage.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';

const ExchangeSuccessPage: React.FC = () => {
  const router = useRouter();

  const handleContinueBrowsing = () => {
    router.push('/marketplace'); // Adjust the path to your plants listing page
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-600">Échange Requête Envoyée!</h1>
          <p className="text-lg mb-8">Votre requête d'échange a été envoyée avec succès. Vous recevrez une notification une fois que l'autre utilisateur aura confirmé ou refusé l'échange.</p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={handleContinueBrowsing}>
              Continuer à Naviguer
            </Button>
            <Button className="bg-gray-500 hover:bg-gray-700 text-white" onClick={handleGoHome}>
              Aller à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSuccessPage;
