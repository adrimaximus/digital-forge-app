import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormData } from '@/schemas/serviceFormSchema';
import { useToast } from '@/hooks/use-toast';

export const useServiceFormDrawer = (onSave: (data: ServiceFormData) => void, onClose: () => void) => {
  const { toast } = useToast();
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingFeatureDesc, setIsGeneratingFeatureDesc] = useState(false);
  const [generatingFeatureIndex, setGeneratingFeatureIndex] = useState<number | null>(null);
  
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      longDescription: '',
      imageUrl: 'https://source.unsplash.com/random/800x600/?business',
      category: '',
      features: [{ title: '', description: '', price: 0 }]
    }
  });
  
  // Use fieldArray to manage dynamic form fields with proper initialization
  const fieldArray = useFieldArray({
    control: form.control,
    name: "features"
  });
  
  const handleSubmit = (data: ServiceFormData) => {
    onSave(data);
    form.reset();
    onClose();
  };
  
  const generateDescription = async () => {
    const title = form.getValues('title');
    const category = form.getValues('category');
    
    if (!title) {
      toast({
        title: "Judul diperlukan",
        description: "Harap isi judul layanan terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingDesc(true);
    
    try {
      const prompt = `Buatkan deskripsi singkat (maksimal 120 karakter) dan deskripsi panjang (200-300 kata) untuk layanan digital bernama "${title}" dalam kategori "${category || 'umum'}". Format respons:

[DESKRIPSI_SINGKAT]
deskripsi singkat di sini

[DESKRIPSI_PANJANG]
deskripsi panjang di sini`;

      // Use the callOpenAI function from your utils
      const { callOpenAI } = await import('@/utils/ai');
      const response = await callOpenAI(prompt, 0.7);
      
      const shortDescMatch = response.match(/\[DESKRIPSI_SINGKAT\]([\s\S]*?)\n\n/);
      const longDescMatch = response.match(/\[DESKRIPSI_PANJANG\]([\s\S]*)/);
      
      const shortDesc = shortDescMatch ? shortDescMatch[1].trim() : "";
      const longDesc = longDescMatch ? longDescMatch[1].trim() : "";
      
      if (shortDesc) {
        form.setValue('shortDescription', shortDesc);
      }
      
      if (longDesc) {
        form.setValue('longDescription', longDesc);
      }
      
      toast({
        title: "Deskripsi berhasil dibuat",
        description: "Deskripsi produk telah dihasilkan oleh AI",
      });
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Gagal membuat deskripsi",
        description: "Terjadi kesalahan saat menghasilkan deskripsi",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingDesc(false);
    }
  };
  
  const generateFeatureDescription = async (index: number) => {
    const title = form.getValues('title');
    const featureTitle = form.getValues(`features.${index}.title`);
    
    if (!featureTitle) {
      toast({
        title: "Judul fitur diperlukan",
        description: "Harap isi judul fitur terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingFeatureDesc(true);
    setGeneratingFeatureIndex(index);
    
    try {
      const prompt = `Buatkan deskripsi singkat (50-80 kata) untuk fitur "${featureTitle}" dari layanan "${title || 'digital'}". Jelaskan manfaat dan nilai fitur tersebut bagi pengguna dengan bahasa yang persuasif dan informatif.`;

      // Use the callOpenAI function from your utils
      const { callOpenAI } = await import('@/utils/ai');
      const response = await callOpenAI(prompt, 0.7);
      
      form.setValue(`features.${index}.description`, response.trim());
      
      toast({
        title: "Deskripsi fitur berhasil dibuat",
        description: "Deskripsi fitur telah dihasilkan oleh AI",
      });
    } catch (error) {
      console.error("Error generating feature description:", error);
      toast({
        title: "Gagal membuat deskripsi fitur",
        description: "Terjadi kesalahan saat menghasilkan deskripsi fitur",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingFeatureDesc(false);
      setGeneratingFeatureIndex(null);
    }
  };
  
  return {
    form,
    fields: fieldArray.fields,
    append: fieldArray.append,
    remove: fieldArray.remove,
    isGeneratingDesc,
    isGeneratingFeatureDesc,
    generatingFeatureIndex,
    handleSubmit,
    generateDescription,
    generateFeatureDescription
  };
};
