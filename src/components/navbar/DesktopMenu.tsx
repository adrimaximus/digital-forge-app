
import React from 'react';
import { Button } from '@/components/ui/button';
import NavItem from './NavItem';
import { LogIn, ShoppingCart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DesktopMenuProps {
  navItems: Array<{ name: string; href: string }>;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems }) => {
  // Initialize cart state for the navbar
  const cartState = {
    cart: []
  };
  
  // Try to get cart items from localStorage
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cartState.cart = JSON.parse(storedCart);
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
  
  return (
    <div className="hidden md:flex items-center gap-6">
      <ul className="flex space-x-6">
        {filteredNavItems.map((item) => (
          <NavItem key={item.name} href={item.href} name={item.name} />
        ))}
        <Link to="/seo-analysis" className="text-gray-300 hover:text-white transition-colors flex items-center">
          <TrendingUp className="mr-1 h-4 w-4 text-yellow-400" />
          Trend Analysis
        </Link>
      </ul>
      
      <div className="flex items-center gap-2">
        {isMasterAdmin() && (
          <Link to="/cart" className="relative">
            <Button variant="outline" size="sm" className="text-gray-300 hover:text-white">
              <ShoppingCart className="h-4 w-4" />
              {cartState.cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartState.cart.length}
                </span>
              )}
            </Button>
          </Link>
        )}
        
        <Link to="/admin">
          <Button 
            className="bg-background text-transparent bg-clip-text border border-yellow-400 hover:bg-secondary"
          >
            <LogIn className="mr-1 h-4 w-4 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DesktopMenu;
