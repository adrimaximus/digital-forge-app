
import { PdfGenerator } from '../pdfGenerator';
import { processStandardParagraphs } from './textBlocks/standardParagraph';
import { extractTextBlocks } from './textBlocks/textParser';

/**
 * Process multiline text with consistent formatting
 * Updated to use left alignment and proper paragraph handling for better readability
 */
export function addMultilineText(pdf: PdfGenerator, text: string): void {
  // Add a page break for the analysis section
  pdf.doc.addPage();
  pdf.currentY = 25; // Reset to top margin
  
  // Add section header for analysis
  pdf.addSection('Hasil Analisis AI');
  
  // Parse the text to extract different blocks
  const { 
    standardParagraphs,
    insightBlock, 
    conclusionBlock 
  } = extractTextBlocks(text);
  
  // Combine all standard paragraphs
  const allParagraphs = [...standardParagraphs];
  
  // Add insight blocks as regular paragraphs if they exist
  if (insightBlock) {
    allParagraphs.push(insightBlock);
  }
  
  // Set left alignment for better readability
  pdf.setTextAlign('left');
  
  // Process all paragraphs with the standard formatting for page 2
  // This will now format paragraphs with proper spacing and alignment
  processStandardParagraphs(pdf, allParagraphs);
  
  // Store the conclusion for the last page
  pdf.storeConclusionBlock(conclusionBlock || "");
}
