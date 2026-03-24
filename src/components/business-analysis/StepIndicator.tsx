
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex space-x-3">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStep === i + 1 
                ? 'bg-yellow-400 scale-110' 
                : currentStep > i + 1 
                  ? 'bg-green-500' 
                  : 'bg-slate-600'
            }`}
          ></div>
        ))}
      </div>
      <span className="text-sm text-slate-400">
        {currentStep === 4 ? 'Hasil Analisis' : `Langkah ${currentStep} dari ${totalSteps}`}
      </span>
    </div>
  );
};

export default StepIndicator;
