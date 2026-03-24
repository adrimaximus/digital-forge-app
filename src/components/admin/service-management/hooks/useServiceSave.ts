
import { useState } from 'react';
import { ServiceFormData } from '@/schemas/serviceFormSchema';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

export const useServiceSave = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const saveService = async (data: ServiceFormData) => {
    setIsProcessing(true);
    
    try {
      const existingServicesStr = localStorage.getItem('catalogItems');
      const existingServices = existingServicesStr ? JSON.parse(existingServicesStr) : [];
      
      // Calculate the total/minimum price based on feature prices
      const featurePrices = data.features.map(feature => feature.price);
      const minPrice = Math.min(...featurePrices);
      
      const newService = {
        id: uuidv4(),
        title: data.title,
        description: data.shortDescription,
        longDescription: data.longDescription,
        price: minPrice, // Set minimum price as the base price
        imageUrl: data.imageUrl,
        category: data.category,
        features: data.features,
      };
      
      localStorage.setItem('catalogItems', JSON.stringify([...existingServices, newService]));
      
      toast({
        title: "Layanan berhasil dibuat",
        description: "Layanan baru telah ditambahkan ke katalog",
      });
      
      // Force reload data by reloading the page
      window.location.reload();
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Gagal menyimpan layanan",
        description: "Terjadi kesalahan saat menyimpan layanan",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return { saveService, isProcessing };
};
