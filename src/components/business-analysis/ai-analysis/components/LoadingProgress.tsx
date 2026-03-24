
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

interface LoadingProgressProps {
  isLoading: boolean;
  loadingText?: string;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({
  isLoading,
  loadingText = "Analisis sedang dipersiapkan, mohon tunggu..."
}) => {
  const [progress, setProgress] = useState(10);
  
  // Animate the progress bar to simulate work being done
  useEffect(() => {
    if (!isLoading) return;
    
    // Start with lower progress and gradually increase
    setProgress(10);
    
    // Progress animation timeline
    const timer1 = setTimeout(() => setProgress(25), 800);
    const timer2 = setTimeout(() => setProgress(45), 1800);
    const timer3 = setTimeout(() => setProgress(65), 3500);
    const timer4 = setTimeout(() => setProgress(85), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isLoading]);

  if (!isLoading) return null;
  
  return (
    <div className="mt-4 space-y-2">
      <Progress value={progress} className="h-1.5 bg-slate-700" />
      <p className="text-yellow-400 text-sm font-medium mt-2">
        {loadingText}
      </p>
      <p className="text-slate-400 text-xs">
        Kami sedang menyiapkan analisis komprehensif untuk bisnis Anda. Mohon tunggu sebentar...
      </p>
    </div>
  );
};

export default LoadingProgress;
