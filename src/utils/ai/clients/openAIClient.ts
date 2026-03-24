
/**
 * OpenAI API client module
 * Handles the communication with OpenAI API
 */

// OpenAI integration for business analysis
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export interface OpenAIRequest {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature?: number;
}

export interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
}

export const callOpenAI = async (prompt: string, creativityLevel: number = 0.3): Promise<string> => {
  try {
    console.log(`Making API request to OpenAI with creativity level: ${creativityLevel}`);
    
    // Ensure temperature is within valid range (0-1)
    const safeTemperature = Math.max(0, Math.min(1, creativityLevel));
    
    const requestBody: OpenAIRequest = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Anda adalah asisten bisnis profesional yang sangat memperhatikan kualitas bahasa Indonesia.

KUALITAS BAHASA:
- SELALU PASTIKAN setiap kata dalam analisis Anda lengkap dan TIDAK TERPOTONG.
- PENTING: Awali SETIAP paragraf dengan huruf kapital.
- HINDARI pengulangan huruf yang tidak perlu (seperti "bisniis", "saat iini", dll).
- PERIKSA KEMBALI bahwa SEMUA kata ditulis dengan benar dan tidak ada huruf yang hilang.
- PASTIKAN setiap kalimat memiliki struktur yang lengkap dan benar secara tata bahasa Indonesia.

FORMAT & KONTEN:
- Berikan analisis yang SANGAT SPESIFIK dalam TEPAT 3 paragraf sesuai data yang diberikan.
- Hindari jawaban generik. Selalu gunakan data dan statistik konkret dari bisnis yang dianalisis.
- Sebutkan nama bisnis, produk, lokasi, dan jumlah karyawan berulang kali dalam analisis.
- Selalu menyebutkan layanan yang direkomendasikan dalam analisis dengan kesimpulan singkat.
- JANGAN GUNAKAN format [PARAGRAF 1], [PARAGRAF 2], dsb. Tulis paragraf secara langsung tanpa label tersebut.

PENTING: 
- Selalu periksa hasil akhir untuk memastikan tidak ada kata yang terpotong atau bermasalah, terutama di awal kalimat atau paragraf.
- Tambahkan minimal 2 sumber referensi di bagian akhir, HARUS BERUPA URL lengkap, bukan placeholder [CITATION]. Contoh: "Sumber: Google Trends Report 2024, https://trends.google.com/trends/"`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: safeTemperature
    };

    console.log("Making API request to OpenAI");
    
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response not OK:", response.status, errorText);
      throw new Error(`API response error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    console.log("Received response from OpenAI");

    if (data.error) {
      console.error("OpenAI error:", data.error.message);
      throw new Error(`OpenAI error: ${data.error.message}`);
    }

    if (data.choices && data.choices[0]?.message?.content) {
      let content = data.choices[0].message.content;
      
      // Additional post-processing to ensure quality
      content = validateAndCorrectIndonesianText(content);
      
      return content;
    } else {
      console.error("Unexpected API response format:", data);
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};

/**
 * Validates and corrects Indonesian text to ensure high quality
 * Fixes common issues with AI-generated Indonesian text
 */
export function validateAndCorrectIndonesianText(text: string): string {
  if (!text) return "";
  
  let correctedText = text;
  
  // Remove paragraph labels [PARAGRAF 1], [PARAGRAF 2], etc.
  correctedText = correctedText.replace(/\[PARAGRAF \d+\]\s*/gi, "");
  
  // Fix capitalization at the beginning of the text
  if (/^[a-z]/.test(correctedText)) {
    correctedText = correctedText.charAt(0).toUpperCase() + correctedText.slice(1);
  }
  
  // Fix common patterns of missing first characters
  correctedText = correctedText
    // Fix missing capitals at beginning of text
    .replace(/^([a-z])/, (match) => match.toUpperCase())
    // Fix missing first letters in specific patterns
    .replace(/^isnis\b/i, "Bisnis")
    .replace(/^alam\b/i, "Dalam")
    .replace(/^erusahaan\b/i, "Perusahaan")
    .replace(/^engan\b/i, "Dengan")
    .replace(/^ari\b/i, "Dari")
    .replace(/^emiliki\b/i, "Memiliki")
    .replace(/^entang\b/i, "Tentang")
    .replace(/^ebagai\b/i, "Sebagai")
    .replace(/^ntuk\b/i, "Untuk")
    .replace(/^elain\b/i, "Selain")
    .replace(/^etiap\b/i, "Setiap")
    .replace(/^elalui\b/i, "Melalui")
    
    // Fix common double letter mistakes
    .replace(/([a-z])\1{2,}/gi, "$1$1")  // Replace 3+ same letters with 2
    .replace(/bisniss/gi, "bisnis")
    .replace(/onliine/gi, "online")
    .replace(/digiital/gi, "digital")
    .replace(/websitte/gi, "website")
    .replace(/mediaa/gi, "media")
    .replace(/sosiial/gi, "sosial")
    .replace(/karyawaan/gi, "karyawan")
    .replace(/produkk/gi, "produk")
    .replace(/layaanan/gi, "layanan")
    .replace(/pelangggan/gi, "pelanggan")
    .replace(/komunnnikasi/gi, "komunikasi")
    
    // Fix common truncated words
    .replace(/\bperkemba\b/g, "perkembangan")
    .replace(/\bteknolo\b/g, "teknologi")
    .replace(/\bbisin\b/g, "bisnis")
    .replace(/\bbsnis\b/g, "bisnis")
    
    // Fix spacing issues around punctuation
    .replace(/([.,!?])([A-Z])/g, "$1 $2")
    .replace(/\s+([.,!?])/g, "$1")
    .replace(/([.,!?])\s+([a-z])/g, (match, p1, p2) => p1 + " " + p2.toUpperCase());
  
  // Ensure paragraph starts with capital letter
  correctedText = correctedText.replace(/(\n|\r\n)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
  
  return correctedText;
}
