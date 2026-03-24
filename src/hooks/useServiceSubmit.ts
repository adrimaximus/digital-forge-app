
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { ServiceFormData } from '@/schemas/serviceFormSchema';

export const useServiceSubmit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (values: ServiceFormData) => {
    try {
      const existingServicesStr = localStorage.getItem('catalogItems');
      const existingServices = existingServicesStr ? JSON.parse(existingServicesStr) : [];
      
      // Calculate the total/minimum price based on feature prices
      const featurePrices = values.features.map(feature => feature.price);
      const minPrice = Math.min(...featurePrices);
      
      const newService = {
        id: uuidv4(),
        title: values.title,
        description: values.shortDescription,
        longDescription: values.longDescription,
        price: minPrice, // Set minimum price as the base price
        imageUrl: values.imageUrl,
        category: values.category,
        features: values.features,
      };
      
      localStorage.setItem('catalogItems', JSON.stringify([...existingServices, newService]));
      
      toast({
        title: "Layanan berhasil dibuat",
        description: "Layanan baru telah ditambahkan ke katalog",
      });
      
      navigate('/catalog');
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Gagal menyimpan layanan",
        description: "Terjadi kesalahan saat menyimpan layanan",
        variant: "destructive",
      });
    }
  };

  return { handleSubmit };
};
