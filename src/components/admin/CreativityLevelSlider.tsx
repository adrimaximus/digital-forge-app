
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface CreativityLevelSliderProps {
  creativityLevel: number;
  onCreativityLevelChange: (value: number) => void;
}

const CreativityLevelSlider: React.FC<CreativityLevelSliderProps> = ({
  creativityLevel,
  onCreativityLevelChange,
}) => {
  return (
    <div>
      <Label>Tingkat Kreativitas</Label>
      <div className="flex items-center space-x-4 mt-2">
        <span className="text-sm text-slate-400">Faktual</span>
        <Slider 
          className="flex-1" 
          defaultValue={[creativityLevel]} 
          max={1} 
          step={0.1}
          onValueChange={(value) => onCreativityLevelChange(value[0])}
        />
        <span className="text-sm text-slate-400">Kreatif</span>
        <span className="text-sm font-medium bg-slate-700 px-2 py-1 rounded w-12 text-center">
          {Math.round(creativityLevel * 10)}
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-1">
        Sesuaikan keseimbangan antara respons yang faktual dengan respons yang lebih kreatif.
      </p>
    </div>
  );
};

export default CreativityLevelSlider;
