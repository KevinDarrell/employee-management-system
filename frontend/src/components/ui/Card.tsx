import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);