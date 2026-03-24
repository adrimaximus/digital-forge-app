
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryManagementHeader from './CategoryManagementHeader';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useCategories } from '@/hooks/admin/useCategories';
import { UserRole } from '@/types/admin';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const { categories, addCategory, editCategory, deleteCategory } = useCategories();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check authentication
  useEffect(() => {
    const adminPassword = localStorage.getItem('adminPassword');
    const savedUserRole = localStorage.getItem('userRole');
    
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      // Cast the saved user role to UserRole type or default to null if invalid
      if (savedUserRole === "master admin" || savedUserRole === "admin" || savedUserRole === "affiliate") {
        setUserRole(savedUserRole as UserRole);
      } else {
        setUserRole(null);
      }
    } else {
      navigate('/admin');
    }
  }, [navigate]);

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
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <SidebarProvider>
        <div className="flex w-full">
          <AdminSidebar 
            userRole={userRole}
            hasTabAccess={hasTabAccess}
            activeTab="service-management"
            onTabChange={(tab) => navigate('/admin')}
          />
          
          <SidebarInset className="flex-1 p-8">
            <CategoryManagementHeader 
              title="Manajemen Kategori" 
              description="Kelola kategori untuk layanan dan solusi"
            />

            <div className="grid gap-8">
              <CategoryForm 
                categories={categories} 
                onAddCategory={addCategory} 
              />
              
              <CategoryList 
                categories={categories}
                onEditCategory={editCategory}
                onDeleteCategory={deleteCategory}
              />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CategoryManagement;
