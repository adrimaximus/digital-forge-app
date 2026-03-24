
// Business analysis form state types
export interface BusinessFormData {
  businessName: string;
  productType: string;
  numberOfEmployees: string;
  location: string;
  contactNumber: string;
  email: string;
  hasSocialMedia: boolean;
  socialMediaPlatforms?: string[];
  hasWebsite: boolean;
  websiteUrl?: string;
  hasDigitalAds: boolean;
  challenges?: string[];
  otherChallenge?: string;
}

export interface BusinessAnalysisState {
  step: number;
  formData: BusinessFormData;
  recommendedServices: string[];
  aiAnalysisResult: string;
  isAnalyzing: boolean;
}
