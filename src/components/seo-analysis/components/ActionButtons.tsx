
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface ActionButtonsProps {
  analysisResults: string | null;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ analysisResults }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <Button 
        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white"
        onClick={() => window.print()}
      >
        Download Laporan
      </Button>
      
      <Button
        variant="outline" 
        className="w-full border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10"
        onClick={() => navigator.clipboard.writeText(analysisResults || '')}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Salin Hasil
      </Button>
    </div>
  );
};

export default ActionButtons;
