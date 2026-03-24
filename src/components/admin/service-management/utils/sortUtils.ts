
import { ServiceFeatureItem } from "../types";

type SortDirection = 'asc' | 'desc';
type SortColumn = 'title' | 'description' | 'serviceTitle' | 'category' | 'price';

export const sortData = (
  data: ServiceFeatureItem[],
  column: SortColumn,
  direction: SortDirection
): ServiceFeatureItem[] => {
  return [...data].sort((a, b) => {
    let valueA, valueB;

    switch (column) {
      case 'title':
        valueA = a.feature.title.toLowerCase();
        valueB = b.feature.title.toLowerCase();
        break;
      case 'description':
        valueA = (a.feature.description || '').toLowerCase();
        valueB = (b.feature.description || '').toLowerCase();
        break;
      case 'serviceTitle':
        valueA = a.serviceTitle.toLowerCase();
        valueB = b.serviceTitle.toLowerCase();
        break;
      case 'category':
        valueA = a.category.toLowerCase();
        valueB = b.category.toLowerCase();
        break;
      case 'price':
        valueA = a.feature.price || 0;
        valueB = b.feature.price || 0;
        break;
      default:
        return 0;
    }

    if (direction === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
};
