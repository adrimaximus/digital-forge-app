import React, { useEffect } from 'react';
import { useAnalysisParser } from './hooks/useAnalysisParser';
import ContentDisplay from './components/ContentDisplay';
import TypingIndicator from './components/TypingIndicator';
import ErrorMessage from './components/ErrorMessage';
import { BusinessData } from '@/utils/ai/types';

interface TextDisplayProps {
  text: string;
  isLoading: boolean;
  isTyping: boolean; 
  businessData?: BusinessData;
  recommendedServices?: string[];
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  text,
  isLoading,
  isTyping,
  businessData,
  recommendedServices
}) => {
  const {
    parsedText,
    paragraphs,
    challengeInsights,
    serviceRecommendationsConclusion,
    parseError
  } = useAnalysisParser(text);

  useEffect(() => {
    // This is fine to keep for logging purposes
    if (parsedText) {
      console.log("Parsed analysis text:", parsedText.substring(0, 100) + "...");
    }
  }, [parsedText]);

  // If there's an error, show the error message
  if (parseError && !isLoading) {
    return <ErrorMessage errorMessage={parseError} />;
  }

  return (
    <div className="relative">
      <ContentDisplay
        text={parsedText}
        isLoading={isLoading}
        isTyping={false} 
        paragraphs={paragraphs}
        challengeInsights={challengeInsights}
        serviceRecommendationsConclusion={serviceRecommendationsConclusion}
        businessData={businessData}
        recommendedServices={recommendedServices}
        shouldUseStructuredDisplay={true}
      />
      <TypingIndicator isTyping={isTyping} />
    </div>
  );
};

export default TextDisplay;
