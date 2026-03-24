
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import LeadsDataTab from '@/components/admin/LeadsDataTab';
import PromptSettingsTab from '@/components/admin/PromptSettingsTab';
import SettingsTab from '@/components/admin/SettingsTab';
import ServiceManagementTab from '@/components/admin/ServiceManagementTab';
import { UserRole } from '@/types/admin';

interface AdminTabsContentProps {
  hasTabAccess: (tabName: string) => boolean;
  userRole: UserRole | null;
}

const AdminTabsContent: React.FC<AdminTabsContentProps> = ({ 
  hasTabAccess,
  userRole
}) => {
  return (
    <>
      <TabsContent value="leads-data" className="bg-slate-800 p-6 rounded-lg">
        <LeadsDataTab userRole={userRole} />
      </TabsContent>
      
      {hasTabAccess("service-management") && (
        <TabsContent value="service-management" className="bg-slate-800 p-6 rounded-lg">
          <ServiceManagementTab userRole={userRole} />
        </TabsContent>
      )}
      
      {hasTabAccess("prompt-settings") && (
        <TabsContent value="prompt-settings" className="bg-slate-800 p-6 rounded-lg">
          <PromptSettingsTab />
        </TabsContent>
      )}
      
      {hasTabAccess("settings") && (
        <TabsContent value="settings" className="bg-slate-800 p-6 rounded-lg">
          <SettingsTab userRole={userRole} />
        </TabsContent>
      )}
    </>
  );
};

export default AdminTabsContent;
