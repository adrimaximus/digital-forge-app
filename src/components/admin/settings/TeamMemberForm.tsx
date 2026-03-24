
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { UserRole } from '@/types/admin';
import { TeamMemberFormProps } from './types';

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ 
  userRole, 
  onAddMember,
  canAddMembers 
}) => {
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("admin");

  const handleSubmit = () => {
    onAddMember(newEmail, newRole);
    setNewEmail("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <Label htmlFor="new-admin-email">Email</Label>
        <Input 
          id="new-admin-email"
          type="email"
          placeholder="email@contoh.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="role-select">Role</Label>
        <Select 
          value={newRole} 
          onValueChange={(value) => setNewRole(value as UserRole)}
          disabled={userRole === "admin" && newRole === "master admin"}
        >
          <SelectTrigger id="role-select">
            <SelectValue placeholder="Pilih peran" />
          </SelectTrigger>
          <SelectContent>
            {userRole === "master admin" && (
              <SelectItem value="master admin">Master Admin</SelectItem>
            )}
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="affiliate">Affiliate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button 
          onClick={handleSubmit}
          className="bg-yellow-400 hover:bg-yellow-500 text-black w-full"
          disabled={!canAddMembers}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Anggota
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberForm;
