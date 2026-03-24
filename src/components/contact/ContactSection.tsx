
import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import { useState, useEffect } from 'react';

const ContactSection: React.FC = () => {
  const [visitorName, setVisitorName] = useState('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('visitorName');
    if (storedName) {
      setVisitorName(storedName);
    }

    window.addEventListener('visitorNameUpdated', () => {
      const updatedName = sessionStorage.getItem('visitorName');
      if (updatedName) {
        setVisitorName(updatedName);
      }
    });
  }, []);

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-slate-900/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hubungi <span className="heading-gradient">Kami</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {visitorName ? `${visitorName} s` : 'S'}iap bekerja sama dengan kami? Hubungi tim kami untuk mendiskusikan kebutuhan digital bisnismu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

