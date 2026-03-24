
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CatalogProvider, useCatalog } from '@/components/catalog/CatalogContext';
import CatalogForm from '@/components/catalog/CatalogForm';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CatalogAddContent: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useCatalog();
  
  const handleAddItem = (data: any) => {
    // In a real application, this would be an API call
    // For now, we're just storing in localStorage
    const newItem = {
      ...data,
      id: uuidv4()
    };
    
    localStorage.setItem('catalogItems', JSON.stringify([...items, newItem]));
    window.location.href = '/catalog'; // Hard reload to refresh data
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate('/catalog')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Kembali ke Katalog
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Tambah Layanan Baru</h1>
      <CatalogForm onSubmit={handleAddItem} />
    </div>
  );
};

const CatalogAdd: React.FC = () => {
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
          <CatalogAddContent />
        </div>
      </CatalogProvider>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default CatalogAdd;
