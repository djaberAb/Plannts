import Navbar from '@/components/navbar'
import React from 'react'

export default function Marketplace () {

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-6xl font-bold">Contact</h1>
                <p className="text-2xl mt-4">This is the contact page</p>
            </div>
        </div>
    )
}