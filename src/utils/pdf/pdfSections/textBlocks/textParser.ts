
/**
 * Utility functions for parsing text content in PDF generation
 * Updated to process text as simple paragraphs
 */

/**
 * Extract different types of text blocks from a single text string
 */
export function extractTextBlocks(text: string): {
  standardParagraphs: string[];
  insightBlock: string | null;
  conclusionBlock: string | null;
} {
  // Split text into paragraphs based on double newlines or standard paragraph breaks
  const paragraphs = text.split(/\n\s*\n|\r\n\s*\r\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // Use the existing sortParagraphs function to categorize the paragraphs
  return sortParagraphs(paragraphs);
}

/**
 * Sort paragraphs into different types for structured display
 * Updated to simplify with just standard paragraphs and conclusion
 */
export function sortParagraphs(paragraphs: string[]): {
  standardParagraphs: string[];
  insightBlock: string | null;
  conclusionBlock: string | null;
} {
  let insightBlock: string | null = null;
  let conclusionBlock: string | null = null;
  const standardParagraphs: string[] = [];

  paragraphs.forEach(paragraph => {
    // Clean paragraph labels first
    const cleanedParagraph = cleanupParagraphLabels(paragraph);
    
    // Skip empty paragraphs
    if (!cleanedParagraph.trim()) return;
    
    // Extract conclusion paragraph (only the last recommendation paragraph)
    if (
      cleanedParagraph.toLowerCase().includes("kesimpulan singkat") ||
      cleanedParagraph.toLowerCase().includes("untuk mengakselerasi pertumbuhan") ||
      cleanedParagraph.toLowerCase().includes("kami merekomendasikan") ||
      cleanedParagraph.toLowerCase().includes("rekomendasi layanan")
    ) {
      conclusionBlock = cleanedParagraph;
      return;
    }
    
    // Extract insight block
    if (
      cleanedParagraph.toLowerCase().includes("insight tantangan bisnis") ||
      cleanedParagraph.toLowerCase().includes("insight tantangan") ||
      (cleanedParagraph.toLowerCase().includes("insight") && cleanedParagraph.toLowerCase().includes("tantangan"))
    ) {
      insightBlock = cleanedParagraph;
      return;
    }
    
    // All other paragraphs are treated as standard
    standardParagraphs.push(cleanedParagraph);
  });

  return {
    standardParagraphs,
    insightBlock,
    conclusionBlock
  };
}

/**
 * Clean paragraph labels like [PARAGRAF 1], [PARAGRAF 2], etc.
 */
function cleanupParagraphLabels(text: string): string {
  if (!text) return '';
  
  // Remove all paragraph labels with different format variations
  return text
    .replace(/\[PARAGRAF \d+\]\s*/gi, "")
    .replace(/\[Paragraf \d+\]\s*/g, "")
    .replace(/Paragraf \d+:\s*/g, "")
    .replace(/\bParagraf \d+\b\s*/g, "");
}
