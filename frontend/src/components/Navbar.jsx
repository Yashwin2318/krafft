import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="border-b py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
          Krafft
        </Link>
        
        <div className="flex gap-8 items-center font-medium text-sm uppercase tracking-widest">
          <Link to="/">Shop</Link>
          <Link to="/mood">Mood</Link>
          <Link to="/seller" className="text-accent">Sell</Link>
          <div className="flex gap-4 items-center">
            <Link to="/login"><User size={20} strokeWidth={1.5} /></Link>
            <Link to="/cart" className="flex items-center gap-2">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span>({itemCount})</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
