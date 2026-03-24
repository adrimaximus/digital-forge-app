
export interface CatalogFeature {
  title: string;
  description: string;
  price?: number;
}

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  imageUrl: string;
  image?: string; // Adding this property for compatibility
  features: CatalogFeature[];
  period?: string; // Adding the period property
}

export interface CartItem extends CatalogItem {
  quantity: number;
}
