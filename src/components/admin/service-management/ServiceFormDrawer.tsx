
import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Form } from '@/components/ui/form';
import { ServiceFormData } from '@/schemas/serviceFormSchema';
import { FormProvider } from 'react-hook-form';
import { useServiceFormDrawer } from './hooks/useServiceFormDrawer';
import ServiceFormBasicInfo from './components/ServiceFormBasicInfo';
import ServiceFormImageUrl from './components/ServiceFormImageUrl';
import ServiceFormDescriptions from './components/ServiceFormDescriptions';
import ServiceFormFeatures from './components/ServiceFormFeatures';
import { useToast } from '@/hooks/use-toast';

interface ServiceFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServiceFormData) => void;
}

const ServiceFormDrawer: React.FC<ServiceFormDrawerProps> = ({ isOpen, onClose, onSave }) => {
  const { toast } = useToast();
  
  const {
    form,
    fields,
    append,
    remove,
    isGeneratingDesc,
    isGeneratingFeatureDesc,
    generatingFeatureIndex,
    handleSubmit,
    generateDescription,
    generateFeatureDescription
  } = useServiceFormDrawer(onSave, onClose);
  
  // Handle form submission with error handling
  const onSubmitWithValidation = async (data: ServiceFormData) => {
    try {
      handleSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Kesalahan",
        description: "Terjadi kesalahan saat menyimpan layanan",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh] overflow-y-auto">
        <DrawerHeader className="px-4 py-2 border-b">
          <DrawerTitle className="text-lg font-medium">Tambah Layanan Baru</DrawerTitle>
        </DrawerHeader>
        
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitWithValidation)} className="p-4 space-y-4">
              <ServiceFormBasicInfo />
              <ServiceFormImageUrl />
              <ServiceFormDescriptions 
                isGeneratingDesc={isGeneratingDesc} 
                onGenerateDescription={generateDescription} 
              />
              <ServiceFormFeatures 
                fields={fields || []} 
                onAppend={() => append({ title: '', description: '', price: 0 })} 
                onRemove={(index) => remove(index)}
                isGeneratingDesc={isGeneratingFeatureDesc}
                generatingFeatureIndex={generatingFeatureIndex}
                onGenerateFeatureDescription={generateFeatureDescription}
              />
            
              <DrawerFooter className="px-0 pt-2 pb-0">
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={onClose}
                    className="h-8"
                  >
                    Batal
                  </Button>
                  <Button 
                    type="submit" 
                    size="sm"
                    className="h-8 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Simpan Layanan
                  </Button>
                </div>
              </DrawerFooter>
            </form>
          </Form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceFormDrawer;
