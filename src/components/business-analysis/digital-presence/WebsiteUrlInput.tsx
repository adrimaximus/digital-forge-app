
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { DigitalPresenceData } from '../DigitalPresenceForm';

const WebsiteUrlInput: React.FC = () => {
  const form = useFormContext<DigitalPresenceData>();
  
  return (
    <FormField
      control={form.control}
      name="websiteUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">URL Website</FormLabel>
          <FormControl>
            <Input 
              placeholder="https://www.nama-website.com" 
              className="bg-slate-700 border-slate-600 text-white"
              {...field} 
              value={field.value || ''}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WebsiteUrlInput;
