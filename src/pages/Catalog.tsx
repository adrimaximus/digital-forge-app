
import React from 'react';
import Navbar from '@/components/Navbar';
import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogGrid from '@/components/catalog/CatalogGrid';
import CatalogSidebar from '@/components/catalog/CatalogSidebar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { CatalogProvider } from '@/components/catalog/CatalogContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const SolusiPage: React.FC = () => {
  // Check if user is admin
  const isAdmin = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin' || userRole === 'master_admin';
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <CatalogProvider>
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16 md:pt-28">
          <CatalogHeader title="Temukan Solusi Terbaik" subtitle="Layanan yang dapat meningkatkan pendapatan dan pengalaman pelanggan Anda" />
          
          {isAdmin() && (
            <div className="mb-6 flex justify-end">
              <Link to="/service/add">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                  <PlusCircle className="mr-2 h-4 w-4" /> Tambah Solusi Baru
                </Button>
              </Link>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with filters */}
            <div className="w-full lg:w-1/4">
              <CatalogSidebar />
            </div>
            
            {/* Main content with catalog items */}
            <div className="w-full lg:w-3/4">
              <CatalogGrid />
            </div>
          </div>
        </div>
      </CatalogProvider>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default SolusiPage;
