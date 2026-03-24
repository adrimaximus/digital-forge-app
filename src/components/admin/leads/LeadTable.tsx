
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lead } from './types';
import { UserRole } from '@/types/admin';
import LeadTableRow from './components/LeadTableRow';

interface LeadTableProps {
  leads: Lead[];
  canDeleteLeads: boolean;
  canEditLeads: boolean;
  userRole: UserRole | undefined;
  onOpenDetails: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  onUpdateLead: (id: string, updates: Partial<Lead>) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  canDeleteLeads,
  canEditLeads,
  userRole,
  onOpenDetails,
  onDeleteLead,
  onUpdateLead
}) => {
  const onUpdateAffiliate = (id: string, email: string) => {
    onUpdateLead(id, { affiliateEmail: email });
  };
  
  const onUpdateConversion = (id: string, status: 'approach' | 'deal' | 'pending' | 'cancelled') => {
    onUpdateLead(id, { conversionStatus: status });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Sumber</TableHead>
            <TableHead className="hidden md:table-cell">Tanggal</TableHead>
            <TableHead>Affiliate</TableHead>
            <TableHead>Konversi</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Tidak ada data lead.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <LeadTableRow
                key={lead.id}
                lead={lead}
                canEdit={canEditLeads}
                canDelete={canDeleteLeads}
                userRole={userRole}
                onView={onOpenDetails}
                onDelete={onDeleteLead}
                onUpdateAffiliate={onUpdateAffiliate}
                onUpdateConversion={onUpdateConversion}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadTable;
