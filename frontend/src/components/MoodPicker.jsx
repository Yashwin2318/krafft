import React from 'react';
import { motion } from 'framer-motion';

const moods = [
  { id: 'focused', label: 'Focused', description: 'Precision tools for deep work.' },
  { id: 'creative', label: 'Creative', description: 'Ignite your imagination.' },
  { id: 'calm', label: 'Calm', description: 'Serene desk essentials.' },
  { id: 'bold', label: 'Bold', description: 'Make a statement.' }
];

const MoodPicker = ({ onSelect }) => {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl mb-4">How do you feel today?</h2>
        <p className="text-muted">Pick a mood, and we'll curate your perfect workspace.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(mood.id)}
            className="p-8 border rounded-lg text-left hover:border-accent transition-colors"
          >
            <h3 className="text-xl mb-2">{mood.label}</h3>
            <p className="text-sm text-muted">{mood.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodPicker;
