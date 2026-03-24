
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CatalogFormActionsProps {
  isEditing?: boolean;
}

export const CatalogFormActions: React.FC<CatalogFormActionsProps> = ({ isEditing }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4">
      <Button variant="outline" type="button" onClick={() => navigate('/catalog')}>
        Batal
      </Button>
      <Button type="submit">
        {isEditing ? 'Perbarui Layanan' : 'Tambah Layanan'}
      </Button>
    </div>
  );
};
