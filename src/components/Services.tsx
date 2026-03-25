
import React, { useState, useRef } from 'react';
import ServicesHeader from './ServicesHeader';
import servicesData from '../data/ServicesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("0");
  const tabsListRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  // Filter out the services that should be hidden for now
  const visibleServices = servicesData.filter(service => {
    const title = service.title.toLowerCase();
    return !title.includes('business intelligence') && !title.includes('cyber') && !title.includes('cloud');
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return <section id="services" className="py-16 md:py-20 bg-gradient-to-b from-background to-slate-900/80">
      <div className="container mx-auto px-4 max-w-6xl">
        <ServicesHeader />

        <Tabs defaultValue="0" value={activeTab} onValueChange={handleTabChange} className="mt-4 md:mt-10 flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Vertical tabs navigation with fixed height */}
          <div className="relative w-full md:w-1/3 lg:w-1/4 h-auto max-h-[17.6rem]">
            <div className="h-full overflow-hidden flex items-center">
              <ScrollArea className="h-full w-full scrollbar-none">
                <TabsList ref={tabsListRef} className="flex flex-col w-full h-auto pt-2 md:pt-6 pb-6 bg-transparent rounded-lg snap-y justify-center">
                  {visibleServices.map((service, index) => {
                  const Icon = service.icon as LucideIcon;
                  return <TabsTrigger key={index} value={index.toString()} className="flex-shrink-0 w-full min-h-[38px] flex items-center justify-start gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black rounded-md snap-start px-[14px] my-[3px] py-0 mx-0 font-normal">
                        {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                        <span className="text-sm md:text-base font-medium">{t(service.title)}</span>
                      </TabsTrigger>;
                })}
                </TabsList>
              </ScrollArea>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col bg-slate-800/30 p-6 md:p-8 rounded-lg border border-white/5 w-full">
              {visibleServices.map((service, index) => <TabsContent key={index} value={index.toString()} className="mt-0 animate-in fade-in">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">
                    {t(service.title)}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                    {t(service.description)}
                  </p>
                  
                  {service.features && service.features.length > 0 && <div>
                      <h4 className="font-medium text-base md:text-lg mb-3 md:mb-4 text-yellow-400">{t('Fitur Layanan')}</h4>
                      <ul className="space-y-3 md:space-y-4">
                        {service.features.map((feature, idx) => <li key={idx} className="border-l-2 border-yellow-400 pl-3 md:pl-4 py-1 md:py-2">
                            <p className="font-medium text-sm md:text-base text-white/90">{t(feature.name)}</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1">{t(feature.description)}</p>
                          </li>)}
                      </ul>
                    </div>}
                </TabsContent>)}
            </div>
          </div>
        </Tabs>
      </div>
    </section>;
};

export default Services;
