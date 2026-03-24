
import React from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Mail, Phone, Globe, MessageSquare } from 'lucide-react';
import { BusinessAnalysisLead } from '../leads/types';

interface BusinessLeadDetailsProps {
  lead: BusinessAnalysisLead;
  timestampFormatted: string;
}

const BusinessLeadDetails: React.FC<BusinessLeadDetailsProps> = ({ lead, timestampFormatted }) => {
  const formatChallenge = (challenge: string) => {
    const mapping: Record<string, string> = {
      'visibilitas_online': 'Visibilitas bisnis secara online',
      'komunikasi_pelanggan': 'Komunikasi dengan pelanggan',
      'pengelolaan_data': 'Pengelolaan data bisnis',
      'otomatisasi': 'Otomatisasi proses bisnis',
      'branding': 'Pengembangan merek dan identitas'
    };
    
    return mapping[challenge] || challenge;
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-amber-400" />
          Detail Lead dari Analisis Bisnis
        </DialogTitle>
        <DialogDescription>
          Dikirimkan pada {timestampFormatted}
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase text-slate-400 border-b border-slate-700 pb-1 mb-3">
            Informasi Bisnis
          </h3>
          <dl className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Nama Bisnis:</dt>
              <dd className="text-white col-span-2">{lead.businessName}</dd>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Jenis Produk:</dt>
              <dd className="text-white col-span-2">{lead.productType}</dd>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Jumlah Karyawan:</dt>
              <dd className="text-white col-span-2">{lead.numberOfEmployees}</dd>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Lokasi:</dt>
              <dd className="text-white col-span-2">{lead.location}</dd>
            </div>
          </dl>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase text-slate-400 border-b border-slate-700 pb-1 mb-3">
            Informasi Kontak
          </h3>
          <dl className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Email:</dt>
              <dd className="text-white col-span-2">
                <a href={`mailto:${lead.email}`} className="text-blue-400 hover:underline flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> {lead.email}
                </a>
              </dd>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Nomor Telepon:</dt>
              <dd className="text-white col-span-2">
                <a href={`tel:${lead.contactNumber}`} className="text-blue-400 hover:underline flex items-center">
                  <Phone className="h-4 w-4 mr-1" /> {lead.contactNumber}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase text-slate-400 border-b border-slate-700 pb-1 mb-3">
            Kehadiran Digital
          </h3>
          <dl className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Media Sosial:</dt>
              <dd className="text-white col-span-2">
                {lead.hasSocialMedia ? (
                  lead.socialMediaPlatforms && lead.socialMediaPlatforms.length > 0 
                    ? lead.socialMediaPlatforms.join(', ')
                    : 'Ya (platform tidak disebutkan)'
                ) : 'Tidak ada'}
              </dd>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Website:</dt>
              <dd className="text-white col-span-2">
                {lead.hasWebsite ? (
                  lead.websiteUrl ? (
                    <a 
                      href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-blue-400 hover:underline flex items-center"
                    >
                      <Globe className="h-4 w-4 mr-1" /> {lead.websiteUrl}
                    </a>
                  ) : 'Ya (URL tidak disebutkan)'
                ) : 'Tidak ada'}
              </dd>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Iklan Digital:</dt>
              <dd className="text-white col-span-2">
                {lead.hasDigitalAds ? 'Ya' : 'Tidak'}
              </dd>
            </div>
          </dl>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase text-slate-400 border-b border-slate-700 pb-1 mb-3">
            Tantangan Bisnis
          </h3>
          <dl className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-slate-400 font-medium">Tantangan:</dt>
              <dd className="text-white col-span-2">
                {lead.challenges && lead.challenges.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {lead.challenges.map((challenge, index) => (
                      <li key={index}>{formatChallenge(challenge)}</li>
                    ))}
                  </ul>
                ) : 'Tidak ada tantangan yang disebutkan'}
              </dd>
            </div>
            
            {lead.otherChallenge && (
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-slate-400 font-medium">Tantangan Lainnya:</dt>
                <dd className="text-white col-span-2 whitespace-pre-line">{lead.otherChallenge}</dd>
              </div>
            )}
          </dl>
        </div>
        
        {/* Recommended Services */}
        {lead.recommendedServices && lead.recommendedServices.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase text-slate-400 border-b border-slate-700 pb-1 mb-3">
              Layanan yang Direkomendasikan
            </h3>
            <ul className="list-disc list-inside space-y-1 text-white">
              {lead.recommendedServices.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default BusinessLeadDetails;
