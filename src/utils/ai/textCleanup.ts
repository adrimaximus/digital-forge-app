
/**
 * Text cleanup utilities for ensuring high quality text display
 */

/**
 * Cleans up Indonesian text from common AI generation issues
 * @param text The text to clean up
 * @returns Cleaned text
 */
export const cleanupIndonesianText = (text: string): string => {
  if (!text || typeof text !== 'string') return "";
  
  let correctedText = text;
  
  // Perbaiki kapitalisasi di awal teks
  if (/^[a-z]/.test(correctedText)) {
    correctedText = correctedText.charAt(0).toUpperCase() + correctedText.slice(1);
  }
  
  // Perbaiki pola umum karakter pertama yang hilang
  correctedText = correctedText
    // Perbaiki kapitalisasi yang hilang di awal teks
    .replace(/^([a-z])/, (match) => match.toUpperCase())
    // Perbaiki kata-kata yang terpotong umum
    .replace(/\bperkemba\b/g, "perkembangan")
    .replace(/\bteknolo\b/g, "teknologi")
    .replace(/\bbisin\b/g, "bisnis")
    .replace(/\bbsnis\b/g, "bisnis")
    
    // Perbaiki spasi di sekitar tanda baca
    .replace(/([.,!?])([A-Z])/g, "$1 $2")
    .replace(/\s+([.,!?])/g, "$1")
    .replace(/([.,!?])\s+([a-z])/g, (match, p1, p2) => p1 + " " + p2.toUpperCase());
  
  // Pastikan paragraf dimulai dengan huruf kapital
  correctedText = correctedText.replace(/(\n|\r\n)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
  
  // Perbaiki masalah umum karakter ganda
  correctedText = correctedText
    .replace(/([a-z])\1{2,}/gi, "$1$1") // Ganti 3+ huruf yang sama dengan 2
    .replace(/bisniss/gi, "bisnis")
    .replace(/onliine/gi, "online")
    .replace(/digiital/gi, "digital")
    .replace(/websitte/gi, "website")
    .replace(/mediaa/gi, "media")
    .replace(/sosiial/gi, "sosial")
    .replace(/karyawaan/gi, "karyawan");
  
  return correctedText;
};

/**
 * Normalizes line breaks in text to ensure consistent display across platforms
 * @param text The text to normalize
 * @returns Text with normalized line breaks
 */
export const normalizeLineBreaks = (text: string): string => {
  if (!text || typeof text !== 'string') return "";
  
  // Ganti line break gaya Windows dengan gaya Unix
  let normalizedText = text.replace(/\r\n/g, "\n");
  
  // Pastikan paragraf memiliki spasi yang tepat (line break ganda)
  normalizedText = normalizedText
    // Ganti line break tiga kali atau lebih dengan line break ganda
    .replace(/\n{3,}/g, "\n\n")
    // Pastikan tidak ada spasi ekstra di akhir baris
    .replace(/[ \t]+\n/g, "\n")
    // Pastikan tidak ada trailing/leading whitespace
    .trim();
  
  // Pastikan ada spasi yang cukup antar paragraf untuk keterbacaan
  if (!normalizedText.includes("\n\n")) {
    normalizedText = normalizedText.replace(/\n/g, "\n\n");
  }
  
  return normalizedText;
};

/**
 * Force display of text by ensuring it has proper formatting
 * @param text The text to force display
 * @returns Processed text ready for display
 */
export const forceTextDisplay = (text: string): string => {
  if (!text || typeof text !== 'string') return "";
  
  // Tambahkan whitespace non-breaking di awal untuk memastikan teks terlihat
  let displayText = "\u00A0" + text;
  
  // Pastikan teks memiliki setidaknya satu karakter yang terlihat
  if (displayText.trim().length === 0) {
    displayText = "Analisis belum tersedia.";
  }
  
  return displayText;
};
