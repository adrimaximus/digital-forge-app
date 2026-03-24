
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { updateLeadStats } from '@/utils/leadTracker';
import EditGreetingDialog from './EditGreetingDialog';
import GreetingEditor from './GreetingEditor';
import ContactFormFields from './ContactFormFields';
import { useVisitorGreeting } from '@/hooks/useVisitorGreeting';
import { ContactFormData } from './types';

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    informationType: '',
    message: ''
  });

  const {
    openEditDialog,
    setOpenEditDialog,
    editName,
    setEditName,
    editEmail,
    setEditEmail,
    openEditGreetingDialog,
    handleEditSubmit
  } = useVisitorGreeting();

  // Update form data when component mounts and when visitor name/email changes
  useEffect(() => {
    const updateFormWithVisitorInfo = () => {
      const storedName = sessionStorage.getItem('visitorName');
      const storedEmail = sessionStorage.getItem('visitorEmail');
      
      if (storedName || storedEmail) {
        console.log('Updating form with visitor info:', { name: storedName, email: storedEmail });
        setFormData(prevData => ({
          ...prevData,
          fullName: storedName || prevData.fullName,
          email: storedEmail || prevData.email
        }));
      }
    };
    
    // Initial update
    updateFormWithVisitorInfo();
    
    // Listen for visitor information updates
    window.addEventListener('visitorNameUpdated', updateFormWithVisitorInfo);
    
    return () => {
      window.removeEventListener('visitorNameUpdated', updateFormWithVisitorInfo);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      informationType: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.informationType) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan isi semua kolom yang diperlukan.",
        variant: "destructive"
      });
      return;
    }

    const informationTypeText = {
      'harga-layanan': 'Harga Layanan',
      'konsultasi': 'Konsultasi',
      'brief-project': 'Brief project',
      'feedback': 'Feedback',
      'lainnya': 'Lainnya'
    }[formData.informationType] || formData.informationType;

    const whatsappMessage = `Halo saya ${formData.fullName} | ${formData.email}, mau follow up ${informationTypeText} terkait dengan layanan betterworks. Apakah bisa dibantu?${formData.message ? ' ' + formData.message : ''}`;
    
    const whatsappNumber = "6281310481951";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    const existingLeads = JSON.parse(localStorage.getItem('contactFormLeads') || '[]');
    const newLead = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      informationType: formData.informationType,
      message: formData.message,
      timestamp: new Date().toISOString(),
      source: 'contact-form'
    };
    
    existingLeads.push(newLead);
    localStorage.setItem('contactFormLeads', JSON.stringify(existingLeads));
    
    console.log('Contact form submitted, updating lead stats');
    updateLeadStats('contact-form');
    
    window.open(whatsappUrl, '_blank');

    setFormData({
      fullName: '',
      email: '',
      informationType: '',
      message: ''
    });

    toast({
      title: "Berhasil",
      description: "Mengarahkan ke WhatsApp...",
    });
  };

  return (
    <div id="contact-form" className="glass-morphism rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-bold mb-6">Kirim Pesan</h3>
      
      {/* Change Greeting Block */}
      <GreetingEditor onOpenEditDialog={openEditGreetingDialog} />
      
      <ContactFormFields 
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
      />
      
      {/* Edit Name/Email Dialog */}
      <EditGreetingDialog 
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        editName={editName}
        setEditName={setEditName}
        editEmail={editEmail}
        setEditEmail={setEditEmail}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default ContactForm;
