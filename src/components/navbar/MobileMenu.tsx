
import React from 'react';
import { Button } from '@/components/ui/button';
import NavItem from './NavItem';
import { LogIn, Sparkles, ShoppingCart, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{ name: string; href: string }>;
  onItemClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, onItemClick }) => {
  const location = useLocation();
  
  if (!isOpen) return null;
  
  // Try to get cart items from localStorage
  let cartCount = 0;
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cartCount = JSON.parse(storedCart).length;
    }
  } catch (error) {
    console.error('Error loading cart data:', error);
  }
  
  // Check if user is master admin
  const isMasterAdmin = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'master admin';
  };
  
  // Filter nav items to exclude "Solusi" for non-master admin users
  const filteredNavItems = navItems.filter(item => {
    if (item.href === '/solusi') {
      return isMasterAdmin();
    }
    return true;
  });
  
  const handleHashNavigation = (href: string) => {
    onItemClick();
    
    // If not on homepage and it's a hash link
    if (location.pathname !== '/' && href.startsWith('#')) {
      window.location.href = '/' + href;
    } else if (href.startsWith('#')) {
      // We're on home page, just navigate to the hash
      setTimeout(() => {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  
  return (
    <div className="md:hidden absolute top-full left-0 right-0 p-4 border-t border-white/10 backdrop-blur-xl bg-slate-900">
      <ul className="flex flex-col space-y-4">
        {filteredNavItems.map((item) => (
          <NavItem 
            key={item.name} 
            href={item.href} 
            name={item.name} 
            onClick={() => {
              if (item.href.startsWith('#')) {
                handleHashNavigation(item.href);
              } else {
                onItemClick();
              }
            }}
          />
        ))}
        
        <Link to="/seo-analysis" onClick={onItemClick} className="text-gray-300 hover:text-white transition-colors flex items-center">
          <TrendingUp className="mr-1 h-4 w-4 text-yellow-400" />
          Trend Analysis
        </Link>
        
        {isMasterAdmin() && (
          <Link to="/cart" onClick={onItemClick} className="text-gray-300 hover:text-white transition-colors flex items-center">
            <ShoppingCart className="mr-1 h-4 w-4 text-yellow-400" />
            Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
        )}
        
        <NavItem 
          href="#business-analysis-block" 
          name="Analisa Bisnis dengan AI"
          icon={<Sparkles size={18} className="mr-1 text-yellow-400 animate-pulse" />}
          onClick={() => handleHashNavigation("#business-analysis-block")}
        />
        
        <li>
          <Link to="/admin" onClick={onItemClick}>
            <Button 
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white"
            >
              <LogIn className="mr-1 h-4 w-4" />
              Login
            </Button>
          </Link>
        </li>
        
        <li>
          <Button 
            className="w-full bg-transparent border border-white/20 hover:bg-white/10 text-white"
            onClick={() => {
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              onItemClick();
            }}
          >
            Hubungi Kami
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
