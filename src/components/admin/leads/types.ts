import { UserRole } from '@/types/admin';

export interface ContactFormLead {
  id: string;
  fullName: string;
  email: string;
  informationType: string;
  message: string;
  timestamp: string;
  source: 'contact-form';
  affiliateEmail?: string;
  conversionStatus?: 'approach' | 'deal' | 'pending' | 'cancelled';
}

export interface BusinessAnalysisLead {
  id: string;
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
  timestamp: string;
  source: 'business-analysis';
  recommendedServices?: string[];
  aiAnalysisResult?: string;
  affiliateEmail?: string;
  conversionStatus?: 'approach' | 'deal' | 'pending' | 'cancelled';
}

export type Lead = ContactFormLead | BusinessAnalysisLead;
