
import { BusinessAnalysisLead } from '@/components/admin/leads/types';
import { BusinessData } from '@/utils/ai/types';

/**
 * Formats business data for PDF generation
 */
export const formatBusinessDataForReport = (data: BusinessData | BusinessAnalysisLead): {
  businessInfo: Array<{ label: string; value: string | undefined }>;
  digitalPresence: Array<{ label: string; value: string | boolean | undefined }>;
  challenges: Array<string>;
} => {
  // Format business information
  const businessInfo = [
    { label: 'Nama Bisnis', value: data.businessName },
    { label: 'Jenis Produk/Layanan', value: data.productType },
    { label: 'Jumlah Karyawan', value: data.numberOfEmployees },
    { label: 'Lokasi', value: data.location },
    { label: 'Nomor Kontak', value: data.contactNumber },
    { label: 'Email', value: data.email }
  ].filter(item => item.value !== undefined);

  // Format digital presence
  const digitalPresence = [
    { label: 'Media Sosial', value: data.hasSocialMedia },
    { label: 'Platform', value: data.socialMediaPlatforms ? data.socialMediaPlatforms.join(', ') : undefined },
    { label: 'Website', value: data.hasWebsite },
    { label: 'URL Website', value: data.hasWebsite ? data.websiteUrl : undefined },
    { label: 'Iklan Digital', value: data.hasDigitalAds }
  ].filter(item => item.value !== undefined);

  // Format challenges
  const challengeMap: { [key: string]: string } = {
    'komunikasi_pelanggan': 'Komunikasi dengan Pelanggan',
    'pengelolaan_data': 'Pengelolaan Data',
    'visibilitas_online': 'Visibilitas Online',
    'promosi_bisnis': 'Promosi Bisnis', 
    'keamanan_data': 'Keamanan Data',
    'performa_website': 'Performa Website'
  };

  const challenges: string[] = [];
  
  if (data.challenges && data.challenges.length > 0) {
    data.challenges.forEach(challenge => {
      challenges.push(challengeMap[challenge] || challenge);
    });
  }

  if (data.otherChallenge) {
    challenges.push(`Lainnya: ${data.otherChallenge}`);
  }

  return {
    businessInfo,
    digitalPresence,
    challenges
  };
};

/**
 * Generate filename for the business report
 */
export const generateReportFilename = (businessName?: string): string => {
  return `Analisis_Bisnis_${businessName || 'Anda'}.pdf`;
};
