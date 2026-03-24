
import jsPDF from 'jspdf';
import { pdfColors } from './pdfColors';
import { addHeader } from './pdfSections/header';
import { addFooter } from './pdfSections/footer';
import { addSection } from './pdfSections/section';
import { addKeyValueList } from './pdfSections/keyValueList';
import { addBulletList } from './pdfSections/bulletList';
import { addMultilineText } from './pdfSections/multilineText';
import { addRecommendations } from './pdfSections/recommendations';
import { extendJsPDFWithAlignment } from './pdfUtils/textAlignment';
import { checkAndAddPage as checkPageUtility } from './pdfUtils/pageUtils';
import { processConclusionBlock } from './pdfSections/textBlocks/conclusionBlock';

/**
 * PDF Generator class that handles all PDF creation logic with professional design
 */
export class PdfGenerator {
  doc: jsPDF;
  currentY: number;
  pageWidth: number;
  margin: number;
  contentWidth: number;
  maxContentWidth: number; // Added max content width for better readability
  colors: typeof pdfColors;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight: number;
  storedConclusion: string;
  
  constructor() {
    // Create new PDF with standard options
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Explicitly load and set Roboto font
    this.doc.setFont('Roboto', 'normal');
    
    this.currentY = 0;
    this.pageWidth = 210; // A4 width in mm
    this.margin = 20; // Standard margin for print (2cm)
    this.contentWidth = this.pageWidth - (2 * this.margin);
    this.maxContentWidth = Math.min(this.contentWidth, 160); // Limit width for better readability
    this.colors = pdfColors;
    this.textAlign = 'left'; // Default text alignment set to left for better readability
    this.lineHeight = 1.2; // Balanced line spacing for readability
    this.storedConclusion = ""; // To store conclusion for final page
    
    // Set default text color
    this.doc.setTextColor(this.colors.dark);
    
    // Set default font size
    this.doc.setFontSize(10);
    
    // Initialize our text alignment utility
    this.extendJsPDF();
  }
  
  /**
   * Set text alignment for subsequent text operations
   */
  setTextAlign(align: 'left' | 'center' | 'right' | 'justify') {
    this.textAlign = align;
  }
  
  /**
   * Store conclusion block for final page
   */
  storeConclusionBlock(conclusion: string): void {
    this.storedConclusion = conclusion;
  }
  
  /**
   * Extend jsPDF with text alignment functionality
   */
  extendJsPDF(): void {
    extendJsPDFWithAlignment(this);
  }
  
  /**
   * Add logo and header to the document with improved styling
   */
  addHeader(title: string, subtitle: string): void {
    addHeader(this, title, subtitle);
  }
  
  /**
   * Add a section with styled title
   */
  addSection(title: string): void {
    addSection(this, title);
  }
  
  /**
   * Add key-value pairs as list items with improved styling
   */
  addKeyValueList(items: Array<{ label: string; value: string | boolean | undefined }>): void {
    addKeyValueList(this, items);
  }
  
  /**
   * Add bullet-point list with icons
   */
  addBulletList(items: string[]): void {
    addBulletList(this, items);
  }
  
  /**
   * Add multiline text with word wrapping and formatting
   */
  addMultilineText(text: string): void {
    addMultilineText(this, text);
  }
  
  /**
   * Add recommendations section with special styling
   * Now also processes the conclusion block on the same page
   */
  addRecommendations(recommendations: string[]): void {
    // First process conclusion block which will create a new page
    if (this.storedConclusion) {
      processConclusionBlock(this, this.storedConclusion);
    } else {
      // If no conclusion, still start on a new page
      this.doc.addPage();
      this.currentY = 25;
    }
    
    // Then add recommendations on the same page
    addRecommendations(this, recommendations);
  }
  
  /**
   * Check if need to add new page
   */
  checkAndAddPage(): void {
    checkPageUtility(this);
  }
  
  /**
   * Add footer to all pages
   */
  addFooter(): void {
    addFooter(this);
  }
  
  /**
   * Save the PDF document with the given filename
   */
  savePdf(filename: string): void {
    console.log("Saving PDF with filename:", filename);
    this.doc.save(filename);
  }
}
