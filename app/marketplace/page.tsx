import Navbar from '@/components/navbar';
import PlantCard from '@/components/plant_card';
import React from 'react';
import plant1 from '@/public/plant1.jpg';

export default function Marketplace() {
    return (
        <div>
            <Navbar />
            <div className="pt-24 px-3">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-6xl font-bold">Marketplace</h1>
                    <p className="text-2xl mt-4">This is the marketplace page</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    <PlantCard image={plant1.src} name={'orchid'} description={'loremdf;bdfjbjvbulybvbvuyrlgryl '} price={0} />
                </div>
            </div>
        </div>
    );
}