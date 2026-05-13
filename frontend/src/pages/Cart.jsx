import React from 'react';
import { useCart } from '../lib/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, addToCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-4xl font-serif mb-6">Your bag is empty.</h1>
        <p className="text-muted mb-12">Find something handcrafted to fill it with.</p>
        <Link to="/" className="btn-primary">Shop Collection</Link>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-serif mb-12">Your Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-8 border-b pb-8">
              <div className="w-32 aspect-[4/5] bg-muted rounded-sm overflow-hidden border">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">{item.category}</p>
                    <h3 className="text-xl font-serif">{item.name}</h3>
                  </div>
                  <p className="font-medium">${item.price}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border rounded-sm">
                    <button 
                      className="p-2" 
                      onClick={() => item.quantity > 1 && addToCart(item, -1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button 
                      className="p-2"
                      onClick={() => addToCart(item, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    className="text-muted hover:text-red-500 transition-colors"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border p-8 rounded-sm sticky top-8">
            <h2 className="text-xl font-serif mb-8">Summary</h2>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
