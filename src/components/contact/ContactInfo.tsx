
import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <a 
        href="mailto:hello@betterworks.id"
        className="block glass-morphism rounded-xl p-6 border border-white/10 flex items-start gap-4 hover:bg-white/5 transition-colors hover:border-yellow-400/50 hover:shadow-md hover:shadow-yellow-400/10 transition-all duration-300"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center shrink-0">
          <Mail className="text-white" size={18} />
        </div>
        <div>
          <h3 className="font-bold mb-2">Email</h3>
          <p className="text-gray-300">hello@betterworks.id</p>
          <p className="text-sm text-gray-400 mt-1">
            Kami akan membalas email Anda dalam waktu 24 jam
          </p>
        </div>
      </a>

      <a 
        href="https://maps.app.goo.gl/HbEwgNo67GSHhkEM7" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block glass-morphism rounded-xl p-6 border border-white/10 flex items-start gap-4 hover:bg-white/5 transition-colors hover:border-yellow-400/50 hover:shadow-md hover:shadow-yellow-400/10 transition-all duration-300"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center shrink-0">
          <MapPin className="text-white" size={18} />
        </div>
        <div>
          <h3 className="font-bold mb-2">Alamat</h3>
          <p className="text-gray-300">
            Jl. Siliwangi Q No.1, Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Jam operasional: Senin - Jumat, 09:00 - 17:00
          </p>
        </div>
      </a>

      <SocialLinks />
    </div>
  );
};

export default ContactInfo;
