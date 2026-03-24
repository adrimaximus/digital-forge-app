
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Briefcase } from 'lucide-react';
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface LeadSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSourceChange: (value: 'all' | 'contact-form' | 'business-analysis') => void;
}

const LeadSearchFilter: React.FC<LeadSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  onSourceChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Cari leads..."
          className="pl-8 w-full sm:w-64 bg-slate-700 border-slate-600"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Tabs 
        defaultValue="all" 
        className="w-full sm:w-auto"
        onValueChange={(value) => onSourceChange(value as 'all' | 'contact-form' | 'business-analysis')}
      >
        <TabsList className="grid grid-cols-3 w-full sm:w-auto">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="contact-form">Kontak</TabsTrigger>
          <TabsTrigger value="business-analysis">
            <Briefcase className="mr-1 h-4 w-4" />
            Analisis
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default LeadSearchFilter;
