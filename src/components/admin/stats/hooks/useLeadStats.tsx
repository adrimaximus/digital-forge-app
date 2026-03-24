
import { useState, useEffect } from 'react';
import { getLeadStats } from '@/utils/leadTracker';

interface LeadStats {
  totalContactLeads: number;
  weeklyContactLeads: number;
  monthlyContactLeads: number;
  totalBusinessLeads: number;
  weeklyBusinessLeads: number;
  monthlyBusinessLeads: number;
}

export const useLeadStats = () => {
  const [leadStats, setLeadStats] = useState<LeadStats>({
    totalContactLeads: 0,
    weeklyContactLeads: 0,
    monthlyContactLeads: 0,
    totalBusinessLeads: 0,
    weeklyBusinessLeads: 0,
    monthlyBusinessLeads: 0
  });
  
  // Function to refresh lead statistics
  const refreshLeadStats = () => {
    console.log("Refreshing lead statistics");
    const stats = getLeadStats();
    setLeadStats(stats);
  };

  useEffect(() => {
    // Get lead statistics initially
    refreshLeadStats();
    
    // Set up event listener for lead updates
    const handleLeadUpdate = () => {
      console.log("Lead update event received");
      refreshLeadStats();
    };
    
    // Listen for the leadsUpdated event
    window.addEventListener('leadsUpdated', handleLeadUpdate);
    
    // Listen for storage events (when localStorage changes)
    window.addEventListener('storage', (e) => {
      if (e.key === 'contactFormLeads' || e.key === 'businessAnalysisLeads') {
        console.log("Storage event detected for leads:", e.key);
        refreshLeadStats();
      }
    });
    
    // Listen for the custom statsUpdated event
    window.addEventListener('statsUpdated', handleLeadUpdate);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('leadsUpdated', handleLeadUpdate);
      window.removeEventListener('storage', handleLeadUpdate);
      window.removeEventListener('statsUpdated', handleLeadUpdate);
    };
  }, []);

  return leadStats;
};
