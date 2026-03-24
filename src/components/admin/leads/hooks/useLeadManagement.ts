
import { useState } from 'react';
import { Lead } from '../types';

export const useLeadManagement = (
  leads: Lead[], 
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>
) => {
  // Delete a lead
  const deleteLead = (id: string) => {
    const leadToDelete = leads.find(lead => lead.id === id);
    if (!leadToDelete) return;
    
    const newLeads = leads.filter(lead => lead.id !== id);
    setLeads(newLeads);
    
    if (leadToDelete.source === 'contact-form') {
      const contactLeads = leads.filter(l => l.source === 'contact-form' && l.id !== id);
      localStorage.setItem('contactFormLeads', JSON.stringify(contactLeads));
    } else {
      const businessLeads = leads.filter(l => l.source === 'business-analysis' && l.id !== id);
      localStorage.setItem('businessAnalysisLeads', JSON.stringify(businessLeads));
    }
  };
  
  // Update a lead
  const updateLead = (id: string, updates: Partial<Lead>) => {
    const leadToUpdate = leads.find(lead => lead.id === id);
    if (!leadToUpdate) return;
    
    const updatedLead = { ...leadToUpdate, ...updates };
    const newLeads: Lead[] = leads.map(lead => lead.id === id ? updatedLead : lead) as Lead[];
    setLeads(newLeads);
    
    if (leadToUpdate.source === 'contact-form') {
      const contactLeads = newLeads.filter(l => l.source === 'contact-form');
      localStorage.setItem('contactFormLeads', JSON.stringify(contactLeads));
    } else {
      const businessLeads = newLeads.filter(l => l.source === 'business-analysis');
      localStorage.setItem('businessAnalysisLeads', JSON.stringify(businessLeads));
    }
  };
  
  return {
    deleteLead,
    updateLead
  };
};
