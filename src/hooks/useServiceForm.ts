
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormData } from '@/schemas/serviceFormSchema';
import { useServiceAIUtils } from '@/utils/serviceAIUtils';

export const useServiceForm = (initialData?: ServiceFormData) => {
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isGeneratingFeature, setIsGeneratingFeature] = useState(false);
  const [generatingFeatureIndex, setGeneratingFeatureIndex] = useState<number | null>(null);
  
  const { generateProductDescription, generateFeatureDescription } = useServiceAIUtils();
  
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
      title: '',
      shortDescription: '',
      longDescription: '',
      imageUrl: 'https://source.unsplash.com/random/800x600/?business',
      category: '',
      features: [
        { title: '', description: '', price: 0 }
      ],
    },
  });
  
  const handleGenerateProductDescription = async () => {
    const title = form.getValues('title');
    const category = form.getValues('category');
    
    await generateProductDescription(
      title, 
      category, 
      setIsGeneratingDescription,
      (field, value) => form.setValue(field as any, value)
    );
  };
  
  const handleGenerateFeatureDescription = async (index: number) => {
    const title = form.getValues('title');
    const shortDescription = form.getValues('shortDescription');
    const featureTitle = form.getValues(`features.${index}.title`);
    
    await generateFeatureDescription(
      index,
      title,
      shortDescription,
      featureTitle,
      setIsGeneratingFeature,
      setGeneratingFeatureIndex,
      (index, description) => form.setValue(`features.${index}.description`, description)
    );
  };
  
  return {
    form,
    isGeneratingDescription,
    isGeneratingFeature,
    generatingFeatureIndex,
    generateProductDescription: handleGenerateProductDescription,
    generateFeatureDescription: handleGenerateFeatureDescription,
  };
};

// Export ServiceFormData type from the schema to fix the circular dependency
export type { ServiceFormData } from '@/schemas/serviceFormSchema';
