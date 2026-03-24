import React from 'react';
import { UserRole } from '@/types/admin';
import { getVisitStats } from '@/utils/visitTracker';
import { Users, Mail } from 'lucide-react';
import VisitorStatsCard from './stats/VisitorStatsCard';
import LeadStatsCard from './stats/LeadStatsCard';
import { useLeadStats } from './stats/hooks/useLeadStats';

interface ViewCounterProps {
  userRole: UserRole | null;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ userRole }) => {
  // Use the custom hook to manage lead stats
  const leadStats = useLeadStats();
  
  // Get real visit stats
  const viewStats = getVisitStats();
  
  // Both master admin and admin see all stats, affiliate only sees total and today
  const showWeekly = userRole === "master admin" || userRole === "admin";
  const showMonthly = userRole === "master admin" || userRole === "admin";

  return (
    <div className="space-y-6">
      {/* Visitor Statistics Card */}
      <VisitorStatsCard 
        totalViews={viewStats.totalViews}
        todayViews={viewStats.todayViews}
        weeklyViews={viewStats.weeklyViews}
        monthlyViews={viewStats.monthlyViews}
        showWeekly={showWeekly}
        showMonthly={showMonthly}
      />
      
      {/* Lead Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Analysis Leads Statistics */}
        <LeadStatsCard
          title="Statistik Lead Analisis Bisnis"
          icon={<Users className="mr-2 h-4 w-4 text-emerald-400" />}
          iconColor="text-emerald-400"
          totalLeads={leadStats.totalBusinessLeads}
          weeklyLeads={leadStats.weeklyBusinessLeads}
          monthlyLeads={leadStats.monthlyBusinessLeads}
          showWeekly={showWeekly}
          showMonthly={showMonthly}
        />
        
        {/* Contact Form Leads Statistics */}
        <LeadStatsCard
          title="Statistik Lead Kontak"
          icon={<Mail className="mr-2 h-4 w-4 text-amber-400" />}
          iconColor="text-amber-400"
          totalLeads={leadStats.totalContactLeads}
          weeklyLeads={leadStats.weeklyContactLeads}
          monthlyLeads={leadStats.monthlyContactLeads}
          showWeekly={showWeekly}
          showMonthly={showMonthly}
        />
      </div>
    </div>
  );
};

export default ViewCounter;
