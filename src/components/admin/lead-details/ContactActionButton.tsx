
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';
import { Lead } from '../leads/types';

interface ContactActionButtonProps {
  lead: Lead;
}

const ContactActionButton: React.FC<ContactActionButtonProps> = ({ lead }) => {
  const getMailtoLink = () => {
    const email = lead.email;
    const subject = `Follow-up: ${lead.source === 'contact-form' 
      ? `Pesan kontak dari ${(lead as any).fullName}` 
      : `Analisis bisnis untuk ${(lead as any).businessName}`}`;
    
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <Button
      variant="default"
      className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black"
    >
      <a href={getMailtoLink()} className="flex items-center">
        <Mail className="mr-2 h-4 w-4" /> Kirim Email
      </a>
    </Button>
  );
};

export default ContactActionButton;
