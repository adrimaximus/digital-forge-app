
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface ServiceFormDescriptionsProps {
  isGeneratingDesc: boolean;
  onGenerateDescription: () => Promise<void>;
}

const ServiceFormDescriptions: React.FC<ServiceFormDescriptionsProps> = ({ 
  isGeneratingDesc, 
  onGenerateDescription 
}) => {
  const { control } = useFormContext();
  
  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <FormLabel className="text-xs font-medium">Deskripsi Singkat</FormLabel>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-6 text-xs px-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          onClick={onGenerateDescription}
          disabled={isGeneratingDesc}
        >
          {isGeneratingDesc ? (
            <><Loader2 className="h-3 w-3 animate-spin mr-1" /> Generating...</>
          ) : (
            <><Sparkles className="h-3 w-3 mr-1" /> AI Generate</>
          )}
        </Button>
      </div>
      
      <FormField
        control={control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea 
                placeholder="Deskripsi singkat layanan" 
                className="text-sm resize-none h-16 bg-white" 
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="longDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-medium">Deskripsi Lengkap</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Deskripsi lengkap layanan" 
                className="text-sm resize-none h-24 bg-white" 
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  );
};

export default ServiceFormDescriptions;
