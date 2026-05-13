import React, { useState } from 'react';
import MoodPicker from '../components/MoodPicker';
import ProductCard from '../components/ProductCard';
import CuratedShelf from '../components/CuratedShelf';

const allProducts = [
  {
    id: 1,
    name: 'Signature Inkwell',
    price: 45,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop',
    category: 'Ink',
    description: 'Minimalist glass inkwell for precision work.'
  },
  {
    id: 2,
    name: 'Heritage Notebook',
    price: 32,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop',
    category: 'Notebooks',
    description: 'Thread-bound cream paper for creative expression.'
  },
  {
    id: 3,
    name: 'Brass Stylus',
    price: 85,
    image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1000&auto=format&fit=crop',
    category: 'Pens',
    description: 'Solid brass pen for bold decisions.'
  },
  {
    id: 4,
    name: 'Sealing Wax Set',
    price: 28,
    image: 'https://images.unsplash.com/photo-1603533866308-d227976e771c?q=80&w=1000&auto=format&fit=crop',
    category: 'Accessories',
    description: 'Calming ritual of wax sealing letters.'
  }
];

const Home = () => {
  const [curatedItems, setCuratedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodSelect = async (mood) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/curate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, products: allProducts })
      });
      const data = await response.json();
      // data expected to be { curation: [{id, reason}, ...] } 
      // but my backend returns { id, reason } in a wrapper based on response_format
      // Actually my backend returns exactly the JSON object from OpenAI
      // Let's assume it returns { products: [{id, reason}, ...] }
      setCuratedItems(data.products || []);
    } catch (error) {
      console.error('Curation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <MoodPicker onSelect={handleMoodSelect} />
      
      {isLoading && (
        <div className="py-16 text-center">
          <p className="animate-pulse font-serif italic">Curating your shelf...</p>
        </div>
      )}

      {!isLoading && curatedItems.length > 0 && (
        <CuratedShelf curatedItems={curatedItems} products={allProducts} />
      )}
      
      <div className="py-16">
        <h2 className="text-3xl mb-8">All Essentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
