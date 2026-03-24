
import React from 'react';
import { 
  FormField, 
  FormItem,
  FormMessage 
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { BusinessChallengesData } from '../BusinessChallengesForm';
import ChallengeItem from './ChallengeItem';

// Define the challenge options
export const BUSINESS_CHALLENGES = [
  { id: "visibilitas_online", label: "Visibilitas bisnis secara online" },
  { id: "komunikasi_pelanggan", label: "Komunikasi dengan pelanggan" },
  { id: "pengelolaan_data", label: "Pengelolaan data bisnis" },
  { id: "otomatisasi", label: "Otomatisasi proses bisnis" },
  { id: "branding", label: "Pengembangan merek dan identitas" }
];

const ChallengesList: React.FC = () => {
  const form = useFormContext<BusinessChallengesData>();
  
  return (
    <FormField
      control={form.control}
      name="challenges"
      render={() => (
        <FormItem>
          <div className="space-y-3">
            {BUSINESS_CHALLENGES.map((challenge) => (
              <ChallengeItem
                key={challenge.id}
                id={challenge.id}
                label={challenge.label}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ChallengesList;
