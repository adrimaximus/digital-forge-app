
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const ServiceFormImageUrl: React.FC = () => {
  const { control } = useFormContext();
  
  return (
    <FormField
      control={control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-medium">URL Gambar</FormLabel>
          <FormControl>
            <Input placeholder="https://example.com/image.jpg" className="h-8 text-sm" {...field} />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default ServiceFormImageUrl;
