
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactFormData } from './types';

interface ContactFormFieldsProps {
  formData: ContactFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleSubmit
}) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input 
            placeholder="Nama Lengkap" 
            className="bg-white/5 border-white/10"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input 
            placeholder="Email" 
            type="email" 
            className="bg-white/5 border-white/10"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <Select onValueChange={handleSelectChange} value={formData.informationType}>
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue placeholder="Kebutuhan Informasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="harga-layanan">Harga Layanan</SelectItem>
            <SelectItem value="konsultasi">Konsultasi</SelectItem>
            <SelectItem value="brief-project">Brief project</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
            <SelectItem value="lainnya">Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Textarea 
          placeholder="Pesan" 
          className="bg-white/5 border-white/10 min-h-[120px]"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white">
        Kirim Pesan <MessageSquare className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default ContactFormFields;
