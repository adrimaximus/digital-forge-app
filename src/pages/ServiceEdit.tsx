
import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceForm from '@/components/service-form/ServiceForm';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ServiceEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the feature to scroll to from location state
  const scrollToFeature = location.state?.scrollToFeature;
  
  // Check for admin access
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin' && userRole !== 'master_admin') {
      navigate('/catalog');
    }
  }, [navigate]);
  
  // Load service data
  const getServiceData = () => {
    try {
      const catalogItemsStr = localStorage.getItem('catalogItems');
      if (!catalogItemsStr) return null;
      
      const catalogItems = JSON.parse(catalogItemsStr);
      return catalogItems.find((item: any) => item.id === id);
    } catch (error) {
      console.error("Error loading service data:", error);
      return null;
    }
  };
  
  const serviceData = getServiceData();
  
  if (!serviceData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-1">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Layanan tidak ditemukan</h1>
            <p className="text-muted-foreground mb-6">Layanan yang Anda cari tidak tersedia</p>
            <Button onClick={() => navigate('/admin')}>Kembali ke Admin Panel</Button>
          </div>
        </div>
        <Footer />
        <Toaster />
      </div>
    );
  }
  
  // Transform service data to match ServiceFormData structure
  const initialData = {
    title: serviceData.title,
    shortDescription: serviceData.description || "",
    longDescription: serviceData.longDescription || "",
    imageUrl: serviceData.imageUrl || "",
    category: serviceData.category || "",
    features: serviceData.features || [{ title: "", description: "", price: 0 }]
  };
  
  const handleSubmit = (values: any) => {
    try {
      const catalogItemsStr = localStorage.getItem('catalogItems');
      const catalogItems = catalogItemsStr ? JSON.parse(catalogItemsStr) : [];
      
      // Calculate the minimum price from features
      const featurePrices = values.features.map((feature: any) => feature.price);
      const minPrice = Math.min(...featurePrices);
      
      // Find and update the service
      const updatedItems = catalogItems.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            title: values.title,
            description: values.shortDescription,
            longDescription: values.longDescription,
            price: minPrice,
            imageUrl: values.imageUrl,
            category: values.category,
            features: values.features,
          };
        }
        return item;
      });
      
      localStorage.setItem('catalogItems', JSON.stringify(updatedItems));
      
      toast({
        title: "Layanan berhasil diperbarui",
        description: "Perubahan telah disimpan",
      });
      
      navigate('/admin');
    } catch (error) {
      console.error("Error updating service:", error);
      toast({
        title: "Gagal memperbarui layanan",
        description: "Terjadi kesalahan saat menyimpan perubahan",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali ke Admin Panel
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Edit Layanan</h1>
        <ServiceForm 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          focusFeature={scrollToFeature} 
        />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default ServiceEdit;
