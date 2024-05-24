// Cart.tsx
import React from 'react';
import { useCart } from '@/utils/cart_context';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
