
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const CatalogFormFeatures: React.FC = () => {
  const form = useFormContext();
  const features = form.watch('features') || [];
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Fitur-fitur</h3>
      
      {features.map((_, index) => (
        <div key={index} className="grid gap-4 mb-6 p-4 border rounded-lg">
          <FormField
            control={form.control}
            name={`features.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Fitur {index + 1}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`features.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Fitur {index + 1}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`features.${index}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Fitur {index + 1} (Rp)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          const features = form.getValues('features') || [];
          form.setValue('features', [
            ...features,
            { title: '', description: '', price: 0 }
          ]);
        }}
      >
        Tambah Fitur
      </Button>
    </div>
  );
};
