
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, TrendingUp, PieChart } from 'lucide-react';

interface OverviewTabProps {
  onStartAnalysis: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ onStartAnalysis }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Social Trend Analysis</CardTitle>
        <CardDescription>
          Temukan insight dan trend terkini untuk produk Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-400/10 p-3 rounded-full">
              <Search className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium">Analisis Keyword</h3>
              <p className="text-muted-foreground text-sm">
                Temukan kata kunci yang paling dicari dan relevan dengan produk Anda
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-yellow-400/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium">Trend Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Dapatkan tren terkini di industri Anda untuk meningkatkan strategi marketing
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-yellow-400/10 p-3 rounded-full">
              <PieChart className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium">Insight Kompetitor</h3>
              <p className="text-muted-foreground text-sm">
                Bandingkan performa Anda dengan kompetitor di market
              </p>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white"
            onClick={onStartAnalysis}
          >
            Mulai Analisis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
