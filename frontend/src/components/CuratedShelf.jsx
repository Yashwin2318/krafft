import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const CuratedShelf = ({ curatedItems, products }) => {
  if (!curatedItems || curatedItems.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 bg-white -mx-[calc(var(--grid-unit)*4)] px-[calc(var(--grid-unit)*4)] border-y"
    >
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl font-serif">Curated for You</h2>
          <p className="text-muted">Handpicked essentials based on your current state of mind.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {curatedItems.map((item) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="flex flex-col gap-6">
                <ProductCard product={product} />
                <div className="p-4 bg-[#FAFAF8] border-l-2 border-accent">
                  <p className="text-sm italic font-serif leading-relaxed">
                    "{item.reason}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default CuratedShelf;
