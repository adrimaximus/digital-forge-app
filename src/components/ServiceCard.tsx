
import React, { useState } from 'react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceFeature {
  name: string;
  description: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon | string;
  features?: ServiceFeature[];
  showFeatures?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  features = [],
  showFeatures = false
}) => {
  const [expanded, setExpanded] = useState(false);
  const isCustomIcon = typeof icon === 'string';
  const Icon = !isCustomIcon ? icon as LucideIcon : null;
  
  const hasFeatures = features && features.length > 0;
  
  return (
    <div className="card-gradient p-8 rounded-2xl border border-white/5 hover:border-yellow-500/20 transition-all group">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {isCustomIcon ? (
          <img src={icon as string} alt="Icon" className="text-white w-8 h-8" />
        ) : Icon && (
          <Icon className="text-white" size={32} />
        )}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
      
      {hasFeatures && showFeatures && (
        <div className="mt-4">
          <Button 
            variant="ghost" 
            className="p-0 h-8 text-yellow-400 hover:bg-transparent hover:text-yellow-400 flex items-center" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Sembunyikan Fitur' : 'Lihat Fitur'}
            {expanded ? (
              <ChevronUp size={16} className="ml-1" />
            ) : (
              <ChevronDown size={16} className="ml-1" />
            )}
          </Button>
          
          {expanded && (
            <ul className="mt-6 space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="border-l-2 border-yellow-400 pl-4 py-2">
                  <p className="font-medium text-base text-white/90">{feature.name}</p>
                  <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
