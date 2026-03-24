
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { BusinessChallengesData } from '../BusinessChallengesForm';

const OtherChallengeInput: React.FC = () => {
  const form = useFormContext<BusinessChallengesData>();
  
  return (
    <FormField
      control={form.control}
      name="otherChallenge"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Tantangan lainnya (opsional)</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Ceritakan tantangan lain yang Anda hadapi..." 
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              {...field} 
              value={field.value || ''}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default OtherChallengeInput;
