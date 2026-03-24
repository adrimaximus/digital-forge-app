
import { useState, useEffect } from 'react';

export function useWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorIP, setVisitorIP] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState<string | null>(null);
  
  // Fetch visitor's IP address or get from localStorage
  useEffect(() => {
    const fetchVisitorIP = async () => {
      try {
        // First check if we have a stored IP
        const storedIP = localStorage.getItem('visitorIP');
        if (storedIP) {
          setVisitorIP(storedIP);
          return;
        }
        
        // If not, fetch a new one
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setVisitorIP(data.ip);
        localStorage.setItem('visitorIP', data.ip);
      } catch (error) {
        console.error('Failed to fetch visitor IP:', error);
        // Fallback to using a random ID if IP fetch fails
        const fallbackIP = `fallback-${Math.random().toString(36).substring(2, 15)}`;
        setVisitorIP(fallbackIP);
        localStorage.setItem('visitorIP', fallbackIP);
      }
    };
    
    fetchVisitorIP();
  }, []);
  
  // Listen for visitor name updates
  useEffect(() => {
    const handleNameUpdate = () => {
      const storedName = sessionStorage.getItem('visitorName');
      if (storedName) {
        setVisitorName(storedName);
      }
    };

    // Initial check
    handleNameUpdate();
    
    // Listen for name update events
    window.addEventListener('visitorNameUpdated', handleNameUpdate);
    
    return () => {
      window.removeEventListener('visitorNameUpdated', handleNameUpdate);
    };
  }, []);
  
  useEffect(() => {
    // Wait until we have the visitor's IP
    if (!visitorIP) return;
    
    // Check if this visitor (by IP) has already been welcomed
    const visitorNameKey = `visitorName_${visitorIP}`;
    const storedName = localStorage.getItem(visitorNameKey);
    
    if (storedName) {
      // If we have a name stored for this IP, use it
      setVisitorName(storedName);
      sessionStorage.setItem('visitorName', storedName);
      
      // Also check for stored email
      const storedEmail = localStorage.getItem(`visitorEmail_${visitorIP}`);
      if (storedEmail) {
        sessionStorage.setItem('visitorEmail', storedEmail);
      }
      
      // Broadcast that we have a name
      window.dispatchEvent(new CustomEvent('visitorNameUpdated'));
    } else {
      // Open the welcome modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [visitorIP]);
  
  return {
    isOpen,
    setIsOpen,
    visitorIP,
    visitorName
  };
}
