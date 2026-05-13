import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: id,
    name: 'Signature Inkwell',
    price: 45,
    description: 'A hand-blown glass inkwell designed for the modern calligrapher. Weighted base with a secure cork stopper to prevent drying.',
    details: [
      'Hand-blown glass',
      'Weighted base for stability',
      'Airtight cork stopper',
      'Capacity: 30ml'
    ],
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Ink'
  };

  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Product Images */}
        <div className="aspect-[4/5] bg-muted rounded-sm overflow-hidden border var(--hairline)">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-muted mb-4">{product.category}</p>
          <h1 className="text-5xl mb-6">{product.name}</h1>
          <p className="text-2xl mb-8">${product.price}</p>
          
          <div className="border-t py-8">
            <p className="text-lg leading-relaxed mb-8">{product.description}</p>
            <ul className="space-y-2 mb-12">
              {product.details.map((detail, index) => (
                <li key={index} className="text-sm text-muted flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  {detail}
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <div className="flex items-center border rounded-sm px-4">
                <button 
                  className="p-2"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button 
                  className="p-2"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button 
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                onClick={() => addToCart(product, quantity)}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
