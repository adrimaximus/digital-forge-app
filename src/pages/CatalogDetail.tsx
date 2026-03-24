
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CatalogProvider } from '@/components/catalog/CatalogContext';
import { Toaster } from '@/components/ui/toaster';
import CatalogDetailContent from '@/components/catalog/detail/CatalogDetailContent';

const CatalogDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <CatalogProvider>
        <div className="flex-1">
          <CatalogDetailContent />
        </div>
      </CatalogProvider>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default CatalogDetail;
