import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/5] overflow-hidden bg-muted mb-4 rounded-sm border var(--hairline)">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{product.category}</p>
            <h3 className="text-lg font-serif">{product.name}</h3>
          </div>
          <p className="font-medium">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
