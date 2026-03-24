
import React, { useState } from 'react';
import { Pencil, Trash2, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ServiceFeatureTableProps } from './types';
import { CatalogFeature } from '@/types/catalog';
import { ServiceFeatureEditDialog } from './dialogs/ServiceFeatureEditDialog';
import { sortData } from './utils/sortUtils';

type SortDirection = 'asc' | 'desc';
type SortColumn = 'title' | 'description' | 'serviceTitle' | 'category' | 'price';

const ServiceFeatureTable: React.FC<ServiceFeatureTableProps> = ({ 
  features, 
  onDeleteFeature,
  onUpdateFeature 
}) => {
  const [editingFeature, setEditingFeature] = useState<CatalogFeature | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<SortColumn>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleEditClick = (serviceId: string, feature: CatalogFeature) => {
    setEditingFeature(feature);
    setEditingServiceId(serviceId);
    setDialogOpen(true);
  };

  const sortedFeatures = sortData(features, sortColumn, sortDirection);

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? 
      <ArrowUpAZ className="ml-1 h-4 w-4 inline" /> : 
      <ArrowDownAZ className="ml-1 h-4 w-4 inline" />;
  };

  const renderSortableHeader = (title: string, column: SortColumn) => (
    <div
      className="flex items-center cursor-pointer hover:text-slate-300"
      onClick={() => handleSort(column)}
    >
      {title}
      <SortIcon column={column} />
    </div>
  );

  return (
    <>
      <div className="overflow-auto">
        <Table className="border border-slate-700 rounded-md">
          <TableHeader className="bg-slate-700">
            <TableRow className="hover:bg-slate-700">
              <TableHead className="text-xs font-medium w-40 py-2">
                {renderSortableHeader('Nama Fitur', 'title')}
              </TableHead>
              <TableHead className="text-xs font-medium w-52 py-2">
                {renderSortableHeader('Deskripsi', 'description')}
              </TableHead>
              <TableHead className="text-xs font-medium w-40 py-2">
                {renderSortableHeader('Tipe Layanan', 'serviceTitle')}
              </TableHead>
              <TableHead className="text-xs font-medium py-2">
                {renderSortableHeader('Kategori', 'category')}
              </TableHead>
              <TableHead className="text-xs font-medium py-2">
                {renderSortableHeader('Harga', 'price')}
              </TableHead>
              <TableHead className="text-xs font-medium py-2">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFeatures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Tidak ada fitur layanan ditemukan
                </TableCell>
              </TableRow>
            ) : (
              sortedFeatures.map((item) => (
                <TableRow 
                  key={`${item.serviceId}-${item.feature.title}`} 
                  className="hover:bg-slate-700/50 border-slate-600"
                >
                  <TableCell className="py-1.5 text-xs">{item.feature.title}</TableCell>
                  <TableCell className="py-1.5 text-xs">
                    <div className="max-h-12 overflow-y-auto text-xs">
                      {item.feature.description}
                    </div>
                  </TableCell>
                  <TableCell className="py-1.5 text-xs">{item.serviceTitle}</TableCell>
                  <TableCell className="py-1.5 text-xs">{item.category}</TableCell>
                  <TableCell className="py-1.5 text-xs">
                    {typeof item.feature.price === 'number'
                      ? `Rp ${item.feature.price.toLocaleString('id-ID')}`
                      : '-'}
                  </TableCell>
                  <TableCell className="py-1.5">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => handleEditClick(item.serviceId, item.feature)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-500"
                        onClick={() => onDeleteFeature(item.serviceId, item.feature.title)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ServiceFeatureEditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        feature={editingFeature}
        serviceId={editingServiceId}
        onSave={onUpdateFeature}
      />
    </>
  );
};

export default ServiceFeatureTable;
