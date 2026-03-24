
import React from 'react';
import { MessageSquare, BadgeCheck } from 'lucide-react';
import RetryButton from '../RetryButton';

interface AIAnalysisHeaderProps {
  analysisComplete: boolean;
  error: boolean;
  isLoading: boolean;
  isTyping: boolean;
  hasAnalysis: boolean;
  onRetry: () => void;
  retrying: boolean;
}

const AIAnalysisHeader: React.FC<AIAnalysisHeaderProps> = ({
  analysisComplete,
  error,
  isLoading,
  isTyping,
  hasAnalysis,
  onRetry,
  retrying
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <MessageSquare className="h-5 w-5 text-yellow-400 mr-2" />
        <h4 className="font-medium text-white">Analisis Agen AI:</h4>
      </div>
      <div className="flex space-x-2">
        {analysisComplete && !error && !isLoading && !isTyping && (
          <div className="flex items-center text-emerald-400 text-xs">
            <BadgeCheck className="h-4 w-4 mr-1" />
            <span>Analisis selesai</span>
          </div>
        )}
        {(error || !hasAnalysis || (hasAnalysis && hasAnalysis.toString().includes("Maaf, analisis tidak dapat dihasilkan"))) && (
          <RetryButton
            onRetry={onRetry}
            isRetrying={retrying}
            disabled={retrying || isLoading || isTyping}
          />
        )}
      </div>
    </div>
  );
};

export default AIAnalysisHeader;
