
/**
 * Business challenge helper functions
 * Maps challenge codes to human-readable descriptions
 */

// Maps challenge codes to their human-readable names
export const getChallengeLabel = (challenge: string): string => {
  switch(challenge) {
    case "visibilitas_online": return "Visibilitas bisnis secara online";
    case "komunikasi_pelanggan": return "Komunikasi dengan pelanggan";
    case "pengelolaan_data": return "Pengelolaan data bisnis";
    case "otomatisasi": return "Otomatisasi proses bisnis";
    case "branding": return "Pengembangan merek dan identitas";
    default: return challenge;
  }
};

// Maps challenge codes to detailed descriptions for AI context
export const getChallengeDescription = (challenge: string): string => {
  switch(challenge) {
    case "visibilitas_online": 
      return "- Visibilitas bisnis secara online: Bisnis mengalami kesulitan mendapatkan perhatian secara online dan meningkatkan kehadiran digital.";
    case "komunikasi_pelanggan": 
      return "- Komunikasi dengan pelanggan: Bisnis menghadapi kendala dalam berkomunikasi efektif dengan pelanggan dan membangun hubungan yang baik.";
    case "pengelolaan_data": 
      return "- Pengelolaan data bisnis: Bisnis kesulitan mengelola dan mengoptimalkan data untuk pengambilan keputusan.";
    case "otomatisasi": 
      return "- Otomatisasi proses bisnis: Bisnis membutuhkan otomatisasi untuk proses manual yang menyita waktu dan sumber daya.";
    case "branding": 
      return "- Pengembangan merek dan identitas: Bisnis perlu membangun atau memperkuat identitas merek yang konsisten dan menarik.";
    default: return `- ${challenge}`;
  }
};

// Gets the primary challenge text for focused insights
export const getPrimaryChallengeText = (challenge: string | null): string => {
  if (!challenge) return "";
  
  switch(challenge) {
    case "visibilitas_online": 
      return "visibilitas bisnis secara online";
    case "komunikasi_pelanggan": 
      return "komunikasi dengan pelanggan";
    case "pengelolaan_data": 
      return "pengelolaan data bisnis";
    case "otomatisasi": 
      return "otomatisasi proses bisnis";
    case "branding": 
      return "pengembangan merek dan identitas";
    default: 
      return challenge;
  }
};
