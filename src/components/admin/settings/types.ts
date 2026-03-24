
import { UserRole } from '@/types/admin';

export interface TeamMember {
  id: string;
  email: string;
  role: UserRole;
  dateAdded: string;
}

export interface TeamMemberFormProps {
  userRole: UserRole | null;
  onAddMember: (email: string, role: UserRole) => void;
  canAddMembers: boolean;
}

export interface TeamMemberTableProps {
  teamMembers: TeamMember[];
  userRole: UserRole | null;
  canManageMembers: boolean;
  canDeleteMasterAdmin: boolean;
  onRemoveMember: (id: string, memberRole: UserRole) => void;
}

export interface AccessRestrictionProps {
  message?: string;
}
