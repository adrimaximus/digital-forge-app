
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CatalogItemNotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold mb-4">Layanan tidak ditemukan</h1>
      <p className="text-muted-foreground mb-6">Layanan yang Anda cari tidak tersedia</p>
      <Link to="/catalog">
        <Button>Kembali ke Katalog</Button>
      </Link>
    </div>
  );
};

export default CatalogItemNotFound;
