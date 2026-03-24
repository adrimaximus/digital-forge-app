
import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Check if user is master admin
  const isMasterAdmin = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'master admin';
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400 mt-4 italic transition-colors duration-300 hover:text-yellow-400 cursor-default">
              Digitally Create Your Customer
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Layanan</h3>
            <ul className="space-y-3">
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">Website berbasis AI</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">Sistem Portal Bisnis</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">OmniChat</Link></li>
              <li><Link to="/seo-analysis" className="text-gray-400 hover:text-white transition-colors">SEO & Social Trend Analysis</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Navigasi</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/#services" className="text-gray-400 hover:text-white transition-colors">Layanan</Link></li>
              <li><Link to="/#about" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/#contact" className="text-gray-400 hover:text-white transition-colors">Kontak</Link></li>
              {isMasterAdmin() && (
                <li><Link to="/solusi" className="text-gray-400 hover:text-white transition-colors">Katalog Solusi</Link></li>
              )}
              <li><Link to="/seo-analysis" className="text-gray-400 hover:text-white transition-colors">Trend Analysis</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="block text-sm text-gray-500">Email:</span>
                <a href="mailto:hello@betterworks.id" className="hover:text-yellow-400 transition-colors">hello@betterworks.id</a>
              </li>
              <li className="text-gray-400">
                <span className="block text-sm text-gray-500">Alamat:</span>
                <a href="https://maps.google.com/?q=Jl.+Siliwangi+Q+No.1,+Depok,+Jawa+Barat+16431" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  Jl. Siliwangi Q No.1, Depok, Jawa Barat 16431
                </a>
              </li>
              <li className="mt-4">
                <Link to="/#business-analysis-block" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center">
                  Analisa Bisnis dengan AI
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Saki Aksata Maxima. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-sm">Kebijakan Privasi</Link>
            <Link to="/terms-and-conditions" className="text-gray-500 hover:text-white transition-colors text-sm">Syarat & Ketentuan</Link>
            {isMasterAdmin() && (
              <Link to="/cart" className="text-gray-500 hover:text-white transition-colors text-sm">Keranjang</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
