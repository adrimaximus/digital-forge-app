
/**
 * OpenAI API client module (Legacy version)
 * This file is kept for backward compatibility
 * New code should import from src/utils/ai/ instead
 */

// Re-export everything from the new modular structure
export {
  callOpenAI,
  validateAndCorrectIndonesianText
} from './clients/openAIClient';

export {
  getTrendDataFromOpenAI
} from './services/trendService';

export {
  getCompetitorDataFromOpenAI,
  getFallbackCompetitorData
} from './services/competitorService';

export {
  getPlatformDataFromOpenAI
} from './services/platformService';
