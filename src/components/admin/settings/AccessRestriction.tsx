
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { AccessRestrictionProps } from './types';

const AccessRestriction: React.FC<AccessRestrictionProps> = ({ 
  message = "Anda tidak memiliki izin untuk mengakses halaman pengaturan akses.\nHubungi admin untuk informasi lebih lanjut."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ShieldAlert className="h-16 w-16 text-yellow-400 mb-4" />
      <h3 className="text-xl font-bold mb-2">Akses Terbatas</h3>
      <p className="text-center text-slate-400">
        {message.split('\n').map((text, i) => (
          <React.Fragment key={i}>
            {text}
            {i !== message.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default AccessRestriction;
