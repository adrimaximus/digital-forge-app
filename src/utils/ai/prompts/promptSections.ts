/**
 * Prompt section builders
 * Creates individual sections for the AI prompt
 */

import { BusinessData } from '../types';
import { getChallengeDescription, getPrimaryChallengeText, getChallengeLabel } from './businessChallenges';
import { generateRecommendedServices, getServiceRecommendationReason } from './serviceRecommendations';

// Create business info section
export const createBusinessInfoSection = (businessData: BusinessData): string => {
  const {
    businessName,
    productType,
    numberOfEmployees,
    location,
    hasSocialMedia,
    socialMediaPlatforms,
    hasWebsite,
    websiteUrl,
    hasDigitalAds
  } = businessData;

  return `
    Data bisnis yang perlu dianalisis dengan detail:
    - Nama Bisnis: ${businessName || "Tidak disebutkan"}
    - Jenis produk/layanan: ${productType || "Tidak disebutkan"}
    - Jumlah karyawan: ${numberOfEmployees || "Tidak disebutkan"}
    - Lokasi: ${location || "Tidak disebutkan"}
    - Media sosial: ${hasSocialMedia ? "Ya" : "Tidak"}
    ${hasSocialMedia && socialMediaPlatforms?.length > 0 ? 
      `- Platform media sosial yang digunakan: ${socialMediaPlatforms?.join(", ")}` : 
      hasSocialMedia ? "- Belum menggunakan platform media sosial spesifik" : ""}
    - Website: ${hasWebsite ? "Ya" : "Tidak"}
    ${hasWebsite && websiteUrl ? `- URL website: ${websiteUrl}` : ""}
    - Iklan digital: ${hasDigitalAds ? "Ya" : "Tidak"}
  `;
};

// Create business challenges section
export const createChallengesSection = (businessData: BusinessData): string => {
  const { challenges, otherChallenge } = businessData;
  
  const challengeDescriptions = challenges?.map(challenge => 
    getChallengeDescription(challenge)).join("\n    ") || "- Tidak ada tantangan spesifik yang disebutkan";

  return `
    Tantangan bisnis utama yang dihadapi:
    ${challengeDescriptions}
    ${otherChallenge ? `- Tantangan lainnya: ${otherChallenge}` : ""}
  `;
};

// Create analysis instructions section
export const createAnalysisInstructionsSection = (businessData: BusinessData): string => {
  const { businessName, productType, location, numberOfEmployees } = businessData;
  
  return `
    Petunjuk khusus:
    1. Buat analisis yang SANGAT SPESIFIK untuk bisnis "${businessName || "tersebut"}" berdasarkan DATA YANG DISEBUTKAN DI ATAS, bukan generalisasi umum.
    2. Fokus pada "${productType || "jenis bisnis tersebut"}" di "${location || "lokasi bisnis"}" dengan ${numberOfEmployees || "jumlah karyawan tersebut"}.
    3. Berikan solusi SPESIFIK dan KONKRET untuk SETIAP tantangan yang disebutkan oleh bisnis ini.
    4. SELALU ULANGI nama bisnis "${businessName || "tersebut"}" minimal 3 kali dalam analisis Anda.
    5. SELALU SEBUTKAN jenis produk "${productType || "tersebut"}" minimal 2 kali dalam analisis Anda.
    6. SELALU SEBUTKAN lokasi "${location || "tersebut"}" dan implikasinya untuk bisnis ini.
    7. SELALU GUNAKAN data jumlah karyawan "${numberOfEmployees || "tersebut"}" sebagai faktor dalam analisis.
  `;
};

// Create content structure section
export const createContentStructureSection = (businessData: BusinessData): string => {
  const { 
    businessName, 
    productType, 
    location, 
    hasSocialMedia,
    socialMediaPlatforms,
    hasWebsite, 
    hasDigitalAds,
    challenges,
    otherChallenge
  } = businessData;
  
  // Format challenges in readable format
  const formattedChallenges = challenges?.map(challenge => getChallengeLabel(challenge)).join(", ") || "Tidak ada";
  
  // Extract primary challenge for focused insight
  const primaryChallenge = challenges?.length > 0 ? challenges[0] : null;
  const primaryChallengeText = getPrimaryChallengeText(primaryChallenge);
  
  // Additional challenge context from other challenge field
  const additionalChallengeContext = otherChallenge ? 
    `dengan tantangan tambahan: "${otherChallenge}"` : "";
  
  // Get service recommendations with reasons
  const topRecommendedServices = generateRecommendedServices(businessData);
  const servicesWithReasons = topRecommendedServices.map(service => 
    getServiceRecommendationReason(service)).join("\n      ");

  return `
    Format analisis dengan STRUKTUR YANG JELAS berikut:
    
    PARAGRAF 1:
    Mulai dengan menyebutkan nama bisnis "${businessName || "tersebut"}" dan analisis khusus untuk jenis produk "${productType || "tersebut"}" di lokasi "${location || "tersebut"}". Masukkan statistik spesifik, jumlah karyawan, dan identifikasi keunggulan khusus berdasarkan data yang diberikan.
    
    PARAGRAF 2:
    Analisis SPESIFIK tentang kehadiran online bisnis "${businessName || "tersebut"}" - ${hasSocialMedia ? 'sudah menggunakan media sosial' + (socialMediaPlatforms?.length > 0 ? ' seperti ' + socialMediaPlatforms.join(", ") : '') : 'belum menggunakan media sosial'}, ${hasWebsite ? 'memiliki website' : 'belum memiliki website'}, ${hasDigitalAds ? 'sudah beriklan online' : 'belum beriklan online'}. Berikan statistik terkini tentang pentingnya kehadiran online untuk bisnis "${productType || "jenis ini"}" di "${location || "lokasi tersebut"}".
    
    INSIGHT TANTANGAN BISNIS:
    Berikan analisis mendalam tentang bagaimana mengatasi tantangan "${primaryChallengeText || "bisnis"}" untuk bisnis "${businessName || "tersebut"}" ${additionalChallengeContext}. Berikan solusi langkah-demi-langkah yang praktis dan dapat diterapkan segera. Tuliskan dengan format "Insight Tantangan Bisnis" (tanpa tanda titik dua dan tanpa kapital semua).
    
    PARAGRAF 3:
    Analisis SPESIFIK tentang potensi pertumbuhan dan rekomendasi strategi berdasarkan tantangan yang dihadapi bisnis "${businessName || "tersebut"}". Gunakan minimal 2 angka persentase spesifik. Hindari frasa klise dan berikan strategi unik yang relevan dengan tantangan ${formattedChallenges || "bisnis"}.
    
    KESIMPULAN SINGKAT:
    Berikan kesimpulan singkat tentang bagaimana layanan betterworks.id berikut akan membantu bisnis "${businessName || "tersebut"}" mengatasi tantangan mereka dan berkembang di "${location || "lokasi tersebut"}":
      ${servicesWithReasons}
    
    Tuliskan dengan format "Kesimpulan Singkat" (tanpa tanda titik dua dan tanpa kapital semua).
    
    PENTING:
    - JANGAN gunakan format [PARAGRAF 1], [PARAGRAF 2], dll. Langsung tulis paragraf tanpa label seperti itu.
    - Gunakan angka/persentase SPESIFIK terkait industri "${productType || "tersebut"}" di Indonesia/daerah "${location || "lokasi tersebut"}"
    - Hindari frasa klise seperti "di era digital ini", "di jaman modern"
    - SELALU gunakan nama bisnis "${businessName || "tersebut"}" berulang kali dalam analisis
    - PASTIKAN gunakan tag "Insight Tantangan Bisnis" dan "Kesimpulan Singkat" TANPA TITIK DUA dan TANPA KAPITAL SEMUA
    - Berikan minimal satu strategi unik yang relevan dengan SETIAP tantangan yang disebutkan oleh bisnis ini
    - Tantangan bisnis yang disebutkan adalah: ${formattedChallenges || "Tidak ada"} ${otherChallenge ? `dan ${otherChallenge}` : ""}
  `;
};
