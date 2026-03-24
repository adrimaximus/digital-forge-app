
import { analyzeBusinessWithGoogleAI } from '@/utils/ai/services/businessAnalysisService';
import { cleanupIndonesianText } from '@/utils/ai/textCleanup';
import { BusinessFormData } from './types';

export const generateRecommendedServices = (formData: BusinessFormData): string[] => {
  const recommendedServices = [];
  
  if (!formData.hasWebsite) {
    recommendedServices.push("Website berbasis AI");
  } else {
    recommendedServices.push("Website Optimization");
  }
  
  if (formData.challenges?.includes("komunikasi_pelanggan")) {
    recommendedServices.push("OmniChat");
  }
  
  if (formData.challenges?.includes("pengelolaan_data")) {
    recommendedServices.push("Sistem Portal Bisnis");
  }
  
  if (formData.challenges?.includes("visibilitas_online")) {
    recommendedServices.push("SEO & Social Trend Analysis");
  }
  
  if (formData.challenges?.includes("branding")) {
    recommendedServices.push("Brand Development");
  }
  
  if (formData.challenges?.includes("otomatisasi")) {
    recommendedServices.push("Business Automation");
  }
  
  if (!formData.hasSocialMedia) {
    recommendedServices.push("Social Media Management");
  }
  
  // Limit to maximum 3 services
  return recommendedServices.slice(0, 3);
};

export const performAIAnalysis = async (formData: BusinessFormData) => {
  try {
    // Clean up any undefined values that might cause issues with the API
    const cleanFormData = Object.entries(formData).reduce((acc, [key, value]) => {
      // Skip undefined values or replace with appropriate defaults
      if (value === undefined) {
        if (key === 'socialMediaPlatforms' || key === 'challenges') {
          acc[key] = [];
        } else if (key === 'websiteUrl' || key === 'otherChallenge') {
          acc[key] = "";
        } else {
          acc[key] = "";
        }
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as any);
    
    console.log("Sending business data for AI analysis:", cleanFormData);
    
    // Get AI analysis
    const aiResponse = await analyzeBusinessWithGoogleAI(cleanFormData);
    console.log("AI analysis received:", aiResponse.substring(0, 50) + "...");
    
    // Clean up and process the Indonesian text
    return cleanupIndonesianText(aiResponse);
  } catch (error) {
    console.error("Error analyzing business:", error);
    throw new Error("Failed to analyze business data");
  }
};
