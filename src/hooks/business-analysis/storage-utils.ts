
import { BusinessFormData } from './types';

export const storeLeadData = (
  formData: BusinessFormData, 
  recommendedServices: string[], 
  aiAnalysisResult: string
): void => {
  // Store the lead data in localStorage
  const existingLeads = JSON.parse(localStorage.getItem('businessAnalysisLeads') || '[]');
  
  const newLead = {
    id: Date.now().toString(),
    ...formData,
    timestamp: new Date().toISOString(),
    source: 'business-analysis',
    recommendedServices,
    aiAnalysisResult
  };
  
  existingLeads.push(newLead);
  localStorage.setItem('businessAnalysisLeads', JSON.stringify(existingLeads));
};
