
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import AnalysisHeader from './AnalysisHeader';
import EnhancedParagraphs from './EnhancedParagraphs';
import { BusinessData } from '@/utils/ai/types';
import LoadingProgress from './LoadingProgress';

interface ContentDisplayProps {
  text: string;
  isLoading: boolean;
  isTyping: boolean;
  paragraphs: string[];
  challengeInsights: string | null;
  serviceRecommendationsConclusion: string | null;
  businessData?: BusinessData;
  recommendedServices?: string[];
  shouldUseStructuredDisplay?: boolean;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ 
  text,
  isLoading,
  paragraphs,
  challengeInsights,
  serviceRecommendationsConclusion,
  businessData,
  recommendedServices,
  shouldUseStructuredDisplay = false
}) => {
  // Always use the full analysis for rendering structured content
  const fullAnalysis = businessData?.aiAnalysis || text;
  
  // Clean up paragraph labels from the text for non-structured display
  const cleanDisplayText = text?.replace(/\[PARAGRAF \d+\]\s*/gi, "") || "";
  
  // Always show structured view if we have enough content
  const shouldShowStructured = paragraphs.length > 0 && fullAnalysis;
  
  return (
    <ScrollArea className="h-[350px] w-full pr-4">
      {/* Show loading progress when loading */}
      {isLoading && (
        <LoadingProgress 
          isLoading={isLoading} 
          loadingText="Analisis sedang dipersiapkan, mohon tunggu..." 
        />
      )}

      {!isLoading && (
        <div className="space-y-4 text-slate-300">
          {/* Use the structured display when appropriate */}
          {shouldShowStructured ? (
            <>
              <AnalysisHeader 
                businessData={businessData}
                aiAnalysis={fullAnalysis}
                recommendedServices={recommendedServices}
              />
              
              <EnhancedParagraphs
                paragraphs={paragraphs}
                challengeInsights={challengeInsights}
                serviceRecommendationsConclusion={serviceRecommendationsConclusion}
              />
            </>
          ) : (
            /* Otherwise show clean text without paragraph labels */
            <>
              {cleanDisplayText ? (
                <div className="whitespace-pre-line break-words leading-relaxed">
                  {cleanDisplayText}
                </div>
              ) : null}
            </>
          )}
        </div>
      )}
    </ScrollArea>
  );
};

export default ContentDisplay;
