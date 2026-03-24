
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CatalogHeaderProps {
  title?: string;
  subtitle?: string;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ 
  title = "Temukan solusi terbaik untuk bisnis Anda",
  subtitle = "Layanan yang dapat meningkatkan pendapatan dan pengalaman pelanggan Anda. Butuh sesuatu yang lebih? Hubungi kami."
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8">
      {/* Hero section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          {subtitle}
          <a href="#" className="text-yellow-400 hover:underline ml-1">Hubungi kami</a>
        </p>
      </div>
    </div>
  );
};

export default CatalogHeader;
