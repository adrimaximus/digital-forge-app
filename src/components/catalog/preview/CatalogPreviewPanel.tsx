
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import CatalogItemPreview from './CatalogItemPreview';

const CatalogPreviewPanel: React.FC = () => {
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(true);
  const form = useFormContext();
  const formValues = form.watch();
  
  return (
    <div className="sticky top-4">
      <Card>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Pratinjau Layanan</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsPreviewVisible(!isPreviewVisible)} 
            title={isPreviewVisible ? "Sembunyikan pratinjau" : "Tampilkan pratinjau"}
          >
            {isPreviewVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
        
        <CardContent className="p-4">
          {isPreviewVisible ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CatalogItemPreview data={formValues} />
              <p className="text-xs text-muted-foreground mt-4">
                Ini adalah pratinjau bagaimana layanan Anda akan tampil dalam katalog.
                Pratinjau ini akan berubah secara otomatis saat Anda mengisi formulir.
              </p>
            </motion.div>
          ) : (
            <div className="flex justify-center items-center py-8 text-muted-foreground">
              <p>Pratinjau disembunyikan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CatalogPreviewPanel;
