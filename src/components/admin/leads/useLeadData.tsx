
import { useState, useEffect } from 'react';
import { Lead } from './types';
import { useMockLeadData } from './hooks/useMockLeadData';
import { useLeadFilters } from './hooks/useLeadFilters';
import { useLeadManagement } from './hooks/useLeadManagement';

export const useLeadData = () => {
  const { leads: mockLeads } = useMockLeadData();
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // Update leads when mock data changes
  useEffect(() => {
    if (mockLeads.length > 0) {
      setLeads(mockLeads);
    }
  }, [mockLeads]);
  
  const {
    filteredLeads,
    searchTerm,
    leadSource,
    setSearchTerm,
    setLeadSource
  } = useLeadFilters(leads);
  
  const { deleteLead, updateLead } = useLeadManagement(leads, setLeads);

  return {
    leads: filteredLeads,
    searchTerm,
    leadSource,
    setSearchTerm,
    setLeadSource,
    deleteLead,
    updateLead
  };
};
