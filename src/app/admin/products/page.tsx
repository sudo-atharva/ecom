'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ProductForm from '@/components/admin/ProductForm';

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
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real application, you would delete from Firebase
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (productData: Partial<Product>) => {
    if (selectedProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData as Product,
        id: Date.now().toString(), // In a real app, this would come from Firebase
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 0,
        reviewCount: 0,
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all products in your store including their name, price, stock, and category.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add product
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      ₹{product.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.type}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {selectedProduct ? 'Edit Product' : 'Add Product'}
                  </h3>
                  <div className="mt-4">
                    <ProductForm
                      product={selectedProduct || undefined}
                      onSubmit={handleSubmit}
                      onCancel={() => {
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 