
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import ChallengesList from './business-challenges/ChallengesList';
import OtherChallengeInput from './business-challenges/OtherChallengeInput';

const businessChallengesSchema = z.object({
  challenges: z.array(z.string()).min(1, { message: 'Pilih minimal satu tantangan' }),
  otherChallenge: z.string().optional(),
});

export type BusinessChallengesData = z.infer<typeof businessChallengesSchema>;

interface BusinessChallengesFormProps {
  defaultValues: Partial<BusinessChallengesData>;
  onNext: (data: BusinessChallengesData) => void;
  onPrev: () => void;
}

const BusinessChallengesForm: React.FC<BusinessChallengesFormProps> = ({ defaultValues, onNext, onPrev }) => {
  const form = useForm<BusinessChallengesData>({
    resolver: zodResolver(businessChallengesSchema),
    defaultValues,
  });

  // Log selected challenges when they change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'challenges' || name === 'otherChallenge') {
        console.log("Selected challenges updated:", value.challenges);
        console.log("Other challenge:", value.otherChallenge);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = (data: BusinessChallengesData) => {
    console.log("Submitting business challenges:", data);
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Tantangan Bisnis</h3>
          <p className="text-slate-300 text-sm">Pilih tantangan bisnis yang Anda hadapi saat ini:</p>
          
          <ChallengesList />
          <OtherChallengeInput />
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
            Lanjutkan <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessChallengesForm;
