
import React from 'react';
import { Package2, Users, MapPin, Mail } from 'lucide-react';

interface BusinessSummaryProps {
  formData: {
    businessName: string;
    productType: string;
    numberOfEmployees: string;
    location: string;
    email: string;
    [key: string]: any;
  };
}

const BusinessSummary: React.FC<BusinessSummaryProps> = ({ formData }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-xl">{formData.businessName}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Package2 className="h-4 w-4 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-400">Jenis Produk</p>
            <p>{formData.productType || '-'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-400">Jumlah Karyawan</p>
            <p>{formData.numberOfEmployees || '-'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-400">Lokasi</p>
            <p>{formData.location || '-'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-400">Kontak</p>
            <p>{formData.email || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
