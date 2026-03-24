import React, { useEffect, useState } from 'react';
import { CatalogItem, CatalogFeature } from "@/types/catalog";
import { useToast } from "@/hooks/use-toast";
import { ServiceFeatureItem } from "./service-management/types";
import ServiceManagementHeader from "./service-management/ServiceManagementHeader";
import ServiceFeatureTable from "./service-management/ServiceFeatureTable";
import { extractFeaturesFromServices, extractCategories } from "./service-management/utils";
import ServiceManagementFilters from "./service-management/ServiceManagementFilters";

interface ServiceManagementTabProps {
  userRole: string | null;
}

const ServiceManagementTab: React.FC<ServiceManagementTabProps> = ({ userRole }) => {
  const [services, setServices] = useState<CatalogItem[]>([]);
  const [allFeatures, setAllFeatures] = useState<ServiceFeatureItem[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<ServiceFeatureItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const loadServices = () => {
    const storedServices = localStorage.getItem('catalogItems');
    if (storedServices) {
      try {
        const parsedServices = JSON.parse(storedServices);
        setServices(Array.isArray(parsedServices) ? parsedServices : []);
        
        const extractedCategories = extractCategories(parsedServices);
        setCategories(extractedCategories.map(category => String(category)));
        
        const extractedFeatures = extractFeaturesFromServices(parsedServices);
        setAllFeatures(extractedFeatures);
        setFilteredFeatures(extractedFeatures);
      } catch (error) {
        console.error("Error parsing services:", error);
        toast({
          title: "Error loading services",
          description: "Failed to load service data",
          variant: "destructive"
        });
        setServices([]);
        setAllFeatures([]);
        setFilteredFeatures([]);
        setCategories([]);
      }
    }
  };

  useEffect(() => {
    loadServices();
  }, [toast]);

  useEffect(() => {
    let results = [...allFeatures];
    
    if (selectedCategory !== "all") {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item => 
        item.serviceTitle.toLowerCase().includes(term) || 
        item.feature.title.toLowerCase().includes(term) ||
        (item.feature.description && item.feature.description.toLowerCase().includes(term))
      );
    }
    
    setFilteredFeatures(results);
  }, [searchTerm, selectedCategory, allFeatures]);

  const handleDeleteFeature = (serviceId: string, featureTitle: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus fitur layanan ini?")) {
      const updatedServices = services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            features: service.features.filter(f => f.title !== featureTitle)
          };
        }
        return service;
      });
      
      localStorage.setItem('catalogItems', JSON.stringify(updatedServices));
      setServices(updatedServices);
      
      const updatedFeatures = allFeatures.filter(
        item => !(item.serviceId === serviceId && item.feature.title === featureTitle)
      );
      setAllFeatures(updatedFeatures);
      
      toast({
        title: "Fitur berhasil dihapus",
        description: "Fitur layanan telah dihapus dari katalog",
      });
    }
  };

  const handleUpdateFeature = (serviceId: string, updatedFeature: CatalogFeature, originalTitle: string) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          features: service.features.map(f => 
            f.title === originalTitle ? updatedFeature : f
          )
        };
      }
      return service;
    });
    
    localStorage.setItem('catalogItems', JSON.stringify(updatedServices));
    setServices(updatedServices);
    
    const extractedFeatures = extractFeaturesFromServices(updatedServices);
    setAllFeatures(extractedFeatures);
    setFilteredFeatures(extractedFeatures);
    
    toast({
      title: "Fitur berhasil diperbarui",
      description: "Fitur layanan telah diperbarui",
    });
  };

  const canAddServices = () => {
    return userRole === "master admin" || userRole === "admin";
  };

  return (
    <div className="space-y-6">
      <ServiceManagementHeader canAddServices={canAddServices()} />
      
      <ServiceManagementFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ServiceFeatureTable 
        features={filteredFeatures || []}
        onDeleteFeature={handleDeleteFeature}
        onUpdateFeature={handleUpdateFeature}
      />
    </div>
  );
};

export default ServiceManagementTab;
