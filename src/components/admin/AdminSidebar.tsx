
import React from 'react';
import { UserRole } from '@/types/admin';
import Logo from '@/components/Logo';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar 
} from '@/components/ui/sidebar';
import { BarChart3, Package, Settings, Sparkles, Lock } from 'lucide-react';

interface AdminSidebarProps {
  userRole: UserRole | null;
  hasTabAccess: (tabName: string) => boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  userRole,
  hasTabAccess,
  activeTab,
  onTabChange
}) => {
  const { setOpenMobile, setOpen, isMobile } = useSidebar();
  
  const handleTabClick = (tab: string) => {
    // Close sidebar when link is clicked
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
    
    // Call the original tab change handler
    onTabChange(tab);
  };
  
  return <Sidebar className="bg-slate-900 border-r border-slate-700">
      <SidebarContent className="bg-slate-800">
        <div className="px-3 py-3 bg-slate-800">
          <Logo />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs px-3 py-1 bg-slate-800 text-muted-foreground">Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleTabClick("leads-data")} isActive={activeTab === "leads-data"} tooltip="Data Leads" className="py-1.5 px-2 text-sm bg-slate-800 hover:bg-slate-700 transition-colors">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span>Data Leads</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleTabClick("service-management")} isActive={activeTab === "service-management"} disabled={!hasTabAccess("service-management")} tooltip={!hasTabAccess("service-management") ? "Anda tidak memiliki akses" : "Layanan"} className="py-1.5 px-2 text-sm bg-slate-800 hover:bg-slate-700 transition-colors">
                  <Package className="h-4 w-4 mr-2" />
                  <span>Layanan</span>
                  {!hasTabAccess("service-management") && <Lock className="h-2.5 w-2.5 ml-2 text-yellow-400" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleTabClick("prompt-settings")} isActive={activeTab === "prompt-settings"} disabled={!hasTabAccess("prompt-settings")} tooltip={!hasTabAccess("prompt-settings") ? "Anda tidak memiliki akses" : "Pengaturan Prompt AI"} className="py-1.5 px-2 text-sm bg-slate-800 hover:bg-slate-700 transition-colors">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Pengaturan Prompt AI</span>
                  {!hasTabAccess("prompt-settings") && <Lock className="h-2.5 w-2.5 ml-2 text-yellow-400" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleTabClick("settings")} isActive={activeTab === "settings"} disabled={!hasTabAccess("settings")} tooltip={!hasTabAccess("settings") ? "Anda tidak memiliki akses" : "Pengaturan Akses"} className="py-1.5 px-2 text-sm bg-slate-800 hover:bg-slate-700 transition-colors">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Pengaturan Akses</span>
                  {!hasTabAccess("settings") && <Lock className="h-2.5 w-2.5 ml-2 text-yellow-400" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};

export default AdminSidebar;
