import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, KeyRound, AtSign } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminAuthProps {
  onLogin: (email: string, role: string) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({
  onLogin
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Login gagal",
        description: "Email dan password tidak boleh kosong.",
        variant: "destructive"
      });
      return;
    }

    // Get team members from localStorage
    const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const user = teamMembers.find((member: any) => member.email === email);
    if (!user) {
      toast({
        title: "Login gagal",
        description: "Email tidak ditemukan.",
        variant: "destructive"
      });
      return;
    }
    if (user.password !== password) {
      toast({
        title: "Login gagal",
        description: "Password tidak valid.",
        variant: "destructive"
      });
      return;
    }

    // Valid login
    localStorage.setItem('adminPassword', password);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userEmail', email);
    onLogin(email, user.role);
    toast({
      title: "Login berhasil",
      description: `Selamat datang kembali, ${email}`
    });
  };

  return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-lg p-8 rounded-xl border border-yellow-400/20 max-w-md w-full shadow-xl">
        <div className="flex justify-center mb-8">
          <img alt="Betterworks Logo" src="/lovable-uploads/69f51643-0821-455a-9421-084ab90a8c43.png" className="h-20 w-20" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Login
        </h1>
        <p className="text-slate-400 text-sm text-center mb-6">
          Enter your credentials to continue
        </p>
        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-center relative">
              <AtSign className="absolute left-3 h-5 w-5 text-slate-400" />
              <Input 
                type="email" 
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-yellow-400/50 focus:ring-yellow-400/20 focus:ring-2 focus:outline-none text-white placeholder-slate-500" 
                placeholder="Enter email address" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
          </div>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-yellow-400/50 focus:ring-yellow-400/20 focus:ring-2 focus:outline-none text-white placeholder-slate-500 pr-12" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }} />
            <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent text-slate-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          <Button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>;
};

export default AdminAuth;
