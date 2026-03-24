
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import AIGenerateButton from './AIGenerateButton';

interface ServiceDescriptionFormProps {
  isGeneratingDescription: boolean;
  onGenerateDescription: () => Promise<void>;
}

const ServiceDescriptionForm: React.FC<ServiceDescriptionFormProps> = ({ 
  isGeneratingDescription, 
  onGenerateDescription 
}) => {
  const { control } = useFormContext();
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-medium">Deskripsi Layanan</h3>
        <AIGenerateButton 
          onClick={onGenerateDescription}
          isGenerating={isGeneratingDescription}
        />
      </div>
      
      <FormField
        control={control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Deskripsi Singkat</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Masukkan deskripsi singkat" 
                className="resize-none h-20"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="longDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Deskripsi Lengkap</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Masukkan deskripsi lengkap" 
                className="min-h-[100px] resize-none"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ServiceDescriptionForm;
