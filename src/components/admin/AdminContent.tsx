
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { UserRole } from '@/types/admin';
import { 
  SidebarInset 
} from '@/components/ui/sidebar';
import AdminPanelHeader from './AdminPanelHeader';
import AdminSidebar from './AdminSidebar';
import LeadsDataTab from './LeadsDataTab';
import PromptSettingsTab from './PromptSettingsTab';
import SettingsTab from './SettingsTab';
import ServiceManagementTab from './ServiceManagementTab';
import ViewCounter from './ViewCounter';
import RolePreview from './RolePreview';
import AdminNavbar from './AdminNavbar';

interface AdminContentProps {
  userRole: UserRole | null;
  previewRole: UserRole | null;
  setPreviewRole: (role: UserRole | null) => void;
  hasTabAccess: (tabName: string) => boolean;
}

const AdminContent: React.FC<AdminContentProps> = ({ 
  userRole,
  previewRole, 
  setPreviewRole,
  hasTabAccess
}) => {
  const effectiveRole = previewRole || userRole;
  const [activeTab, setActiveTab] = useState<string>(
    hasTabAccess("leads-data") ? "leads-data" : 
    hasTabAccess("service-management") ? "service-management" : 
    hasTabAccess("prompt-settings") ? "prompt-settings" : "settings"
  );
  
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col w-full overflow-x-hidden">
      <AdminNavbar />
      
      <div className="flex flex-1 w-full">
        <AdminSidebar 
          userRole={effectiveRole} 
          hasTabAccess={hasTabAccess}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <SidebarInset className="p-4 overflow-x-hidden">
          <div className="container mx-auto max-w-5xl">
            <AdminPanelHeader userRole={effectiveRole} activeTab={activeTab} />
            
            <div className="flex flex-col space-y-3">
              <RolePreview 
                currentUserRole={userRole} 
                onRolePreviewChange={setPreviewRole} 
              />
              
              {previewRole && (
                <div className="bg-amber-400/20 border border-amber-400 text-amber-200 p-2 rounded-md mb-3 flex items-center text-sm">
                  <Eye className="h-4 w-4 mr-2" />
                  <div>
                    <p className="font-medium">Mode Preview: {previewRole.toUpperCase()}</p>
                    <p className="text-xs">Anda sedang melihat tampilan sebagai {previewRole}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-800 p-4 rounded-md">
              {activeTab === "leads-data" && (
                <>
                  <div className="mb-4">
                    <ViewCounter userRole={effectiveRole} />
                  </div>
                  <LeadsDataTab userRole={effectiveRole} />
                </>
              )}
              {activeTab === "service-management" && hasTabAccess("service-management") && <ServiceManagementTab userRole={effectiveRole} />}
              {activeTab === "prompt-settings" && hasTabAccess("prompt-settings") && <PromptSettingsTab />}
              {activeTab === "settings" && hasTabAccess("settings") && <SettingsTab userRole={effectiveRole} />}
            </div>
          </div>
        </SidebarInset>
      </div>
    </div>
  );
};

export default AdminContent;
