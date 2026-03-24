
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CatalogProvider, useCatalog } from '@/components/catalog/CatalogContext';
import CatalogForm from '@/components/catalog/CatalogForm';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CatalogEditContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items } = useCatalog();
  
  const item = items.find(item => item.id === id);
  
  const handleUpdateItem = (data: any) => {
    // In a real application, this would be an API call
    // For now, we're just storing in localStorage
    const updatedItems = items.map(item => 
      item.id === id ? { ...data, id } : item
    );
    
    localStorage.setItem('catalogItems', JSON.stringify(updatedItems));
    window.location.href = '/catalog'; // Hard reload to refresh data
  };
  
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Layanan tidak ditemukan</h1>
        <p className="text-muted-foreground mb-6">Layanan yang Anda cari tidak tersedia</p>
        <Button onClick={() => navigate('/catalog')}>Kembali ke Katalog</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate('/catalog')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Kembali ke Katalog
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Edit Layanan</h1>
      <CatalogForm initialData={item} onSubmit={handleUpdateItem} />
    </div>
  );
};

const CatalogEdit: React.FC = () => {
  const navigate = useNavigate();
  
  // Check for admin access
  React.useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin' && userRole !== 'master_admin') {
      navigate('/catalog');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <CatalogProvider>
        <div className="flex-1">
          <CatalogEditContent />
        </div>
      </CatalogProvider>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default CatalogEdit;
