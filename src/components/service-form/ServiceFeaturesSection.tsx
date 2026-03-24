
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import ServiceFeatureForm from './ServiceFeatureForm';
import { Plus } from 'lucide-react';

interface ServiceFeaturesSectionProps {
  isGeneratingFeature: boolean;
  generatingFeatureIndex: number | null;
  onGenerateFeatureDescription: (index: number) => Promise<void>;
  focusFeature?: string;
}

const ServiceFeaturesSection: React.FC<ServiceFeaturesSectionProps> = ({
  isGeneratingFeature,
  generatingFeatureIndex,
  onGenerateFeatureDescription,
  focusFeature
}) => {
  const { watch, setValue } = useFormContext();
  const features = watch('features') || [];
  
  // Check if the first feature has content
  const firstFeatureHasContent = features[0]?.title && features[0]?.description;
  
  const addFeature = () => {
    setValue('features', [
      ...features,
      { title: '', description: '', price: 0, serviceType: '', category: '' }
    ]);
  };
  
  const removeFeature = (index: number) => {
    setValue('features', features.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-medium">Fitur-fitur dan Harga</h3>
        {firstFeatureHasContent && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" /> Tambah Fitur
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-section ${feature.title === focusFeature ? 'focus-feature' : ''}`}
          >
            <ServiceFeatureForm 
              index={index}
              isGenerating={isGeneratingFeature}
              generatingIndex={generatingFeatureIndex}
              onGenerateDescription={onGenerateFeatureDescription}
              onRemoveFeature={removeFeature}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeaturesSection;
