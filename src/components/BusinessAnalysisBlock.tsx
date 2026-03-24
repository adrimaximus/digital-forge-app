
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import BusinessAnalysisForm from './BusinessAnalysisForm';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';

const BusinessAnalysisBlock: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const isMobile = useIsMobile();
  
  // Function to update visitor name from sessionStorage
  const updateVisitorName = () => {
    const storedName = sessionStorage.getItem('visitorName');
    console.log('BusinessAnalysisBlock: Found visitor name in session:', storedName);
    if (storedName) {
      setVisitorName(storedName);
    }
  };
  
  // Initial name loading
  useEffect(() => {
    updateVisitorName();
    
    // Listen for name updates
    window.addEventListener('visitorNameUpdated', updateVisitorName);
    
    return () => {
      window.removeEventListener('visitorNameUpdated', updateVisitorName);
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Business analysis button clicked, isMobile:", isMobile);
    
    if (isMobile) {
      setShowForm(true);
    } else {
      setOpenDrawer(true);
    }
  };
  
  const handleFormClose = () => {
    setShowForm(false);
    setOpenDrawer(false);
    // Update visitor name when form is closed
    updateVisitorName();
  };
  
  const formContent = (
    <BusinessAnalysisForm onClose={handleFormClose} />
  );
  
  return (
    <section className="py-20">
      <div id="business-analysis-block" className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-sm max-w-xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2 heading-gradient">
            Analisa Bisnismu dengan AI{visitorName ? `, ${visitorName}!` : '!'}
          </h3>
          <p className="text-gray-300">
            <strong>👋 Hi, {visitorName ? `${visitorName}!` : 'Hi!'}</strong> dapatkan insight bisnis yang sesuai dengan produkmu secara lokal dan digital. <span className="font-bold">Download reportnya</span> sekarang!
          </p>
        </div>
        
        {!showForm ? (
          <div className="flex justify-center">
            <Button 
              id="business-analysis-button"
              variant="outline" 
              className="border-yellow-400/30 hover:bg-yellow-400/10 text-white px-8 py-6 text-lg group transition-all duration-300"
              onClick={handleButtonClick}
            >
              <Sparkles 
                className={`mr-2 h-5 w-5 ${isBlinking ? 'text-yellow-400 animate-pulse' : ''}`}
              /> 
              Analisa Bisnis dengan AI
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        ) : isMobile && (
          <div className="mt-6 bg-slate-800 rounded-lg border border-yellow-400/30">
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="font-bold text-white">Analisa Bisnis Anda</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleFormClose} 
                className="text-white hover:bg-slate-700"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="p-4">
              {formContent}
            </div>
          </div>
        )}
        
        {!isMobile && (
          <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
            <DrawerContent className="h-[90vh] max-h-[90vh]">
              <ScrollArea className="h-full w-full px-4 py-6">
                {formContent}
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </section>
  );
};

export default BusinessAnalysisBlock;
