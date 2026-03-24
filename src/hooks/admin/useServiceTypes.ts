
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useServiceTypes = () => {
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadServiceTypes = () => {
      try {
        // Try to load from localStorage
        const storedServices = localStorage.getItem('catalogItems');
        if (storedServices) {
          const parsedServices = JSON.parse(storedServices);
          const uniqueServiceTypes = Array.from(
            new Set(
              Array.isArray(parsedServices) 
                ? parsedServices.flatMap(service => 
                    service.features?.map(feature => feature.serviceType) || []
                  )
                : []
            )
          ).filter(Boolean) as string[];
          
          setServiceTypes(uniqueServiceTypes);
        }
      } catch (error) {
        console.error("Error loading service types:", error);
        toast({
          title: "Error loading service types",
          description: "Failed to load service type data",
          variant: "destructive"
        });
      }
    };
    
    loadServiceTypes();
  }, [toast]);

  return serviceTypes;
};
