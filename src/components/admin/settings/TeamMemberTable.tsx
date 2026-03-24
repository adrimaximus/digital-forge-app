
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { TeamMemberTableProps } from './types';
import EditRoleDialog from './EditRoleDialog';
import { UserRole } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

const TeamMemberTable: React.FC<TeamMemberTableProps> = ({ 
  teamMembers,
  userRole, 
  canManageMembers,
  canDeleteMasterAdmin,
  onRemoveMember,
}) => {
  const { toast } = useToast();

  const handleUpdateRole = (memberId: string, newRole: UserRole) => {
    const updatedMembers = teamMembers.map(member => {
      if (member.id === memberId) {
        return { ...member, role: newRole };
      }
      return member;
    });
    
    // Save to localStorage
    localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
    
    toast({
      title: "Role updated",
      description: "Team member role has been updated successfully.",
    });
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Email</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Role</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Tanggal Ditambahkan</th>
            <th className="py-3 px-4 text-right text-sm font-medium text-slate-300">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id} className="border-b border-slate-700 last:border-b-0">
              <td className="py-3 px-4 text-sm">{member.email}</td>
              <td className="py-3 px-4 text-sm capitalize">{member.role}</td>
              <td className="py-3 px-4 text-sm">{member.dateAdded}</td>
              <td className="py-3 px-4 text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                  <EditRoleDialog 
                    member={member}
                    userRole={userRole}
                    onUpdateRole={handleUpdateRole}
                  />
                  {(userRole === "master admin" || (userRole === "admin" && member.role !== "master admin")) ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => onRemoveMember(member.id, member.role)}
                      disabled={member.role === "master admin" && !canDeleteMasterAdmin}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 cursor-not-allowed"
                            disabled
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {member.role === "master admin" ? 
                            "Hanya Master Admin yang dapat menghapus Master Admin" : 
                            "Anda tidak memiliki izin untuk menghapus anggota tim"
                          }
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMemberTable;
