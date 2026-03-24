
import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingIndicatorProps {
  isVisible: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-3 right-3">
      <Sparkles size={16} className="text-yellow-400 animate-pulse" />
    </div>
  );
};

export default LoadingIndicator;
