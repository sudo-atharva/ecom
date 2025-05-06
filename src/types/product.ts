export type ProductType = 'physical' | 'digital' | 'Development Board' | 'Component' | 'Kit' | 'Accessory';

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
    [key: string]: string | number;
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
  gst: number;
  mrp: number;
  discount: number;
  weight: number; // in grams
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  shipping: {
    free: boolean;
    price: number;
    weight?: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
  };
  inventory: {
    currentStock: number;
    minimumStock: number;
    reorderPoint: number;
    reorderQuantity: number;
    lastRestocked: string;
    supplier: string;
    supplierContact: string;
    batchNumber: string;
    expiryDate: string | null;
    location: string;
  };
} 