
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import ServiceBasicInfoForm from './ServiceBasicInfoForm';
import ServiceDescriptionForm from './ServiceDescriptionForm';
import ServicePriceImageForm from './ServicePriceImageForm';
import ServiceFeaturesSection from './ServiceFeaturesSection';
import ServiceFormActions from './ServiceFormActions';
import { useServiceForm } from '@/hooks/useServiceForm';
import { ServiceFormData } from '@/schemas/serviceFormSchema';

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  initialData?: ServiceFormData;
  focusFeature?: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, initialData, focusFeature }) => {
  const {
    form,
    isGeneratingDescription,
    isGeneratingFeature,
    generatingFeatureIndex,
    generateProductDescription,
    generateFeatureDescription,
  } = useServiceForm(initialData);

  // Scroll to the feature section when focusFeature is provided
  useEffect(() => {
    if (focusFeature && initialData?.features) {
      // Find the index of the feature to focus
      const featureIndex = initialData.features.findIndex(
        feature => feature.title === focusFeature
      );
      
      if (featureIndex >= 0) {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          const featureSections = document.querySelectorAll('.feature-section');
          if (featureSections && featureSections[featureIndex]) {
            featureSections[featureIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Optional: Add a highlight effect
            const element = featureSections[featureIndex] as HTMLElement;
            if (element) {
              element.style.transition = 'background-color 0.5s ease';
              element.style.backgroundColor = 'rgba(147, 51, 234, 0.1)'; // Purple highlight
              setTimeout(() => {
                element.style.backgroundColor = 'transparent';
              }, 2000);
            }
          }
        }, 500);
      }
    }
  }, [focusFeature, initialData?.features]);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ServiceBasicInfoForm />
                <ServicePriceImageForm />
              </div>
              
              <ServiceDescriptionForm 
                isGeneratingDescription={isGeneratingDescription}
                onGenerateDescription={generateProductDescription}
              />
              
              <ServiceFeaturesSection 
                isGeneratingFeature={isGeneratingFeature}
                generatingFeatureIndex={generatingFeatureIndex}
                onGenerateFeatureDescription={generateFeatureDescription}
                focusFeature={focusFeature}
              />
              
              <ServiceFormActions />
            </div>
          </Card>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ServiceForm;
