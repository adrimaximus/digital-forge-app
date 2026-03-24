
import React from 'react';
import TextDisplay from './ai-analysis/TextDisplay';
import { BusinessData } from '@/utils/ai/types';

interface FinalAnalysisBlockProps {
  businessData: BusinessData;
  aiAnalysisResult: string;
  isAnalyzing: boolean;
  recommendedServices?: string[];
}

const FinalAnalysisBlock: React.FC<FinalAnalysisBlockProps> = ({ 
  businessData,
  aiAnalysisResult, 
  isAnalyzing,
  recommendedServices
}) => {
  // Use the full analysis text directly without typing effect
  const textToDisplay = aiAnalysisResult || "";
  
  return (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
      <TextDisplay 
        text={isAnalyzing ? "" : textToDisplay}
        isLoading={isAnalyzing} 
        isTyping={false} // Always set to false to disable typing effect
        businessData={businessData}
        recommendedServices={recommendedServices}
      />
    </div>
  );
};

export default FinalAnalysisBlock;
