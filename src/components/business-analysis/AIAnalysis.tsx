
import React from 'react';
import { BusinessData } from '@/utils/ai/types';

import { useAIAnalysis } from './ai-analysis/hooks/useAIAnalysis';
import LoadingIndicator from './ai-analysis/LoadingIndicator';
import TextDisplay from './ai-analysis/TextDisplay';
import AIAnalysisHeader from './ai-analysis/components/AIAnalysisHeader';
import ErrorMessage from './ai-analysis/components/ErrorMessage';

interface AIAnalysisProps {
  businessData: BusinessData;
  aiResult?: string;
  isLoading?: boolean;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ businessData, aiResult, isLoading = false }) => {
  const {
    aiAnalysis,
    displayedText,
    isTyping,
    error,
    retrying,
    analysisComplete,
    handleRetry
  } = useAIAnalysis({ businessData, aiResult, isLoading });

  console.log("AIAnalysis component rendering with:", {
    hasAiResult: !!aiResult,
    aiResultLength: aiResult?.length || 0,
    aiAnalysisLength: aiAnalysis?.length || 0,
    isLoading,
    businessDataKeys: Object.keys(businessData).length,
    challenges: businessData.challenges
  });

  return (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 mb-4">
      <AIAnalysisHeader
        analysisComplete={analysisComplete}
        error={!!error}
        isLoading={isLoading}
        isTyping={isTyping}
        hasAnalysis={!!aiAnalysis}
        onRetry={handleRetry}
        retrying={retrying}
      />
      
      <div className="bg-slate-800 rounded-lg p-4 relative overflow-hidden">
        {/* Only show loading indicator during active loading, not during typing */}
        <LoadingIndicator isVisible={isLoading || retrying} />
        
        <TextDisplay
          text={displayedText}
          isLoading={isLoading || retrying}
          isTyping={isTyping}
          businessData={businessData}
        />

        {error && !isLoading && !retrying && (
          <ErrorMessage errorMessage={typeof error === 'boolean' ? "Terjadi kesalahan. Silakan coba lagi." : error} />
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
