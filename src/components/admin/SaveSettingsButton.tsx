
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw } from 'lucide-react';

interface SaveSettingsButtonProps {
  isSaving: boolean;
  onSave: () => void;
}

const SaveSettingsButton: React.FC<SaveSettingsButtonProps> = ({ 
  isSaving, 
  onSave 
}) => {
  return (
    <Button
      className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black"
      onClick={onSave}
      disabled={isSaving}
    >
      {isSaving ? (
        <><RefreshCw size={16} className="mr-2 animate-spin" /> Menyimpan...</>
      ) : (
        <><Save size={16} className="mr-2" /> Simpan Pengaturan</>
      )}
    </Button>
  );
};

export default SaveSettingsButton;
