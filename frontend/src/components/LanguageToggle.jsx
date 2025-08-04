import React from 'react';
import { FaLanguage } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LanguageToggle = ({ language, onToggle, className = "" }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaLanguage size={16} />
      <span>{language === 'th' ? 'EN' : 'TH'}</span>
    </motion.button>
  );
};

export default LanguageToggle; 