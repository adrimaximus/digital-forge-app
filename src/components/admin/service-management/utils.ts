
import { CatalogItem } from "@/types/catalog";
import { ServiceFeatureItem } from "./types";

export const extractFeaturesFromServices = (services: CatalogItem[]): ServiceFeatureItem[] => {
  // Ensure services is an array
  if (!Array.isArray(services)) {
    return [];
  }
  
  return services.flatMap((service: CatalogItem) => 
    // Ensure features is an array before mapping
    Array.isArray(service.features) 
      ? service.features.map(feature => ({
          id: `${service.id}-${feature.title}`,
          serviceId: service.id,
          serviceTitle: service.title,
          feature,
          category: service.category
        }))
      : []
  );
};

export const extractCategories = (services: CatalogItem[]): string[] => {
  // Ensure services is an array
  if (!Array.isArray(services)) {
    return [];
  }
  
  // Extract unique categories and ensure they're strings
  const uniqueCategories = Array.from(
    new Set(
      services
        .map((service: CatalogItem) => service.category)
        .filter(Boolean) // Remove undefined, null and empty strings
    )
  ) as string[];
  
  return uniqueCategories;
};
