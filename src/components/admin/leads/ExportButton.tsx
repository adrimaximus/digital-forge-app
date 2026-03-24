
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
import { Lead } from './types';

interface ExportButtonProps {
  leads: Lead[];
  activeLeadSource: 'all' | 'contact-form' | 'business-analysis';
}

const ExportButton: React.FC<ExportButtonProps> = ({ leads, activeLeadSource }) => {
  const exportToCSV = () => {
    let csvContent = "";
    
    if (leads.length === 0) return;
    
    if (activeLeadSource === 'all' || activeLeadSource === 'contact-form') {
      const contactLeads = leads.filter(l => l.source === 'contact-form') as any[];
      
      if (contactLeads.length > 0) {
        csvContent += "# CONTACT FORM LEADS\n";
        csvContent += "ID,Full Name,Email,Information Type,Message,Timestamp\n";
        
        contactLeads.forEach(lead => {
          csvContent += `${lead.id},${lead.fullName},${lead.email},${lead.informationType},${lead.message.replace(/,/g, ';')},${lead.timestamp}\n`;
        });
        
        csvContent += "\n";
      }
    }
    
    if (activeLeadSource === 'all' || activeLeadSource === 'business-analysis') {
      const businessLeads = leads.filter(l => l.source === 'business-analysis') as any[];
      
      if (businessLeads.length > 0) {
        csvContent += "# BUSINESS ANALYSIS LEADS\n";
        csvContent += "ID,Business Name,Product Type,Employees,Location,Contact,Email,Has Social Media,Platforms,Has Website,Website URL,Has Digital Ads,Challenges,Other Challenge,Timestamp\n";
        
        businessLeads.forEach(lead => {
          csvContent += `${lead.id},${lead.businessName},${lead.productType},${lead.numberOfEmployees},${lead.location},${lead.contactNumber},${lead.email},${lead.hasSocialMedia},${(lead.socialMediaPlatforms || []).join(';')},${lead.hasWebsite},${lead.websiteUrl || ''},${lead.hasDigitalAds},${(lead.challenges || []).join(';')},${lead.otherChallenge || ''},${lead.timestamp}\n`;
        });
      }
    }
    
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="outline"
      className="border-green-500/30 text-green-500 hover:bg-green-500/10"
      onClick={exportToCSV}
    >
      <FileSpreadsheet className="mr-2 h-4 w-4" /> Export CSV
    </Button>
  );
};

export default ExportButton;
