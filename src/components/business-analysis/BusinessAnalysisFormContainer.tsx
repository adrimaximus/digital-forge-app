
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface BusinessAnalysisFormContainerProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BusinessAnalysisFormContainer: React.FC<BusinessAnalysisFormContainerProps> = ({ 
  title, 
  onClose, 
  children 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full mx-auto bg-slate-800 ${isMobile ? 'px-4 py-5 h-full' : 'p-6 max-w-3xl rounded-lg shadow-lg border border-yellow-400/30'}`}>
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-800 z-10">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-slate-700">
          <X size={18} />
        </Button>
      </div>
      
      <div className={`${isMobile ? 'pb-24' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default BusinessAnalysisFormContainer;
