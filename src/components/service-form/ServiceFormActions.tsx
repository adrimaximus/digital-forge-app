
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';

const ServiceFormActions: React.FC = () => {
  const { formState } = useFormContext();
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-2 pt-2">
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        onClick={() => navigate(-1)}
      >
        <X className="h-4 w-4 mr-1" /> Batal
      </Button>
      <Button 
        type="submit" 
        disabled={formState.isSubmitting}
        size="sm"
        className="bg-purple-500 hover:bg-purple-600"
      >
        <Save className="h-4 w-4 mr-1" /> Simpan
      </Button>
    </div>
  );
};

export default ServiceFormActions;
