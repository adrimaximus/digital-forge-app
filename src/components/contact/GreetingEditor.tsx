
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface GreetingEditorProps {
  onOpenEditDialog: () => void;
}

const GreetingEditor: React.FC<GreetingEditorProps> = ({ onOpenEditDialog }) => {
  return (
    <div className="mb-6 bg-white/5 p-4 rounded-lg border border-white/10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-300">Ingin ganti sapaan?</p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onOpenEditDialog}
          className="flex items-center gap-2 text-xs border-yellow-400/30 hover:bg-yellow-400/10"
        >
          <Edit className="w-3 h-3" />
          Ganti Sapaan
        </Button>
      </div>
    </div>
  );
};

export default GreetingEditor;
