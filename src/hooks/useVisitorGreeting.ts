
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export function useVisitorGreeting() {
  const { toast } = useToast();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [visitorIP, setVisitorIP] = useState<string | null>(null);

  // Fetch visitor's IP on hook initialization
  useEffect(() => {
    const fetchVisitorIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setVisitorIP(data.ip);
        localStorage.setItem('visitorIP', data.ip);
      } catch (error) {
        console.error('Failed to fetch visitor IP:', error);
        // Fallback to using a random ID if IP fetch fails
        const fallbackIP = `fallback-${Math.random().toString(36).substring(2, 15)}`;
        setVisitorIP(fallbackIP);
        localStorage.setItem('visitorIP', fallbackIP);
      }
    };
    
    // Get IP from localStorage first if available
    const storedIP = localStorage.getItem('visitorIP');
    if (storedIP) {
      setVisitorIP(storedIP);
      
      // Load name and email from localStorage based on IP
      const storedName = localStorage.getItem(`visitorName_${storedIP}`);
      const storedEmail = localStorage.getItem(`visitorEmail_${storedIP}`);
      
      if (storedName) {
        // Update sessionStorage for current session access
        sessionStorage.setItem('visitorName', storedName);
      }
      
      if (storedEmail) {
        sessionStorage.setItem('visitorEmail', storedEmail);
      }
      
      // Notify components that visitor info is updated
      window.dispatchEvent(new CustomEvent('visitorNameUpdated'));
    } else {
      fetchVisitorIP();
    }
  }, []);

  const openEditGreetingDialog = () => {
    // Get current values from localStorage using visitor IP to ensure we're editing the most up-to-date data
    if (visitorIP) {
      const currentName = localStorage.getItem(`visitorName_${visitorIP}`) || '';
      const currentEmail = localStorage.getItem(`visitorEmail_${visitorIP}`) || '';
      
      // Set dialog fields with current values
      setEditName(currentName);
      setEditEmail(currentEmail);
    } else {
      // Fallback to session storage if IP is not available yet
      const currentName = sessionStorage.getItem('visitorName') || '';
      const currentEmail = sessionStorage.getItem('visitorEmail') || '';
      
      setEditName(currentName);
      setEditEmail(currentEmail);
    }
    
    setOpenEditDialog(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast({
        title: "Nama diperlukan",
        description: "Silakan isi nama Anda.",
        variant: "destructive"
      });
      return;
    }

    if (!visitorIP) {
      // This should rarely happen as we set a fallback
      console.error('No visitor IP available');
      return;
    }
    
    // Update localStorage for persistent storage with IP
    localStorage.setItem(`visitorName_${visitorIP}`, editName);
    if (editEmail) localStorage.setItem(`visitorEmail_${visitorIP}`, editEmail);
    
    // Update sessionStorage for current session
    sessionStorage.setItem('visitorName', editName);
    sessionStorage.setItem('visitorEmail', editEmail);
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('visitorNameUpdated'));
    
    setOpenEditDialog(false);
    toast({
      title: "Berhasil",
      description: `Sapaan berhasil diperbarui menjadi ${editName}.`,
    });
  };

  return {
    openEditDialog,
    setOpenEditDialog,
    editName,
    setEditName,
    editEmail,
    setEditEmail,
    visitorIP,
    openEditGreetingDialog,
    handleEditSubmit
  };
}
