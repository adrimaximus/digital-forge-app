
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const ServicePriceImageForm: React.FC = () => {
  const { control } = useFormContext();
  
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium mb-1">Gambar Layanan</h3>
      
      <FormField
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">URL Gambar</FormLabel>
            <FormControl>
              <Input {...field} className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ServicePriceImageForm;
