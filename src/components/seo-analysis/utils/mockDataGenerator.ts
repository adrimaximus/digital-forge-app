
import { FormData } from '../AnalysisForm';

export interface MockData {
  monthlyData: { name: string; value: number }[];
  competitorData: { name: string; value: number }[];
  platformData: { name: string; value: number }[];
  growthRate: number;
  seoScore: number;
  competitionLevel: number;
}

export const generateMockData = (formData: FormData): MockData => {
  // Use hash of keyword to generate consistent but seemingly random data
  const hash = formData.keyword.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const seedValue = Math.abs(hash) % 100;
  
  // Monthly trend data
  const monthlyData = [
    { name: 'Jan', value: seedValue },
    { name: 'Feb', value: seedValue * 0.9 + 10 },
    { name: 'Mar', value: seedValue * 1.1 + 5 },
    { name: 'Apr', value: seedValue * 1.2 + 15 },
    { name: 'Mei', value: seedValue * 1.3 },
    { name: 'Jun', value: seedValue * 1.4 + 8 },
  ];
  
  // Get relevant competitors based on keyword
  const competitors = getRelevantCompetitors(formData.keyword);
  
  // Competitor comparison data with actual competitor names
  const competitorData = [
    { name: 'Anda', value: seedValue * 1.2 },
    { name: competitors[0].name, value: seedValue * (0.7 + Math.random() * 0.6) },
    { name: competitors[1].name, value: seedValue * (0.8 + Math.random() * 0.5) },
    { name: competitors[2].name, value: seedValue * (0.7 + Math.random() * 0.5) },
  ];
  
  // Platform distribution
  const platformData = [
    { name: 'Google', value: seedValue * 0.6 },
    { name: 'Instagram', value: seedValue * 0.9 },
    { name: 'TikTok', value: seedValue * 1.2 },
    { name: 'Facebook', value: seedValue * 0.4 },
  ];
  
  // Generate growth rate (-20 to +40)
  const growthRate = ((hash % 60) - 20);
  
  // Generate SEO score (40-95)
  const seoScore = 40 + (hash % 55);
  
  // Generate competition level (30-90)
  const competitionLevel = 30 + (hash % 60);
  
  return {
    monthlyData,
    competitorData,
    platformData,
    growthRate,
    seoScore,
    competitionLevel
  };
};

interface CompetitorInfo {
  name: string;
  location: string;
  strengthText: string;
}

// Helper function to get relevant competitors based on keyword
const getRelevantCompetitors = (keyword: string): CompetitorInfo[] => {
  // Map of industry keywords to relevant competitors
  const competitorsByIndustry: Record<string, CompetitorInfo[]> = {
    'digital_agency': [
      { name: 'Hakuhodo', location: 'Jakarta', strengthText: 'kampanye kreatif' },
      { name: 'Mirum Agency', location: 'Jakarta', strengthText: 'solusi teknologi' },
      { name: 'Para Digma', location: 'Jakarta', strengthText: 'strategi digital' },
    ],
    'fashion': [
      { name: 'This Is April', location: 'Jakarta', strengthText: 'desain lokal' },
      { name: 'Cotton Ink', location: 'Jakarta', strengthText: 'kualitas material' },
      { name: 'Berrybenka', location: 'Jakarta', strengthText: 'variasi produk' },
    ],
    'food': [
      { name: 'Maicih', location: 'Bandung', strengthText: 'cita rasa pedas' },
      { name: 'Malang Strudel', location: 'Malang', strengthText: 'inovasi rasa' },
      { name: 'Batagor Kingsley', location: 'Bandung', strengthText: 'konsistensi kualitas' },
    ],
    'beauty': [
      { name: 'Wardah', location: 'Jakarta', strengthText: 'halal certified' },
      { name: 'Somethinc', location: 'Jakarta', strengthText: 'formula inovatif' },
      { name: 'Avoskin', location: 'Surabaya', strengthText: 'ingredients fokus' },
    ],
    'furniture': [
      { name: 'Fabelio', location: 'Jakarta', strengthText: 'desain minimalis' },
      { name: 'Livien', location: 'Cirebon', strengthText: 'kayu berkualitas' },
      { name: 'Ifurnholic', location: 'Tangerang', strengthText: 'desain kompak' },
    ],
    'tech': [
      { name: 'Advan', location: 'Jakarta', strengthText: 'harga terjangkau' },
      { name: 'Axioo', location: 'Tangerang', strengthText: 'laptop edukasi' },
      { name: 'Evercoss', location: 'Semarang', strengthText: 'smartphone ekonomis' },
    ],
    'ecommerce': [
      { name: 'Tokopedia', location: 'Jakarta', strengthText: 'jangkauan produk' },
      { name: 'Bukalapak', location: 'Jakarta', strengthText: 'UMKM support' },
      { name: 'Blibli', location: 'Jakarta', strengthText: 'official store' },
    ],
    'marketing': [
      { name: 'Fortune PR', location: 'Jakarta', strengthText: 'media relations' },
      { name: 'Narrada', location: 'Jakarta', strengthText: 'storytelling' },
      { name: 'Activate', location: 'Jakarta', strengthText: 'aktivasi merek' },
    ],
  };
  
  // Determine which industry the keyword belongs to
  const lowercaseKeyword = keyword.toLowerCase();
  let selectedIndustry = 'digital_agency'; // Default industry
  
  if (lowercaseKeyword.includes('digital') || lowercaseKeyword.includes('agensi') || lowercaseKeyword.includes('agency') || lowercaseKeyword.includes('marketing')) {
    selectedIndustry = 'digital_agency';
  } else if (lowercaseKeyword.includes('baju') || lowercaseKeyword.includes('pakaian') || lowercaseKeyword.includes('fashion')) {
    selectedIndustry = 'fashion';
  } else if (lowercaseKeyword.includes('makanan') || lowercaseKeyword.includes('kuliner') || lowercaseKeyword.includes('food')) {
    selectedIndustry = 'food';
  } else if (lowercaseKeyword.includes('kecantikan') || lowercaseKeyword.includes('skincare') || lowercaseKeyword.includes('makeup')) {
    selectedIndustry = 'beauty';
  } else if (lowercaseKeyword.includes('mebel') || lowercaseKeyword.includes('furniture') || lowercaseKeyword.includes('perabot')) {
    selectedIndustry = 'furniture';
  } else if (lowercaseKeyword.includes('teknologi') || lowercaseKeyword.includes('gadget') || lowercaseKeyword.includes('tech')) {
    selectedIndustry = 'tech';
  } else if (lowercaseKeyword.includes('toko online') || lowercaseKeyword.includes('ecommerce') || lowercaseKeyword.includes('marketplace')) {
    selectedIndustry = 'ecommerce';
  }
  
  return competitorsByIndustry[selectedIndustry] || competitorsByIndustry['digital_agency'];
};

