export type ProductType = 'physical' | 'digital';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  type: ProductType;
  category: string;
  tags: string[];
  images: string[];
  stock: number;
  specs: {
    [key: string]: string;
  };
  digitalContent?: {
    files: {
      name: string;
      url: string;
      type: string;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  rating: number;
  reviewCount: number;
  sku: string;
  brand: string;
  weight?: number; // in grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shipping?: {
    free: boolean;
    price: number;
  };
} 