
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ServiceFeatureItem from './ServiceFeatureItem';

interface ServiceFormFeaturesProps {
  fields: Record<"id", string>[];
  onAppend: () => void;
  onRemove: (index: number) => void;
  isGeneratingDesc?: boolean;
  generatingFeatureIndex?: number | null;
  onGenerateFeatureDescription?: (index: number) => void;
}

const ServiceFormFeatures: React.FC<ServiceFormFeaturesProps> = ({ 
  fields, 
  onAppend, 
  onRemove,
  isGeneratingDesc = false,
  generatingFeatureIndex = null,
  onGenerateFeatureDescription
}) => {
  // Ensure fields is always an array, even if undefined
  const safeFields = Array.isArray(fields) ? fields : [];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <FormLabel className="text-xs font-medium">Fitur Layanan</FormLabel>
        <Button
          type="button"
          size="sm"
          variant="outline" 
          className="h-6 text-xs border-purple-300 px-2 hover:bg-purple-50 text-purple-600"
          onClick={onAppend}
        >
          <Plus className="h-3 w-3 mr-1" /> Tambah Fitur
        </Button>
      </div>
      
      {safeFields.map((field, index) => (
        <ServiceFeatureItem 
          key={field.id} 
          index={index} 
          canRemove={index > 0}
          onRemove={() => onRemove(index)}
          isGeneratingDescription={isGeneratingDesc && generatingFeatureIndex === index}
          onGenerateDescription={onGenerateFeatureDescription ? () => onGenerateFeatureDescription(index) : undefined}
        />
      ))}
    </div>
  );
};

export default ServiceFormFeatures;
