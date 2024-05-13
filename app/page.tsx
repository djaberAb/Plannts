"use client"
import Navbar from '@/components/navbar'
import React from 'react'
import { Hero } from './home/hero'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <h1 className="text-6xl font-bold">Home</h1>
        <p className="text-2xl mt-4">This is the home page</p>
      </div>
    </>
  )
}

export default Home