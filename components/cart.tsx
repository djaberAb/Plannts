import React, { MouseEvent } from 'react';
import { useCart } from '@/utils/cart_context';
import { Button } from '@/components/ui/button';

const Cart: React.FC = () => {

  const { cart, removeFromCart, updateQuantity, isCartOpen, toggleCart } = useCart();

  if (!isCartOpen) return null;

  function handleCheckout(event: MouseEvent<HTMLButtonElement>): void {
    throw new Error('Fonction non implémentée.');
  }

  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 z-50">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Panier</h2>
        <Button onClick={toggleCart}>Fermer</Button>
      </div>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul className="mt-4">
          {cart.map((item) => (
            <li key={item.plant_id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
                <div className="flex items-center">
                  <Button className='text-xl bg-green-500 hover:bg-green-800' onClick={() => updateQuantity(item.plant_id, (item.quantity || 1) - 1)}>-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button className='text-xl bg-green-500 hover:bg-green-800' onClick={() => updateQuantity(item.plant_id, (item.quantity || 1) + 1)}>+</Button>
                </div>
                <Button
                  className="bg-red-500 hover:bg-red-800"
                  onClick={() => removeFromCart(item.plant_id)}
                >
                  Supprimer
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className='flex justify-end'>
        <Button className='mt-12 px-4 py-2 rounded bg-green-500 hover:bg-green-800' onClick={handleCheckout}>Passer à la caisse</Button>
      </div>
    </div>
  );
};

export default Cart;
