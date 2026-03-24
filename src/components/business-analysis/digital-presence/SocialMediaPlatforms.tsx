
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { DigitalPresenceData } from '../DigitalPresenceForm';

const PLATFORMS = ["Instagram", "Facebook", "TikTok", "LinkedIn", "Twitter", "YouTube"];

const SocialMediaPlatforms: React.FC = () => {
  const form = useFormContext<DigitalPresenceData>();
  
  return (
    <FormField
      control={form.control}
      name="socialMediaPlatforms"
      render={() => (
        <FormItem>
          <div className="mb-2">
            <FormLabel className="text-sm text-slate-300">
              Platform media sosial yang digunakan:
            </FormLabel>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map((platform) => (
              <FormField
                key={platform}
                control={form.control}
                name="socialMediaPlatforms"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={platform}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(platform)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), platform])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== platform
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-white">
                        {platform}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};

export default SocialMediaPlatforms;
