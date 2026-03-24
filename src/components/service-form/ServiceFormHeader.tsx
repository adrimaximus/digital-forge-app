
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ServiceFormHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex items-center mb-6 mt-36 md:mt-40">
        <Button variant="outline" size="sm" onClick={() => navigate('/catalog')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Kembali ke Katalog
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Tambah Layanan Baru</h1>
    </>
  );
};

export default ServiceFormHeader;
