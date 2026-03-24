
/**
 * Prompt builder module
 * Generates prompts for the Google AI API based on business data
 */

import { BusinessData } from './types';
import { 
  createBusinessInfoSection,
  createChallengesSection, 
  createAnalysisInstructionsSection,
  createContentStructureSection
} from './prompts/promptSections';

export const buildBusinessAnalysisPrompt = (businessData: BusinessData): string => {
  // Build each section of the prompt
  const businessInfoSection = createBusinessInfoSection(businessData);
  const challengesSection = createChallengesSection(businessData);
  const instructionsSection = createAnalysisInstructionsSection(businessData);
  const contentStructureSection = createContentStructureSection(businessData);

  // Combine all sections into the final prompt
  return `
    Anda adalah seorang pakar strategi bisnis dengan pengalaman lebih dari 15 tahun membantu berbagai skala usaha.
    
    Tugas Anda: Analisis secara SANGAT SPESIFIK untuk bisnis "${businessData.businessName || "Tidak disebutkan"}" yang bergerak di bidang "${businessData.productType || "Tidak disebutkan"}".
    ${businessInfoSection}
    ${challengesSection}
    ${instructionsSection}
    ${contentStructureSection}
  `;
};
