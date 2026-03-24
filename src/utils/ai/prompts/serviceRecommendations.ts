
/**
 * Service recommendation generator
 * Determines recommended services based on business data
 */

import { BusinessData } from '../types';

export const generateRecommendedServices = (businessData: BusinessData): string[] => {
  const recommendedServices = [];
    
  if (!businessData.hasWebsite) {
    recommendedServices.push("Website berbasis AI");
  } else {
    recommendedServices.push("Website Optimization");
  }
  
  if (businessData.challenges?.includes("komunikasi_pelanggan")) {
    recommendedServices.push("OmniChat");
  }
  
  if (businessData.challenges?.includes("pengelolaan_data")) {
    recommendedServices.push("Sistem Portal Bisnis");
  }
  
  if (businessData.challenges?.includes("visibilitas_online")) {
    recommendedServices.push("SEO & Social Trend Analysis");
  }
  
  if (businessData.challenges?.includes("branding")) {
    recommendedServices.push("Brand Development");
  }
  
  if (businessData.challenges?.includes("otomatisasi")) {
    recommendedServices.push("Business Automation");
  }
  
  if (!businessData.hasSocialMedia) {
    recommendedServices.push("Social Media Management");
  }
  
  // No longer recommending the hidden services:
  // - Business Intelligence Tools
  // - Cyber Security Solutions
  // - Cloud Migration Services
  
  // Limit to maximum 3 services
  return recommendedServices.slice(0, 3);
};

export const getServiceRecommendationReason = (service: string): string => {
  switch(service) {
    case "Website berbasis AI":
      return `- Website berbasis AI (karena bisnis belum memiliki website)`;
    case "Website Optimization":
      return `- Website Optimization (untuk meningkatkan performa website yang sudah ada)`;
    case "OmniChat":
      return `- OmniChat (untuk komunikasi multi-platform dengan pelanggan)`;
    case "Sistem Portal Bisnis":
      return `- Sistem Portal Bisnis (untuk pengelolaan data dan operasional terintegrasi)`;
    case "SEO & Social Trend Analysis":
      return `- SEO & Social Trend Analysis (untuk meningkatkan visibilitas bisnis secara online)`;
    case "Brand Development":
      return `- Brand Development (untuk membangun identitas merek yang kuat)`;
    case "Business Automation":
      return `- Business Automation (untuk mengotomatisasi proses bisnis)`;
    case "Social Media Management":
      return `- Social Media Management (karena bisnis belum aktif di media sosial)`;
    default:
      return `- ${service}`;
  }
};
