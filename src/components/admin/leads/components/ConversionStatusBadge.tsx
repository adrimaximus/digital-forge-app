
import React from 'react';

type ConversionStatus = 'approach' | 'deal' | 'pending' | 'cancelled';

interface ConversionStatusBadgeProps {
  status?: ConversionStatus;
}

const ConversionStatusBadge: React.FC<ConversionStatusBadgeProps> = ({ status }) => {
  const getConversionStatusColor = (status?: ConversionStatus) => {
    switch (status) {
      case 'approach':
        return 'bg-blue-500/20 text-blue-300';
      case 'deal':
        return 'bg-green-500/20 text-green-300';
      case 'pending':
        return 'bg-amber-500/20 text-amber-300';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  };

  return status ? (
    <span className={`px-2 py-0.5 rounded-full text-xs ${getConversionStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  ) : (
    <>Status</>
  );
};

export default ConversionStatusBadge;
