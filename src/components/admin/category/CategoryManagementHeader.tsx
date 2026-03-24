
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface CategoryManagementHeaderProps {
  title: string;
  description: string;
}

const CategoryManagementHeader: React.FC<CategoryManagementHeaderProps> = ({ title, description }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-slate-400">{description}</p>
      </div>
      <Button onClick={() => navigate('/admin/services')} variant="outline">
        Kembali
      </Button>
    </div>
  );
};

export default CategoryManagementHeader;
