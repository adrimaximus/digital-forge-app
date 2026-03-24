import React, { useState, useEffect } from 'react';
import { Settings } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/admin';
import AccessRestriction from './settings/AccessRestriction';
import TeamAccessSection from './settings/TeamAccessSection';
import { TeamMember } from './settings/types';

interface SettingsTabProps {
  userRole: UserRole | null;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ userRole }) => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const savedMembers = localStorage.getItem('teamMembers');
    return savedMembers ? JSON.parse(savedMembers) : [{
      id: "1",
      email: "admin@betterworks.id",
      role: "master admin",
      dateAdded: "2023-10-01"
    }];
  });

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  // Check permissions
  const canManageMembers = userRole === "master admin" || userRole === "admin";
  const canDeleteMasterAdmin = userRole === "master admin";
  const canAddMembers = userRole === "master admin" || userRole === "admin";

  const handleAddTeamMember = (email: string, role: UserRole) => {
    // Check permission
    if (!canAddMembers) {
      toast({
        title: "Akses ditolak",
        description: "Anda tidak memiliki izin untuk menambah anggota tim",
        variant: "destructive"
      });
      return;
    }

    // Simple email validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Email tidak valid",
        description: "Masukkan alamat email yang valid",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists
    if (teamMembers.some(member => member.email === email)) {
      toast({
        title: "Email sudah ada",
        description: "Anggota tim dengan email ini sudah terdaftar",
        variant: "destructive"
      });
      return;
    }

    // If user is admin, they can't add master admin
    if (userRole === "admin" && role === "master admin") {
      toast({
        title: "Akses ditolak",
        description: "Anda tidak dapat menambahkan Master Admin",
        variant: "destructive"
      });
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: email,
      role: role,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([...teamMembers, newMember]);

    toast({
      title: "Anggota tim ditambahkan",
      description: `${email} berhasil ditambahkan sebagai ${role}`,
    });
  };

  const handleRemoveMember = (id: string, memberRole: UserRole) => {
    // Check base permission
    if (!canManageMembers) {
      toast({
        title: "Akses ditolak",
        description: "Anda tidak memiliki izin untuk menghapus anggota tim",
        variant: "destructive"
      });
      return;
    }

    // Check if trying to remove a master admin
    if (memberRole === "master admin") {
      // Only master admin can delete another master admin
      if (!canDeleteMasterAdmin) {
        toast({
          title: "Akses ditolak",
          description: "Hanya Master Admin yang dapat menghapus Master Admin lain",
          variant: "destructive"
        });
        return;
      }

      // Check if trying to remove the last master admin
      const masterAdminCount = teamMembers.filter(member => member.role === "master admin").length;
      if (masterAdminCount <= 1) {
        toast({
          title: "Tidak dapat dihapus",
          description: "Harus ada minimal satu master admin di tim",
          variant: "destructive"
        });
        return;
      }
    }
    
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast({
      title: "Anggota tim dihapus",
      description: "Anggota tim berhasil dihapus dari panel admin",
    });
  };

  // Prevent non-allowed roles from seeing this tab
  if (!canManageMembers) {
    return <AccessRestriction />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-yellow-400" />
        <h2 className="text-xl font-bold">Pengaturan Akses</h2>
      </div>

      <div className="bg-slate-700 p-4 rounded-lg space-y-6">
        <TeamAccessSection 
          userRole={userRole}
          teamMembers={teamMembers}
          onAddTeamMember={handleAddTeamMember}
          onRemoveMember={handleRemoveMember}
          canManageMembers={canManageMembers}
          canDeleteMasterAdmin={canDeleteMasterAdmin}
          canAddMembers={canAddMembers}
        />
      </div>
    </div>
  );
};

export default SettingsTab;
