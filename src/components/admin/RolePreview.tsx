
import React from 'react';
import { UserRole } from '@/types/admin';
import { Button } from '@/components/ui/button';

interface RolePreviewProps {
  currentUserRole: UserRole | null;
  onRolePreviewChange: (role: UserRole | null) => void;
}

const RolePreview: React.FC<RolePreviewProps> = ({ currentUserRole, onRolePreviewChange }) => {
  if (currentUserRole !== 'master admin') {
    return null;
  }

  const handlePreviewRole = (role: UserRole) => {
    onRolePreviewChange(role);
  };

  const handleClearPreview = () => {
    onRolePreviewChange(null);
  };

  return (
    <div className="bg-slate-700 p-3 rounded-md mb-3">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Preview Akses Sebagai:</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7 px-2 hover:bg-slate-600"
            onClick={handleClearPreview}
          >
            Reset
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-6 bg-slate-700 border-yellow-500/50 hover:bg-yellow-500/20"
            onClick={() => handlePreviewRole('admin')}
          >
            Admin
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-6 bg-slate-700 border-yellow-500/50 hover:bg-yellow-500/20"
            onClick={() => handlePreviewRole('staff' as UserRole)}
          >
            Staff
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-6 bg-slate-700 border-yellow-500/50 hover:bg-yellow-500/20"
            onClick={() => handlePreviewRole('visitor' as UserRole)}
          >
            Visitor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RolePreview;
