
import React from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Mail, MessageSquare } from 'lucide-react';
import { ContactFormLead } from '../leads/types';

interface ContactLeadDetailsProps {
  lead: ContactFormLead;
  timestampFormatted: string;
}

const ContactLeadDetails: React.FC<ContactLeadDetailsProps> = ({ lead, timestampFormatted }) => {
  const formatInformationType = (type: string) => {
    const mapping: Record<string, string> = {
      'harga-layanan': 'Harga Layanan',
      'konsultasi': 'Konsultasi',
      'brief-project': 'Brief project',
      'feedback': 'Feedback'
    };
    
    return mapping[type] || type;
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-blue-400" />
          Detail Lead dari Form Kontak
        </DialogTitle>
        <DialogDescription>
          Dikirimkan pada {timestampFormatted}
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-4">
        <dl className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-slate-400 font-medium">Nama Lengkap:</dt>
            <dd className="text-white col-span-2">{lead.fullName}</dd>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-slate-400 font-medium">Email:</dt>
            <dd className="text-white col-span-2">
              <a href={`mailto:${lead.email}`} className="text-blue-400 hover:underline flex items-center">
                <Mail className="h-4 w-4 mr-1" /> {lead.email}
              </a>
            </dd>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-slate-400 font-medium">Kebutuhan Informasi:</dt>
            <dd className="text-white col-span-2">
              {formatInformationType(lead.informationType)}
            </dd>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-slate-400 font-medium">Pesan:</dt>
            <dd className="text-white col-span-2 whitespace-pre-line">
              {lead.message || "(Tidak ada pesan)"}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default ContactLeadDetails;
