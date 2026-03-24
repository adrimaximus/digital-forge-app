
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Lead } from '../types';
import LeadTypeBadge from './LeadTypeBadge';
import LeadActionButtons from './LeadActionButtons';
import AffiliateEditor from './AffiliateEditor';
import ConversionStatusSelector from './ConversionStatusSelector';
import ConversionStatusBadge from './ConversionStatusBadge';

interface LeadTableRowProps {
  lead: Lead;
  canEdit: boolean;
  canDelete: boolean;
  userRole?: "master admin" | "admin" | "affiliate";
  onView: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onUpdateAffiliate: (id: string, email: string) => void;
  onUpdateConversion: (id: string, status: 'approach' | 'deal' | 'pending' | 'cancelled') => void;
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({
  lead,
  canEdit,
  canDelete,
  userRole,
  onView,
  onDelete,
  onUpdateAffiliate,
  onUpdateConversion
}) => {
  const displayName = lead.source === 'contact-form' 
    ? (lead as any).fullName
    : (lead as any).businessName;

  // Function to mask email for affiliates
  const maskEmail = (email?: string): string => {
    if (!email) return '-';
    if (userRole === 'affiliate') {
      // Show only first 5 chars + "..."
      return email.substring(0, 5) + '...';
    }
    return email;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {displayName}
      </TableCell>
      <TableCell>{lead.email}</TableCell>
      <TableCell>
        <LeadTypeBadge type={lead.source} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(lead.timestamp).toLocaleDateString('id-ID')}
      </TableCell>
      
      {/* Show affiliate column to all roles but only editable for admin/master admin */}
      <TableCell>
        {canEdit ? (
          <AffiliateEditor 
            leadId={lead.id} 
            affiliateEmail={lead.affiliateEmail}
            onSave={onUpdateAffiliate} 
          />
        ) : (
          <span className="text-sm">
            {maskEmail(lead.affiliateEmail)}
          </span>
        )}
      </TableCell>
      
      {/* Show conversion status to all roles but only editable for admin/master admin */}
      <TableCell>
        {canEdit ? (
          <ConversionStatusSelector 
            status={lead.conversionStatus}
            onChange={(status) => onUpdateConversion(lead.id, status)} 
          />
        ) : (
          <ConversionStatusBadge status={lead.conversionStatus} />
        )}
      </TableCell>
      
      <TableCell className="text-right">
        <LeadActionButtons
          lead={lead}
          canDelete={canDelete}
          onView={onView}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default LeadTableRow;
