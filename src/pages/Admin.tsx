
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminAuth from '@/components/admin/auth/AdminAuth';
import AdminContent from '@/components/admin/AdminContent';
import { UserRole } from '@/types/admin';
import { SidebarProvider } from '@/components/ui/sidebar';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [previewRole, setPreviewRole] = useState<UserRole | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    const savedUserRole = localStorage.getItem('userRole') as UserRole;
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedPassword && savedUserRole && savedEmail) {
      setIsAuthenticated(true);
      setUserRole(savedUserRole);
    }
  }, []);

  const handleLogin = (email: string, role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const hasTabAccess = (tabName: string): boolean => {
    if (!userRole) return false;
    
    switch (tabName) {
      case "prompt-settings":
        return userRole === "master admin";
      case "settings":
      case "service-management":
        return userRole === "master admin" || userRole === "admin";
      case "leads-data":
        return true;
      default:
        return false;
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AdminContent 
          userRole={userRole}
          previewRole={previewRole}
          setPreviewRole={setPreviewRole}
          hasTabAccess={hasTabAccess}
        />
      </div>
    </SidebarProvider>
  );
};

export default Admin;
