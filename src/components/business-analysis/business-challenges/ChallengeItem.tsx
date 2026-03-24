
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FormField, 
  FormItem, 
  FormControl, 
  FormLabel 
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { BusinessChallengesData } from '../BusinessChallengesForm';

interface ChallengeItemProps {
  id: string;
  label: string;
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({ id, label }) => {
  const form = useFormContext<BusinessChallengesData>();
  
  return (
    <FormField
      control={form.control}
      name="challenges"
      render={({ field }) => {
        return (
          <FormItem
            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-600 p-3"
          >
            <FormControl>
              <Checkbox
                checked={field.value?.includes(id)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...(field.value || []), id])
                    : field.onChange(
                        field.value?.filter(
                          (value) => value !== id
                        )
                      )
                }}
              />
            </FormControl>
            <FormLabel className="font-normal text-white">
              {label}
            </FormLabel>
          </FormItem>
        )
      }}
    />
  );
};

export default ChallengeItem;
