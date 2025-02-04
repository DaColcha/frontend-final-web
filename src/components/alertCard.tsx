'use client';

import { useState } from 'react';

interface AlertCardProps {
  message: string;
  type: 'success' | 'error';
}

const AlertCard: React.FC<AlertCardProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => setIsVisible(false);

  return (
    <div className={`flex flex-row justify-between space-x-8 p-4 mb-4 text-sm  ${type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
      <span className="font-medium">{message}</span>
      <button onClick={handleClose} className="ml-2 text-sm font-medium text-red-700 hover:text-red-800 focus:outline-none focus:underline">
        Cerrar
      </button>
    </div>
  );
};

export default AlertCard;