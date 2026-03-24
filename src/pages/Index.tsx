
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { Toaster } from '@/components/ui/toaster';
import BusinessAnalysisBlock from '@/components/BusinessAnalysisBlock';
import WelcomeModal from '@/components/WelcomeModal';
import { useWelcomeModal } from '@/hooks/useWelcomeModal';

const Index: React.FC = () => {
  // Welcome modal handling
  const { isOpen, setIsOpen, visitorIP, visitorName } = useWelcomeModal();
  
  useEffect(() => {
    console.log("Index component mounted");
    
    // Force reset any potential horizontal scroll
    window.scrollTo(0, window.scrollY);
    
    // Add event listener to prevent horizontal scrolling on touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(window.innerWidth - document.documentElement.clientWidth) > 10) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <BusinessAnalysisBlock />
      <AboutSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <Toaster />
      
      {/* Welcome modal */}
      <WelcomeModal 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        visitorIP={visitorIP} 
      />
    </div>
  );
};

export default Index;
