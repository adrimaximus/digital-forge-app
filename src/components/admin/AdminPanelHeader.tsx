
import React from 'react';
import { UserRole } from '@/types/admin';

interface AdminPanelHeaderProps {
  userRole: UserRole | null;
  activeTab?: string;
}

const AdminPanelHeader: React.FC<AdminPanelHeaderProps> = ({ userRole, activeTab }) => {
  return null;
};

export default AdminPanelHeader;
