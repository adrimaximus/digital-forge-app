
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ConversionStatusBadge from './ConversionStatusBadge';

type ConversionStatus = 'approach' | 'deal' | 'pending' | 'cancelled';

interface ConversionStatusSelectorProps {
  status?: ConversionStatus;
  onChange: (status: ConversionStatus) => void;
}

const ConversionStatusSelector: React.FC<ConversionStatusSelectorProps> = ({
  status,
  onChange
}) => {
  return (
    <Select
      value={status || ''}
      onValueChange={(value) => onChange(value as ConversionStatus)}
    >
      <SelectTrigger className="h-8 w-28 text-xs bg-slate-600 border-slate-500">
        <SelectValue placeholder="Status">
          {status ? (
            <ConversionStatusBadge status={status} />
          ) : (
            'Status'
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-slate-700 border-slate-600">
        <SelectItem value="approach" className="text-blue-300 focus:text-blue-200 focus:bg-blue-900/30">
          Approach
        </SelectItem>
        <SelectItem value="deal" className="text-green-300 focus:text-green-200 focus:bg-green-900/30">
          Deal
        </SelectItem>
        <SelectItem value="pending" className="text-amber-300 focus:text-amber-200 focus:bg-amber-900/30">
          Pending
        </SelectItem>
        <SelectItem value="cancelled" className="text-red-300 focus:text-red-200 focus:bg-red-900/30">
          Cancelled
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ConversionStatusSelector;
