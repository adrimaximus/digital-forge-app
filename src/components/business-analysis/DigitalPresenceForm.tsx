
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import CheckboxItem from './digital-presence/CheckboxItem';
import SocialMediaPlatforms from './digital-presence/SocialMediaPlatforms';
import WebsiteUrlInput from './digital-presence/WebsiteUrlInput';

const digitalPresenceSchema = z.object({
  hasSocialMedia: z.boolean().default(false),
  socialMediaPlatforms: z.array(z.string()).optional(),
  hasWebsite: z.boolean().default(false),
  websiteUrl: z.string().optional(),
  hasDigitalAds: z.boolean().default(false),
});

export type DigitalPresenceData = z.infer<typeof digitalPresenceSchema>;

interface DigitalPresenceFormProps {
  defaultValues: Partial<DigitalPresenceData>;
  onNext: (data: DigitalPresenceData) => void;
  onPrev: () => void;
}

const DigitalPresenceForm: React.FC<DigitalPresenceFormProps> = ({ defaultValues, onNext, onPrev }) => {
  const form = useForm<DigitalPresenceData>({
    resolver: zodResolver(digitalPresenceSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Kehadiran Digital</h3>
          
          <CheckboxItem
            name="hasSocialMedia"
            label="Bisnis saya memiliki akun media sosial aktif"
          />
          
          {form.watch("hasSocialMedia") && <SocialMediaPlatforms />}
          
          <CheckboxItem
            name="hasWebsite"
            label="Bisnis saya memiliki website"
          />
          
          {form.watch("hasWebsite") && <WebsiteUrlInput />}
          
          <CheckboxItem
            name="hasDigitalAds"
            label="Bisnis saya menggunakan iklan digital (Google Ads, Facebook Ads, dll)"
          />
        </div>
        
        <div className="pt-4 flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrev}
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            <ArrowLeft size={16} className="mr-2" /> Kembali
          </Button>
          <Button 
            type="submit" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Lanjut <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DigitalPresenceForm;
