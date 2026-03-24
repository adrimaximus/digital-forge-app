
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Eye, Trash2 } from 'lucide-react';
import { Lead } from '../types';

interface LeadActionButtonsProps {
  lead: Lead;
  canDelete: boolean;
  onView: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

const LeadActionButtons: React.FC<LeadActionButtonsProps> = ({
  lead,
  canDelete,
  onView,
  onDelete
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
        onClick={() => onView(lead)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      {canDelete ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
          onClick={() => onDelete(lead.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-slate-500 cursor-not-allowed"
                disabled
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hanya Master Admin dan Admin yang dapat menghapus data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default LeadActionButtons;
