
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RetryButtonProps {
  onRetry: () => void;
  isRetrying: boolean;
  disabled?: boolean;
}

const RetryButton: React.FC<RetryButtonProps> = ({ onRetry, isRetrying, disabled }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-yellow-400 border-yellow-400/30 bg-transparent hover:bg-yellow-400/10 flex items-center transition-all duration-300 hover:scale-105"
      onClick={onRetry}
      disabled={disabled || isRetrying}
    >
      <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isRetrying ? 'animate-spin' : ''}`} />
      {isRetrying ? 'Menganalisis...' : 'Coba Lagi'}
    </Button>
  );
};

export default RetryButton;
