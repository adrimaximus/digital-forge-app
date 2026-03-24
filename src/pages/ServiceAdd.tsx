
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceForm from '@/components/service-form/ServiceForm';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { ServiceFormData } from '@/schemas/serviceFormSchema';
import { useServiceSubmit } from '@/hooks/useServiceSubmit';
import { UserRole } from '@/types/admin';
import { ArrowLeft } from 'lucide-react';

const ServiceAdd: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleSubmit } = useServiceSubmit();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminPassword = localStorage.getItem('adminPassword');
        const savedUserRole = localStorage.getItem('userRole') as UserRole;
        
        if (adminPassword === 'admin123' && 
           (savedUserRole === 'master admin' || savedUserRole === 'admin')) {
          setUserRole(savedUserRole);
          setIsAuthenticated(true);
        } else {
          toast({
            title: "Akses Ditolak",
            description: "Anda harus login sebagai admin untuk mengakses halaman ini",
            variant: "destructive"
          });
          navigate('/admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat memeriksa autentikasi",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const onSubmit = (data: ServiceFormData) => {
    handleSubmit(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8 flex-grow max-w-4xl">
        {isAuthenticated ? (
          <>
            <div className="flex items-center mb-4">
              <button 
                className="flex items-center text-sm text-slate-400 hover:text-slate-200"
                onClick={() => navigate('/admin/services')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Manajemen Layanan
              </button>
            </div>
            
            <h1 className="text-xl font-bold mb-4 text-slate-100">Tambah Layanan Baru</h1>
            <ServiceForm onSubmit={onSubmit} />
          </>
        ) : null}
      </div>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default ServiceAdd;
