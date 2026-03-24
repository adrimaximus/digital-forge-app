
/**
 * Business Analysis Service using Google AI
 * Handles business analysis operations using Google AI
 */

import { callGoogleAI } from '../clients/googleAIClient';
import { buildBusinessAnalysisPrompt } from '../promptBuilder';
import { BusinessData } from '../types';

export const analyzeBusinessWithGoogleAI = async (businessData: BusinessData): Promise<string> => {
  try {
    console.info("Starting Google AI analysis with complete data:", businessData);
    
    // Get custom prompt template from localStorage, if available
    let promptTemplate = '';
    let creativityLevel = 0.7; // Default creativity level
    
    try {
      const savedSettings = localStorage.getItem('promptSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        promptTemplate = settings.promptTemplate;
        creativityLevel = settings.creativityLevel || 0.7;
        console.info("Retrieved prompt settings:", settings);
      }
    } catch (error) {
      console.error("Error retrieving prompt settings:", error);
    }
    
    // Build the prompt based on the business data
    const customPrompt = buildBusinessAnalysisPrompt(businessData);
    console.info("Generated prompt using custom template");
    
    // Use the creativity level from settings
    console.info("Using creativity level:", creativityLevel);
    
    // Make the API call to Google AI
    const response = await callGoogleAI(customPrompt, creativityLevel);
    
    return response;
  } catch (error) {
    console.error("Error analyzing business with Google AI:", error);
    return "Maaf, analisis tidak dapat dihasilkan saat ini. Silakan coba lagi nanti.";
  }
};
