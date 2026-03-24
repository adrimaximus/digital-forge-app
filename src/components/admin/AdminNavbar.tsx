
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';

const AdminNavbar: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication-related items from localStorage
    localStorage.removeItem('adminPassword');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');

    // Show logout toast
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari panel admin."
    });

    // Redirect to home page
    navigate('/');
  };

  return <nav className="bg-slate-800 border-b border-slate-700 w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-white hover:bg-slate-700" />
          <Link to="/" className="flex items-center text-white hover:text-yellow-400 transition">
            <Home 
              size={18} 
              strokeWidth={1.5} 
              className="mr-2 transition-transform duration-300 hover:rotate-12" 
            />
            <span>
            </span>
          </Link>
        </div>
        
        <div className="text-lg font-semibold text-yellow-300">Admin Panel</div>
        
        <Button variant="outline" size="sm" className="border-red-400/30 text-red-400 hover:bg-red-400/10" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" /> Logout
        </Button>
      </div>
    </nav>;
};

export default AdminNavbar;

