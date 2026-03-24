
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Folder } from 'lucide-react';
import { ServiceManagementHeaderProps } from './types';

const ServiceManagementHeader: React.FC<ServiceManagementHeaderProps> = ({ canAddServices }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <div>
        <h2 className="text-2xl font-bold">Manajemen Layanan</h2>
        <p className="text-muted-foreground">Kelola semua layanan dan fitur layanan</p>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          asChild
        >
          <Link to="/admin/categories" className="flex items-center">
            <Folder className="mr-2 h-4 w-4" />
            Kelola Kategori
          </Link>
        </Button>
        
        {canAddServices && (
          <Button 
            variant="default" 
            size="sm"
            asChild
          >
            <Link to="/admin/solusi/add" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Layanan
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceManagementHeader;
