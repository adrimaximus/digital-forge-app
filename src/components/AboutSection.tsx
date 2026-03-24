
import React from 'react';
import { Shield, Award, Rocket } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Keamanan Data",
      description: "Keamanan data Anda adalah prioritas utama kami dengan enkripsi tingkat tinggi dan protokol keamanan terbaru."
    },
    {
      icon: Award,
      title: "Kualitas Terbaik",
      description: "Kami menghadirkan layanan dengan standar kualitas tinggi untuk hasil yang optimal bagi bisnis Anda."
    },
    {
      icon: Rocket,
      title: "Pertumbuhan Bisnis",
      description: "Fokus pada solusi yang mendorong pertumbuhan bisnis dan meningkatkan konversi pelanggan Anda."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-900/80 to-background relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tentang <span className="heading-gradient">Betterworks</span>
            </h2>
            <p className="text-gray-300">
              Betterworks.id adalah sebuah startup yang bertujuan untuk memberdayakan bisnis menengah di Indonesia, khususnya di area Jabodetabek, untuk berkembang di pasar digital. Misi inti kami adalah menyediakan layanan aktivasi digital yang disesuaikan untuk mendukung bisnis dalam memperoleh dan mempertahankan pelanggan melalui saluran digital.
            </p>
            <p className="text-gray-400">
              Kami hadir untuk menjadi partner digital yang membantu bisnis Anda tumbuh dengan solusi teknologi terkini, termasuk pemanfaatan AI untuk mengoptimalkan proses bisnis dan meningkatkan pengalaman pelanggan.
            </p>
            
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="glass-morphism p-4 rounded-lg flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center mb-3">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -z-10 w-full h-full">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
            </div>
            
            <div className="glass-morphism border border-white/10 rounded-xl p-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">100+</h3>
                    <p className="text-sm text-gray-400">Proyek Selesai</p>
                  </div>
                </div>
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">90%</h3>
                    <p className="text-sm text-gray-400">Klien Puas</p>
                  </div>
                </div>
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">24/7</h3>
                    <p className="text-sm text-gray-400">Dukungan</p>
                  </div>
                </div>
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">50+</h3>
                    <p className="text-sm text-gray-400">Mitra Bisnis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
