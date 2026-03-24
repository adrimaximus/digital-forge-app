import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from '@/types/admin';
import { Edit, KeyRound, Eye, EyeOff } from 'lucide-react';
import { TeamMember } from './types';
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';

interface EditRoleDialogProps {
  member: TeamMember;
  userRole: UserRole | null;
  onUpdateRole: (memberId: string, newRole: UserRole) => void;
}

const EditRoleDialog = ({ member, userRole, onUpdateRole }: EditRoleDialogProps) => {
  const [selectedRole, setSelectedRole] = React.useState<UserRole>(member.role);
  const [newPassword, setNewPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    // Load saved password from localStorage when dialog opens
    if (open) {
      const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
      const currentMember = teamMembers.find((m: TeamMember) => m.id === member.id);
      if (currentMember?.password) {
        setNewPassword(currentMember.password);
      }
    }
  }, [open, member.id]);

  const handleUpdateRole = () => {
    onUpdateRole(member.id, selectedRole);
    
    // If master admin changes password
    if (userRole === 'master admin' && newPassword.trim()) {
      // Store the new password in localStorage
      const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
      const updatedMembers = teamMembers.map((m: TeamMember) => {
        if (m.id === member.id) {
          return { ...m, password: newPassword };
        }
        return m;
      });
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      
      toast({
        title: "Password updated",
        description: "Password has been changed successfully",
      });
    }
    
    setOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const canEditToRole = (role: UserRole): boolean => {
    if (userRole === 'master admin') return true;
    if (userRole === 'admin') return role !== 'master admin';
    return false;
  };

  const isMasterAdmin = userRole === 'master admin';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={!canEditToRole(member.role)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Team Member Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-slate-400">Member: {member.email}</p>
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {userRole === 'master admin' && (
                  <SelectItem value="master admin">Master Admin</SelectItem>
                )}
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="affiliate">Affiliate</SelectItem>
              </SelectContent>
            </Select>

            {isMasterAdmin && (
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-yellow-400" />
                  <p className="text-sm font-medium">Change Password</p>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {newPassword && (
                  <p className="text-xs text-slate-400">
                    New password will be set when you click Save Changes
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoleDialog;
