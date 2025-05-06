'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types/product';

// This would normally come from Firebase
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Arduino Uno R3',
    description: 'The Arduino Uno is a microcontroller board based on the ATmega328P.',
    price: 699,
    type: 'physical',
    category: 'microcontrollers',
    tags: ['arduino', 'microcontroller', 'beginner'],
    images: ['/images/products/arduino-uno.jpg'],
    stock: 50,
    specs: {
      'Microcontroller': 'ATmega328P',
      'Operating Voltage': '5V',
      'Input Voltage': '7-12V',
      'Digital I/O Pins': '14 (of which 6 provide PWM output)',
      'Analog Input Pins': '6',
      'Flash Memory': '32 KB',
      'SRAM': '2 KB',
      'EEPROM': '1 KB',
      'Clock Speed': '16 MHz'
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    featured: true,
    rating: 4.5,
    reviewCount: 128,
    sku: 'ARDUINO-UNO-R3',
    brand: 'Arduino',
    weight: 25,
    dimensions: {
      length: 68.6,
      width: 53.4,
      height: 6.8
    },
    shipping: {
      free: false,
      price: 49
    }
  },
  // Add more mock products here
];

function ProductList() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  // Filter products based on search params
  let filteredProducts = [...mockProducts];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
  }

  // Sort products
  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        
        {/* Filters */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue=""
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
} 