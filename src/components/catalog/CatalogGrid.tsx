
import React from 'react';
import { useCatalog } from './CatalogContext';
import CatalogCard from './CatalogCard';
import CatalogListItem from './CatalogListItem';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const CatalogGrid: React.FC = () => {
  const { filteredItems, viewMode } = useCatalog();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  if (filteredItems.length === 0) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium">Tidak ada layanan yang ditemukan</h3>
        <p className="text-muted-foreground mt-2">Coba ubah filter pencarian Anda</p>
      </div>
    );
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-x-hidden"
    >
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {filteredItems.map(item => (
            <motion.div key={item.id} variants={itemVariants} className="w-full">
              <CatalogCard item={item} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {filteredItems.map(item => (
            <motion.div key={item.id} variants={itemVariants} className="w-full">
              <CatalogListItem item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CatalogGrid;
