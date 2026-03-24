
/**
 * Common types for the AI module
 */

export interface BusinessData {
  businessName?: string;
  productType?: string;
  numberOfEmployees?: string;
  location?: string;
  contactNumber?: string;
  email?: string;
  hasSocialMedia?: boolean;
  socialMediaPlatforms?: string[];
  hasWebsite?: boolean;
  websiteUrl?: string;
  hasDigitalAds?: boolean;
  challenges?: string[];
  otherChallenge?: string;
  aiAnalysis?: string; // Added the aiAnalysis property
}
