import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CalendarDaysIcon, Users, Mail } from 'lucide-react';
import { UserRole } from '@/types/admin';

interface LeadStatsProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  totalLeads: number;
  weeklyLeads: number;
  monthlyLeads: number;
  showWeekly: boolean;
  showMonthly: boolean;
}

const LeadStatsCard: React.FC<LeadStatsProps> = ({
  title,
  icon,
  iconColor,
  totalLeads,
  weeklyLeads,
  monthlyLeads,
  showWeekly,
  showMonthly
}) => {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium text-white flex items-center">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-slate-400 text-xs flex items-center">
              {React.cloneElement(icon as React.ReactElement, { className: "mr-1 h-3 w-3" })}
              Total
            </p>
            <p className="text-2xl font-bold text-white">{totalLeads.toLocaleString('id-ID')}</p>
          </div>
          {showWeekly && (
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-slate-400 text-xs flex items-center">
                <CalendarIcon className="mr-1 h-3 w-3" />
                Minggu Ini
              </p>
              <p className="text-2xl font-bold text-white">{weeklyLeads.toLocaleString('id-ID')}</p>
            </div>
          )}
          {showMonthly && (
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-slate-400 text-xs flex items-center">
                <CalendarDaysIcon className="mr-1 h-3 w-3" />
                Bulan Ini
              </p>
              <p className="text-2xl font-bold text-white">{monthlyLeads.toLocaleString('id-ID')}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadStatsCard;
