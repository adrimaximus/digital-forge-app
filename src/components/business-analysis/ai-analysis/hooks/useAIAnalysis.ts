import { useState, useRef, useEffect } from 'react';
import { analyzeBusinessWithGoogleAI } from '@/utils/ai/services/businessAnalysisService';
import { BusinessData } from '@/utils/ai/types';
import { updateLeadStats } from '@/utils/leadTracker';
import { cleanupIndonesianText, normalizeLineBreaks } from '@/utils/ai/textCleanup';
import { useToast } from '@/hooks/use-toast';

interface UseAIAnalysisProps {
  businessData: BusinessData;
  aiResult?: string;
  isLoading?: boolean;
}

interface UseAIAnalysisReturn {
  aiAnalysis: string;
  displayedText: string;
  isTyping: boolean;
  error: boolean;
  retrying: boolean;
  analysisComplete: boolean;
  handleRetry: () => Promise<void>;
}

export const useAIAnalysis = ({ 
  businessData, 
  aiResult, 
  isLoading = false 
}: UseAIAnalysisProps): UseAIAnalysisReturn => {
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [retrying, setRetrying] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const hasUpdatedLeadStats = useRef<boolean>(false);
  const hasInitiatedAnalysis = useRef<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!aiAnalysis) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }
    
    setIsTyping(true);
    setDisplayedText("");
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < aiAnalysis.length) {
        setDisplayedText(prev => prev + aiAnalysis.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        if (!error && !aiAnalysis.includes("Maaf, analisis tidak dapat dihasilkan") && !hasUpdatedLeadStats.current) {
          updateLeadStats('business-analysis');
          hasUpdatedLeadStats.current = true;
          setAnalysisComplete(true);
          
          toast({
            title: "Analisis selesai",
            description: "Analisis AI telah berhasil dibuat",
            variant: "default",
          });
        }
      }
    }, 5);
    
    return () => clearInterval(typingInterval);
  }, [aiAnalysis, error, toast]);

  useEffect(() => {
    if (aiResult) {
      console.log("Received aiResult:", aiResult.substring(0, 100) + (aiResult.length > 100 ? "..." : ""));
      
      const hasInsightTag = aiResult.includes("INSIGHT TANTANGAN:");
      console.log("Result contains insight tag:", hasInsightTag);
      
      if (aiResult.includes("Maaf, analisis tidak dapat dihasilkan")) {
        setError(true);
        setAnalysisComplete(false);
      } else {
        setError(false);
        setAnalysisComplete(false);
        hasUpdatedLeadStats.current = false;
      }

      const cleanedResult = normalizeLineBreaks(cleanupIndonesianText(aiResult));
      
      setAiAnalysis(cleanedResult);
      
      hasInitiatedAnalysis.current = true;
    }
  }, [aiResult]);

  useEffect(() => {
    console.log("AIAnalysis effect - checking if should auto-initiate", {
      businessDataLength: Object.keys(businessData).length,
      aiAnalysis: aiAnalysis ? "exists" : "empty",
      aiResult: aiResult ? "exists" : "empty",
      isLoading,
      retrying,
      hasInitiatedAnalysis: hasInitiatedAnalysis.current
    });
    
    const shouldInitiateAnalysis = Object.keys(businessData).length > 0 && 
                                   !aiAnalysis && 
                                   !aiResult &&
                                   !isLoading && 
                                   !retrying && 
                                   !hasInitiatedAnalysis.current;
    
    if (shouldInitiateAnalysis) {
      console.log("Auto-initiating analysis with business data:", businessData);
      handleRetry();
      hasInitiatedAnalysis.current = true;
    }
  }, [businessData, aiAnalysis, aiResult, isLoading, retrying]);

  const handleRetry = async () => {
    if (Object.keys(businessData).length > 0) {
      console.log("Starting analysis retry with challenges:", businessData.challenges);
      setError(false);
      setAiAnalysis("");
      setRetrying(true);
      hasUpdatedLeadStats.current = false;
      
      try {
        console.log("Analyzing business data:", businessData);
        
        const analysisText = await analyzeBusinessWithGoogleAI(businessData);
        console.log("Analysis result received:", analysisText.substring(0, 100) + (analysisText.length > 100 ? "..." : ""));
        
        if (analysisText.includes("Maaf, analisis tidak dapat dihasilkan")) {
          setError(true);
          setAiAnalysis(analysisText);
          return;
        }
        
        const cleanedResult = normalizeLineBreaks(cleanupIndonesianText(analysisText));
        
        setAiAnalysis(cleanedResult);
      } catch (error) {
        console.error("Error in AI analysis:", error);
        setAiAnalysis("Terjadi kesalahan dalam menganalisis data bisnis Anda. Silakan coba lagi nanti.");
        setError(true);
      } finally {
        setRetrying(false);
        console.log("Analysis retry completed");
      }
    } else {
      console.warn("Cannot retry analysis - no business data available");
    }
  };

  return {
    aiAnalysis,
    displayedText,
    isTyping,
    error,
    retrying,
    analysisComplete,
    handleRetry
  };
};
