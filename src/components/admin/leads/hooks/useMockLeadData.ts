
import { useState, useEffect } from 'react';
import { Lead, ContactFormLead, BusinessAnalysisLead } from '../types';

export const useMockLeadData = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  useEffect(() => {
    // Load leads from localStorage
    const loadLeads = () => {
      try {
        console.log("Loading leads from localStorage");
        
        // Get contact form leads
        const contactLeads: ContactFormLead[] = JSON.parse(localStorage.getItem('contactFormLeads') || '[]');
        
        // Get business analysis leads
        const businessLeads: BusinessAnalysisLead[] = JSON.parse(localStorage.getItem('businessAnalysisLeads') || '[]');
        
        console.log(`Loaded ${contactLeads.length} contact leads and ${businessLeads.length} business leads`);
        
        // Combine leads and sort by timestamp (newest first)
        const allLeads = [...contactLeads, ...businessLeads].sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        setLeads(allLeads);
      } catch (error) {
        console.error('Error loading leads from localStorage:', error);
        setLeads([]);
      }
    };
    
    // Load leads initially
    loadLeads();
    
    // Set up event listener for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'contactFormLeads' || event.key === 'businessAnalysisLeads') {
        console.log(`Storage changed for key: ${event.key}`);
        loadLeads();
      }
    };
    
    // Listen for custom events too
    const handleLeadsUpdated = () => {
      console.log("leadsUpdated event received in useMockLeadData");
      loadLeads();
    };
    
    const handleStatsUpdated = () => {
      console.log("statsUpdated event received in useMockLeadData");
      loadLeads();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('leadsUpdated', handleLeadsUpdated);
    window.addEventListener('statsUpdated', handleStatsUpdated);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('leadsUpdated', handleLeadsUpdated);
      window.removeEventListener('statsUpdated', handleStatsUpdated);
    };
  }, []);
  
  return { leads };
};
