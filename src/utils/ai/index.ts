
/**
 * Main export file for AI utilities
 * Re-exports all necessary functions for backward compatibility
 */

// Re-export the OpenAI client functions
export { callOpenAI, validateAndCorrectIndonesianText } from './clients/openAIClient';

// Re-export the service functions
export { getTrendDataFromOpenAI } from './services/trendService';
export { getCompetitorDataFromOpenAI } from './services/competitorService';
export { getPlatformDataFromOpenAI } from './services/platformService';

// Re-export the Google AI service functions
export { analyzeBusinessWithGoogleAI } from './services/businessAnalysisService';
