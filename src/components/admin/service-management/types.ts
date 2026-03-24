import { CatalogItem, CatalogFeature } from "@/types/catalog";

export interface ServiceFeatureItem {
  id: string;
  serviceId: string;
  serviceTitle: string;
  feature: CatalogFeature;
  category: string;
  serviceType?: string; // Keep this field for backward compatibility
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface ServiceFeatureTableProps {
  features: ServiceFeatureItem[];
  onDeleteFeature: (serviceId: string, featureTitle: string) => void;
  onUpdateFeature: (serviceId: string, updatedFeature: CatalogFeature, originalTitle: string) => void;
}

export interface ServiceManagementHeaderProps {
  canAddServices: boolean;
}

export interface ServiceManagementFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: string[]; 
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}
