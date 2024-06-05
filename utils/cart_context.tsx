"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Plant } from './interfaces';


interface CartContextType {
  cart: Plant[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (plant_Id: number) => void;
  updateQuantity: (plant_Id: number, quantity: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Plant[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (plant: Plant) => {
    setCart((prevCart) => {
      const existingPlant = prevCart.find(item => item.plant_id === plant.plant_id);
      if (existingPlant) {
        return prevCart.map(item =>
          item.plant_id === plant.plant_id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...plant, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (plant_Id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.plant_id !== plant_Id));
  };

  const updateQuantity = (plant_Id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.plant_id === plant_Id ? { ...item, quantity } : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, isCartOpen, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
