
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockIcon } from 'lucide-react';
import { UserRole } from '@/types/admin';

interface AdminTabsNavigationProps {
  hasTabAccess: (tabName: string) => boolean;
  userRole: UserRole | null;
}

const AdminTabsNavigation: React.FC<AdminTabsNavigationProps> = ({ 
  hasTabAccess,
  userRole 
}) => {
  return (
    <TabsList className="grid grid-cols-4 mb-8">
      <TabsTrigger value="leads-data">
        Data Leads
      </TabsTrigger>
      <TabsTrigger 
        value="service-management" 
        disabled={!hasTabAccess("service-management")}
        className="relative"
      >
        Layanan
        {!hasTabAccess("service-management") && (
          <LockIcon className="h-3 w-3 absolute top-1 right-1 text-yellow-400" />
        )}
      </TabsTrigger>
      <TabsTrigger 
        value="prompt-settings" 
        disabled={!hasTabAccess("prompt-settings")}
        className="relative"
      >
        Pengaturan Prompt AI
        {!hasTabAccess("prompt-settings") && (
          <LockIcon className="h-3 w-3 absolute top-1 right-1 text-yellow-400" />
        )}
      </TabsTrigger>
      <TabsTrigger 
        value="settings" 
        disabled={!hasTabAccess("settings")}
        className="relative"
      >
        Pengaturan Akses
        {!hasTabAccess("settings") && (
          <LockIcon className="h-3 w-3 absolute top-1 right-1 text-yellow-400" />
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabsNavigation;
