
import React from 'react';
import ServiceCard from './ServiceCard';
import { LucideIcon } from 'lucide-react';

interface ServiceFeature {
  name: string;
  description: string;
}

interface ServiceItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: ServiceFeature[];
  index: number;
  showFeatures?: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ 
  icon, 
  title, 
  description, 
  features = [],
  index, 
  showFeatures = false
}) => {
  return (
    <div 
      className="opacity-0 animate-slide-in" 
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <ServiceCard 
        title={title} 
        description={description} 
        icon={icon}
        features={features}
        showFeatures={showFeatures}
      />
    </div>
  );
};

export default ServiceItem;
