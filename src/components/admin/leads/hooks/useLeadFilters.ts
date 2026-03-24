
import { useState, useEffect } from 'react';
import { Lead, ContactFormLead, BusinessAnalysisLead } from '../types';

export const useLeadFilters = (leads: Lead[]) => {
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);
  const [searchTerm, setSearchTerm] = useState('');
  const [leadSource, setLeadSource] = useState<'all' | 'contact-form' | 'business-analysis'>('all');
  
  // Filter leads based on search term and source
  useEffect(() => {
    let filtered = leads;
    
    if (leadSource !== 'all') {
      filtered = filtered.filter(lead => lead.source === leadSource);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(lead => {
        const searchTermLower = searchTerm.toLowerCase();
        
        if (lead.source === 'contact-form') {
          const contactLead = lead as ContactFormLead;
          return (
            contactLead.fullName.toLowerCase().includes(searchTermLower) ||
            contactLead.email.toLowerCase().includes(searchTermLower) ||
            contactLead.informationType.toLowerCase().includes(searchTermLower) ||
            contactLead.message.toLowerCase().includes(searchTermLower)
          );
        } else {
          const businessLead = lead as BusinessAnalysisLead;
          return (
            businessLead.businessName.toLowerCase().includes(searchTermLower) ||
            businessLead.email.toLowerCase().includes(searchTermLower) ||
            businessLead.productType.toLowerCase().includes(searchTermLower) ||
            businessLead.location.toLowerCase().includes(searchTermLower)
          );
        }
      });
    }
    
    setFilteredLeads(filtered);
  }, [searchTerm, leadSource, leads]);
  
  return {
    filteredLeads,
    searchTerm,
    leadSource,
    setSearchTerm,
    setLeadSource
  };
};
