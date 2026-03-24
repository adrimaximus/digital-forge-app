
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AIGenerateButton from './AIGenerateButton';
import { useCategories } from '@/hooks/admin/useCategories';
import { useServiceTypes } from '@/hooks/admin/useServiceTypes';

interface ServiceFeatureFormProps {
  index: number;
  isGenerating: boolean;
  generatingIndex: number | null;
  onGenerateDescription: (index: number) => Promise<void>;
  onRemoveFeature: (index: number) => void;
}

const ServiceFeatureForm: React.FC<ServiceFeatureFormProps> = ({
  index,
  isGenerating,
  generatingIndex,
  onGenerateDescription,
  onRemoveFeature
}) => {
  const { control, watch } = useFormContext();
  const { categories } = useCategories();
  const serviceTypes = useServiceTypes();
  
  const featureTitle = watch(`features.${index}.title`);
  const description = watch(`features.${index}.description`);
  
  // Auto-generate description when feature title changes
  useEffect(() => {
    if (featureTitle && !description) {
      onGenerateDescription(index);
    }
  }, [featureTitle, description, index, onGenerateDescription]);
  
  return (
    <div className="grid gap-4 p-4 border rounded-lg bg-gradient-to-b from-white to-blue-50/50 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`features.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Nama Fitur</FormLabel>
              <FormControl>
                <Input {...field} className="h-9" placeholder="Contoh: Analisis Data Real-time" />
              </FormControl>
              <FormDescription className="text-xs">
                Masukkan nama fitur yang jelas dan spesifik
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name={`features.${index}.serviceType`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Tipe Layanan</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Pilih tipe layanan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                Kategori spesifik dari layanan ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`features.${index}.category`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Kategori</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`features.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Harga (Rp)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  className="h-9" 
                  placeholder="Contoh: 1000000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <FormLabel className="text-sm">Deskripsi Fitur</FormLabel>
          <AIGenerateButton 
            onClick={() => onGenerateDescription(index)}
            isGenerating={isGenerating && generatingIndex === index}
            size="sm"
            className="text-xs"
          />
        </div>
        
        <FormField
          control={control}
          name={`features.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  className="text-sm resize-none h-24 bg-white" 
                  placeholder="Jelaskan manfaat dan nilai fitur ini bagi pengguna (50-80 kata)" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
                Deskripsikan fitur ini dengan jelas, fokus pada manfaat dan nilai bagi pengguna (50-80 kata)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {index > 0 && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onRemoveFeature(index)}
          className="mt-1"
        >
          Hapus Fitur
        </Button>
      )}
    </div>
  );
};

export default ServiceFeatureForm;
