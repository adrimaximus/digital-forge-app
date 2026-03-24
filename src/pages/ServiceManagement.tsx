
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from "lucide-react";
import ServiceManagementTab from '@/components/admin/ServiceManagementTab';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { UserRole } from '@/types/admin';

const ServiceManagement: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const adminPassword = localStorage.getItem('adminPassword');
    const savedUserRole = localStorage.getItem('userRole');
    
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      if (savedUserRole === "master admin" || savedUserRole === "admin" || savedUserRole === "affiliate") {
        setUserRole(savedUserRole as UserRole);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-900 text-slate-100 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !hasTabAccess("service-management")) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <SidebarProvider>
        <div className="flex w-full">
          <AdminSidebar
            userRole={userRole}
            hasTabAccess={hasTabAccess}
            activeTab="service-management"
            onTabChange={() => {}}
          />
          
          <SidebarInset className="flex-1 p-8">
            <ServiceManagementTab userRole={userRole} />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ServiceManagement;
