
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIGenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  size?: 'default' | 'sm';
  className?: string;
}

const AIGenerateButton: React.FC<AIGenerateButtonProps> = ({ 
  onClick, 
  isGenerating, 
  size = 'default',
  className = ''
}) => {
  return (
    <Button 
      type="button"
      variant="outline"
      size={size}
      onClick={onClick}
      disabled={isGenerating}
      className={`flex items-center gap-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 ${className}`}
    >
      {isGenerating ? (
        <>
          <Loader2 className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} animate-spin`} />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
          {size === 'sm' ? 'AI' : 'Generate dengan AI'}
        </>
      )}
    </Button>
  );
};

export default AIGenerateButton;
