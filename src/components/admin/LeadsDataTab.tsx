import React, { useState } from 'react';
import { UserRole } from '@/types/admin';
import LeadSearchFilter from './leads/LeadSearchFilter';
import LeadTable from './leads/LeadTable';
import ExportButton from './leads/ExportButton';
import LeadDetailsDialog from './leads/LeadDetailsDialog';
import { useLeadData } from './leads/useLeadData';
import { Lead } from './leads/types';
import { toast } from '@/hooks/use-toast';

interface LeadsDataTabProps {
  userRole: UserRole | null;
}

const LeadsDataTab: React.FC<LeadsDataTabProps> = ({ userRole }) => {
  const {
    leads,
    searchTerm,
    leadSource,
    setSearchTerm,
    setLeadSource,
    deleteLead,
    updateLead
  } = useLeadData();
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const canDeleteLeads = () => {
    return userRole === "master admin" || userRole === "admin";
  };
  
  const canEditLeads = () => {
    return userRole === "master admin" || userRole === "admin";
  };

  const handleOpenDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  const handleDeleteLead = (id: string) => {
    if (!canDeleteLeads()) return;
    deleteLead(id);
  };
  
  const handleUpdateLead = (id: string, updates: Partial<Lead>) => {
    if (!canEditLeads()) return;
    updateLead(id, updates);
    toast({
      title: "Data berhasil diperbarui",
      description: "Perubahan telah disimpan",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Data Leads</h2>
        <p className="text-slate-300 mb-6">
          Kelola dan analisis data leads yang masuk dari form kontak dan analisis bisnis.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
        <LeadSearchFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSourceChange={setLeadSource}
        />
        
        <ExportButton 
          leads={leads} 
          activeLeadSource={leadSource} 
        />
      </div>
      
      <LeadTable 
        leads={leads}
        canDeleteLeads={canDeleteLeads()}
        canEditLeads={canEditLeads()}
        userRole={userRole || undefined}
        onOpenDetails={handleOpenDetails}
        onDeleteLead={handleDeleteLead}
        onUpdateLead={handleUpdateLead}
      />
      
      {selectedLead && (
        <LeadDetailsDialog 
          lead={selectedLead}
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
        />
      )}
    </div>
  );
};

export default LeadsDataTab;
