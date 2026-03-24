
import React from 'react';

interface LeadTypeBadgeProps {
  type: 'contact-form' | 'business-analysis';
}

const LeadTypeBadge: React.FC<LeadTypeBadgeProps> = ({ type }) => {
  if (type === 'contact-form') {
    return (
      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
        Kontak
      </span>
    );
  }
  
  return (
    <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full text-xs">
      Analisis
    </span>
  );
};

export default LeadTypeBadge;
