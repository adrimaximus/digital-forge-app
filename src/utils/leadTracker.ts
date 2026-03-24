
import { Lead } from '../components/admin/leads/types';

// Calculate lead statistics from stored leads
export const getLeadStats = () => {
  // Get leads from localStorage
  const contactLeads = JSON.parse(localStorage.getItem('contactFormLeads') || '[]') as Lead[];
  const businessLeads = JSON.parse(localStorage.getItem('businessAnalysisLeads') || '[]') as Lead[];
  
  // Get current date info
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const currentMonth = currentDate.substring(0, 7); // YYYY-MM
  
  // Calculate week start (7 days ago)
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekStartStr = weekStart.toISOString().split('T')[0];
  
  // Filter leads by time period
  const weeklyContactLeads = contactLeads.filter(lead => {
    const leadDate = new Date(lead.timestamp).toISOString().split('T')[0];
    return leadDate >= weekStartStr;
  });
  
  const weeklyBusinessLeads = businessLeads.filter(lead => {
    const leadDate = new Date(lead.timestamp).toISOString().split('T')[0];
    return leadDate >= weekStartStr;
  });
  
  const monthlyContactLeads = contactLeads.filter(lead => {
    const leadMonth = new Date(lead.timestamp).toISOString().split('T')[0].substring(0, 7);
    return leadMonth === currentMonth;
  });
  
  const monthlyBusinessLeads = businessLeads.filter(lead => {
    const leadMonth = new Date(lead.timestamp).toISOString().split('T')[0].substring(0, 7);
    return leadMonth === currentMonth;
  });
  
  return {
    totalContactLeads: contactLeads.length,
    weeklyContactLeads: weeklyContactLeads.length,
    monthlyContactLeads: monthlyContactLeads.length,
    totalBusinessLeads: businessLeads.length,
    weeklyBusinessLeads: weeklyBusinessLeads.length,
    monthlyBusinessLeads: monthlyBusinessLeads.length
  };
};

// Add a function to update statistics when a new lead is submitted
export const updateLeadStats = (source: 'contact-form' | 'business-analysis') => {
  console.log(`Lead stats updated for: ${source}`);
  
  // Dispatch a custom event to notify components
  const event = new CustomEvent('leadsUpdated', { detail: { source } });
  window.dispatchEvent(event);
  
  // Dispatch a storage event for cross-tab updates
  try {
    // Get the current leads from storage
    const key = source === 'contact-form' ? 'contactFormLeads' : 'businessAnalysisLeads';
    const currentValue = localStorage.getItem(key);
    
    if (currentValue) {
      // Force localStorage update to trigger storage events
      const tempValue = JSON.parse(currentValue);
      localStorage.setItem(key, JSON.stringify(tempValue));
    }
    
    // Also dispatch a manual update event for components that don't listen to storage
    const statsEvent = new CustomEvent('statsUpdated');
    window.dispatchEvent(statsEvent);
  } catch (error) {
    console.error('Error triggering storage event:', error);
  }
};
