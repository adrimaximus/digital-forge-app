
import React from 'react';
import { Users } from 'lucide-react';
import { UserRole } from '@/types/admin';
import TeamMemberForm from './TeamMemberForm';
import TeamMemberTable from './TeamMemberTable';
import { TeamMember } from './types';

interface TeamAccessSectionProps {
  userRole: UserRole | null;
  teamMembers: TeamMember[];
  onAddTeamMember: (email: string, role: UserRole) => void;
  onRemoveMember: (id: string, memberRole: UserRole) => void;
  canManageMembers: boolean;
  canDeleteMasterAdmin: boolean;
  canAddMembers: boolean;
}

const TeamAccessSection: React.FC<TeamAccessSectionProps> = ({
  userRole,
  teamMembers,
  onAddTeamMember,
  onRemoveMember,
  canManageMembers,
  canDeleteMasterAdmin,
  canAddMembers
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Akses Tim</h3>
      </div>
      
      <p className="text-slate-300 mb-4">
        Kelola anggota tim yang memiliki akses ke panel admin. Setiap anggota akan memiliki peran yang menentukan tingkat akses mereka.
      </p>

      <TeamMemberForm 
        userRole={userRole} 
        onAddMember={onAddTeamMember}
        canAddMembers={canAddMembers}
      />

      <TeamMemberTable 
        teamMembers={teamMembers}
        userRole={userRole}
        canManageMembers={canManageMembers}
        canDeleteMasterAdmin={canDeleteMasterAdmin}
        onRemoveMember={onRemoveMember}
      />

      <div className="pt-4 border-t border-slate-600 mt-4">
        <p className="text-xs text-slate-400">
          <strong>Peran:</strong> Master Admin memiliki kontrol penuh. Admin dapat mengelola konten. Affiliate hanya dapat melihat data dan mengunduh laporan.
        </p>
      </div>
    </div>
  );
};

export default TeamAccessSection;
