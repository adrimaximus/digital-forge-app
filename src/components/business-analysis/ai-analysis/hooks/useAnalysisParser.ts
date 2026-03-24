
import { useEffect, useState } from 'react';

interface AnalysisParseResult {
  parsedText: string;
  paragraphs: string[];
  challengeInsights: string | null;
  serviceRecommendationsConclusion: string | null;
  parseError: string | null;
}

export const useAnalysisParser = (text: string): AnalysisParseResult => {
  const [result, setResult] = useState<AnalysisParseResult>({
    parsedText: "",
    paragraphs: [],
    challengeInsights: null,
    serviceRecommendationsConclusion: null,
    parseError: null
  });

  useEffect(() => {
    // If there's no text, return initial state
    if (!text || text.trim() === '') {
      setResult({
        parsedText: "",
        paragraphs: [],
        challengeInsights: null,
        serviceRecommendationsConclusion: null,
        parseError: null
      });
      return;
    }

    console.log("Parsing text for insights:", text.substring(0, 50) + (text.length > 50 ? "..." : ""));

    // Process parsing
    try {
      // Normalize text with various line break types
      const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      
      // Split based on empty lines or line breaks
      const paragraphsList = normalizedText
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p !== '');

      // Find challenge insights and conclusion with a more comprehensive approach
      let challengeText: string | null = null;
      let conclusionText: string | null = null;

      // Find paragraphs containing challenge insights - more complete approach
      for (const paragraph of paragraphsList) {
        const lowerParagraph = paragraph.toLowerCase();
        // Look for challenge insights with various possible formats
        if (
          lowerParagraph.includes("insight tantangan bisnis") || 
          lowerParagraph.includes("insight tantangan") || 
          lowerParagraph.includes("insight bisnis") ||
          (lowerParagraph.includes("insight") && lowerParagraph.includes("tantangan"))
        ) {
          challengeText = paragraph;
          console.log("Found challenge insights in paragraph:", challengeText.substring(0, 50) + "...");
          break;
        }
      }
      
      // Find paragraphs containing conclusion with various possible formats
      for (const paragraph of paragraphsList) {
        const lowerParagraph = paragraph.toLowerCase();
        if (
          lowerParagraph.includes("kesimpulan singkat") || 
          lowerParagraph.includes("kesimpulan layanan") || 
          lowerParagraph.includes("rekomendasi layanan") ||
          (lowerParagraph.includes("kesimpulan") && lowerParagraph.includes("betterworks"))
        ) {
          conclusionText = paragraph;
          console.log("Found service recommendations in paragraph:", conclusionText.substring(0, 50) + "...");
          break;
        }
      }

      // Update state
      setResult({
        parsedText: text, // Store the original text
        paragraphs: paragraphsList,
        challengeInsights: challengeText,
        serviceRecommendationsConclusion: conclusionText,
        parseError: null
      });
      
      console.log("Analysis parse result:", {
        paragraphsCount: paragraphsList.length, 
        hasInsights: !!challengeText, 
        hasConclusion: !!conclusionText
      });
      
    } catch (error) {
      console.error("Error parsing analysis text:", error);
      // Fallback to original text if an error occurs
      setResult({
        parsedText: text,
        paragraphs: [text],
        challengeInsights: null,
        serviceRecommendationsConclusion: null,
        parseError: error instanceof Error ? error.message : "Error parsing analysis text"
      });
    }
  }, [text]);

  return result;
};
