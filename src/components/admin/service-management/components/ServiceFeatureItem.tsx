
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface ServiceFeatureItemProps {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  isGeneratingDescription?: boolean;
  onGenerateDescription?: () => void;
}

const ServiceFeatureItem: React.FC<ServiceFeatureItemProps> = ({ 
  index, 
  canRemove, 
  onRemove,
  isGeneratingDescription = false,
  onGenerateDescription
}) => {
  const { control } = useFormContext();
  
  return (
    <div className="border rounded-md p-3 mb-3 bg-gradient-to-b from-white to-blue-50/50 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-slate-700">Fitur #{index + 1}</span>
        {canRemove && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-2">
        <FormField
          control={control}
          name={`features.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-slate-600">Nama</FormLabel>
              <FormControl>
                <Input className="h-7 text-xs bg-white" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name={`features.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-slate-600">Harga</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  className="h-7 text-xs bg-white" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name={`features.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-center mb-1">
              <FormLabel className="text-xs text-slate-600">Deskripsi</FormLabel>
              {onGenerateDescription && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs px-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                  onClick={onGenerateDescription}
                  disabled={isGeneratingDescription}
                >
                  {isGeneratingDescription ? (
                    <><Loader2 className="h-3 w-3 animate-spin mr-1" /> Generating...</>
                  ) : (
                    <><Sparkles className="h-3 w-3 mr-1" /> AI Generate</>
                  )}
                </Button>
              )}
            </div>
            <FormControl>
              <Textarea 
                className="text-xs resize-none h-16 bg-white" 
                placeholder="Deskripsi fitur ini..." 
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ServiceFeatureItem;
