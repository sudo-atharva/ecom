export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  type: string;
  brand: string;
  sku: string;
  featured: boolean;
  specs: {
    [key: string]: string | number;
  };
  images: string[];
  shipping: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
} 