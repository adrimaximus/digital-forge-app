
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FormField, 
  FormItem, 
  FormControl, 
  FormLabel 
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { DigitalPresenceData } from '../DigitalPresenceForm';

interface CheckboxItemProps {
  name: keyof DigitalPresenceData;
  label: string;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ name, label }) => {
  const form = useFormContext<DigitalPresenceData>();
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-600 p-4">
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-white">
              {label}
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CheckboxItem;
