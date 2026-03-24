
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { Lead, ContactFormLead, BusinessAnalysisLead } from './types';
import ContactLeadDetails from '../lead-details/ContactLeadDetails';
import BusinessLeadDetails from '../lead-details/BusinessLeadDetails';
import ContactActionButton from '../lead-details/ContactActionButton';
import DownloadReportButton from '../lead-details/DownloadReportButton';

interface LeadDetailsDialogProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailsDialog: React.FC<LeadDetailsDialogProps> = ({ lead, isOpen, onClose }) => {
  const timestampFormatted = new Date(lead.timestamp).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Check if the lead has AI analysis result for debugging
  const hasAnalysisResult = lead.source === 'business-analysis' && 
    (lead as BusinessAnalysisLead).aiAnalysisResult;
  console.log('Lead type:', lead.source);
  console.log('Has AI analysis result:', hasAnalysisResult);
  
  if (lead.source === 'business-analysis') {
    console.log('AI Analysis content:', (lead as BusinessAnalysisLead).aiAnalysisResult);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-slate-800 text-white">
        <DialogTitle className="text-xl font-bold text-white">
          {lead.source === 'contact-form' ? 'Detail Kontak' : 'Detail Analisis Bisnis'}
        </DialogTitle>
        
        {lead.source === 'contact-form' 
          ? <ContactLeadDetails 
              lead={lead as ContactFormLead} 
              timestampFormatted={timestampFormatted} 
            /> 
          : <BusinessLeadDetails 
              lead={lead as BusinessAnalysisLead} 
              timestampFormatted={timestampFormatted} 
            />
        }
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button 
            variant="outline" 
            className="border-slate-600 hover:bg-slate-700 text-white"
            onClick={onClose}
          >
            <X className="mr-2 h-4 w-4" /> Tutup
          </Button>
          
          <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 mt-2 sm:mt-0">
            {lead.source === 'business-analysis' && (
              <DownloadReportButton lead={lead as BusinessAnalysisLead} />
            )}
            
            <ContactActionButton lead={lead} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsDialog;
