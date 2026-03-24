
import React from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface EditGreetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editName: string;
  setEditName: (name: string) => void;
  editEmail: string;
  setEditEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditGreetingDialog: React.FC<EditGreetingDialogProps> = ({
  open,
  onOpenChange,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  onSubmit,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg">
            👋 Perbarui Sapaan
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-gray-500">
            Silakan masukkan nama dan email yang baru
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              id="editName"
              placeholder="Nama panggilan"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full"
              autoFocus
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="editEmail"
              type="email"
              placeholder="Email (opsional)"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Simpan
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditGreetingDialog;
