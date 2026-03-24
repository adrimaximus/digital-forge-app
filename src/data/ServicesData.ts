
import { TrendingUp, Sparkles, MessageSquare, Database, Globe, LineChart, Shield, Cloud } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceFeature {
  name: string;
  description: string;
}

interface ServiceData {
  icon: LucideIcon;
  title: string;
  description: string;
  features: ServiceFeature[];
}

const servicesData: ServiceData[] = [
  {
    icon: TrendingUp,
    title: "SEO & Social Trend Analysis",
    description: "Temukan insight dan trend terkini yang relevan dengan produk Anda untuk meningkatkan sales, jadikan putusan strategis Anda.",
    features: [
      {
        name: "Analisis Keyword",
        description: "Identifikasi keyword dengan volume search tinggi dan kompetisi rendah untuk meningkatkan peringkat SEO Anda."
      },
      {
        name: "Social Media Monitoring",
        description: "Pantau percakapan tentang brand Anda di berbagai platform sosial media untuk insight real-time."
      },
      {
        name: "Competitor Analysis",
        description: "Bandingkan strategi digital kompetitor Anda dan temukan gap untuk dimanfaatkan."
      }
    ]
  },
  {
    icon: Sparkles,
    title: "Website berbasis AI",
    description: "Website kustom yang dibangun dengan kecerdasan buatan untuk meningkatkan pengalaman pengguna dan meningkatkan konversi.",
    features: [
      {
        name: "Update lifetime websitemu",
        description: "Dapatkan pembaruan konten website secara berkala menggunakan teknologi AI yang menyesuaikan dengan tren dan kebutuhan bisnis Anda."
      },
      {
        name: "Chatbot Cerdas",
        description: "Asisten virtual 24/7 yang dapat menjawab pertanyaan dan membantu pengunjung navigasi website."
      },
      {
        name: "Optimasi Otomatis",
        description: "Penyesuaian elemen UI/UX secara otomatis berdasarkan data interaksi pengguna untuk meningkatkan konversi."
      },
      {
        name: "Analitik Prediktif",
        description: "Prediksi tren pengunjung dan perilaku pengguna untuk membantu perencanaan konten dan strategi marketing."
      }
    ]
  },
  {
    icon: MessageSquare,
    title: "OmniChat",
    description: "Integrasi berbagai saluran komunikasi ke dalam satu aplikasi untuk memudahkan interaksi dengan pelanggan.",
    features: [
      {
        name: "Multi-Channel Support",
        description: "Integrasi WhatsApp, Telegram, Line, dan platform chat lainnya dalam satu dashboard."
      },
      {
        name: "Otomatisasi Respons",
        description: "Respons otomatis untuk pertanyaan umum, meningkatkan efisiensi tim customer service."
      },
      {
        name: "Analitik Percakapan",
        description: "Analisis sentimen dan topik percakapan untuk insight pelanggan yang lebih baik."
      }
    ]
  },
  {
    icon: Database,
    title: "Sistem Portal Bisnis",
    description: "Solusi micro-management komprehensif yang mencakup database, CRM, dan logistik untuk mengoptimalkan operasi bisnis.",
    features: [
      {
        name: "CRM Terintegrasi",
        description: "Manajemen hubungan pelanggan komprehensif dengan tracking interaksi dan history pembelian."
      },
      {
        name: "Manajemen Inventory",
        description: "Sistem pelacakan stok real-time dengan notifikasi otomatis untuk restock."
      },
      {
        name: "Analitik Bisnis",
        description: "Dashboard dengan metrik bisnis kunci untuk membantu pengambilan keputusan berbasis data."
      },
      {
        name: "Manajemen Proyek",
        description: "Tools kolaborasi tim dengan tracking progress dan deadline untuk meningkatkan produktivitas."
      }
    ]
  },
  {
    icon: Globe,
    title: "Digital Marketing Suite",
    description: "Paket layanan digital marketing komprehensif untuk meningkatkan awareness brand dan akuisisi pelanggan.",
    features: [
      {
        name: "Social Media Management",
        description: "Pengelolaan konten dan kampanye di berbagai platform sosial media."
      },
      {
        name: "Email Marketing",
        description: "Kampanye email terautomatisasi dengan personalisasi dan segmentasi audiens."
      },
      {
        name: "PPC Advertising",
        description: "Pengelolaan iklan berbayar di Google, Facebook, dan platform digital lainnya."
      },
      {
        name: "Brand Development",
        description: "Strategi dan produksi konten berkualitas untuk memperkuat otoritas brand Anda."
      }
    ]
  },
  {
    icon: LineChart,
    title: "Business Intelligence Tools",
    description: "Platform analitik data bisnis yang membantu mengubah raw data menjadi insight yang actionable.",
    features: [
      {
        name: "Interactive Dashboards",
        description: "Visualisasi data real-time untuk monitoring performa bisnis dengan mudah."
      },
      {
        name: "Predictive Analytics",
        description: "Forecasting berbasis AI untuk membantu perencanaan bisnis jangka panjang."
      },
      {
        name: "Custom Reports",
        description: "Laporan bisnis kustom sesuai kebutuhan stakeholder dan departemen."
      }
    ]
  },
  {
    icon: Shield,
    title: "Cyber Security Solutions",
    description: "Perlindungan data dan infrastruktur digital bisnis Anda dari ancaman cyber dan kebocoran data.",
    features: [
      {
        name: "Vulnerability Assessment",
        description: "Evaluasi keamanan sistem untuk mengidentifikasi celah potensial."
      },
      {
        name: "Data Encryption",
        description: "Teknologi enkripsi tingkat lanjut untuk melindungi data sensitif."
      },
      {
        name: "Security Training",
        description: "Pelatihan kesadaran keamanan cyber untuk karyawan dan tim IT."
      },
      {
        name: "24/7 Monitoring",
        description: "Pengawasan sistem keamanan non-stop untuk deteksi dan respons cepat terhadap ancaman."
      }
    ]
  },
  {
    icon: Cloud,
    title: "Cloud Migration Services",
    description: "Layanan migrasi infrastruktur IT ke cloud untuk meningkatkan skalabilitas dan mengurangi biaya operasional.",
    features: [
      {
        name: "Assessment & Planning",
        description: "Evaluasi infrastruktur yang ada dan perencanaan strategi migrasi yang optimal."
      },
      {
        name: "Migrasi Data",
        description: "Transfer data yang aman dengan downtime minimal untuk kelangsungan bisnis."
      },
      {
        name: "Implementasi & Konfigurasi",
        description: "Setup dan konfigurasi lingkungan cloud sesuai kebutuhan bisnis spesifik."
      },
      {
        name: "Maintenance & Support",
        description: "Dukungan teknis berkelanjutan untuk memastikan performa optimal infrastruktur cloud."
      }
    ]
  }
];

export default servicesData;
