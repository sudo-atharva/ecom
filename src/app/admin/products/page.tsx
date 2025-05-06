'use client';

import { useState } from 'react';
import { Product, ProductType } from '@/types';
import { PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Image from 'next/image';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Arduino Uno R3',
    description: 'The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz quartz crystal, a USB connection, a power jack, an ICSP header, and a reset button.',
    price: 24.99,
    stock: 50,
    category: 'Microcontrollers',
    type: 'Development Board',
    brand: 'Arduino',
    sku: 'ARDUINO-UNO-R3',
    featured: true,
    gst: 18,
    mrp: 29.99,
    discount: 16.67,
    specs: {
      microcontroller: 'ATmega328P',
      operatingVoltage: '5V',
      inputVoltage: '7-12V',
      digitalIOPins: 14,
      analogInputPins: 6,
      flashMemory: '32 KB',
      sram: '2 KB',
      eeprom: '1 KB',
      clockSpeed: '16 MHz'
    },
    images: [
      '/images/products/arduino-uno-r3-1.jpg',
      '/images/products/arduino-uno-r3-2.jpg'
    ],
    shipping: {
      weight: 0.25,
      dimensions: {
        length: 6.8,
        width: 5.3,
        height: 1.5
      }
    },
    inventory: {
      currentStock: 50,
      minimumStock: 10,
      reorderPoint: 15,
      reorderQuantity: 25,
      lastRestocked: '2024-03-15',
      supplier: 'Arduino Official',
      supplierContact: 'supplier@arduino.com',
      batchNumber: 'BATCH-2024-001',
      expiryDate: null,
      location: 'Warehouse A, Shelf 3'
    }
  }
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Create preview URLs
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // TODO: Implement delete functionality
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const baseProduct = {
      id: '',
      name: '',
      description: '',
      price: 0,
      type: 'Development Board' as ProductType,
      category: '',
      tags: [],
      images: [],
      stock: 0,
      specs: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      featured: false,
      rating: 0,
      reviewCount: 0,
      sku: '',
      brand: '',
      gst: 18,
      mrp: 0,
      discount: 0,
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0
      },
      shipping: {
        free: false,
        price: 0,
        weight: 0,
        dimensions: {
          length: 0,
          width: 0,
          height: 0
        }
      },
      inventory: {
        currentStock: 0,
        minimumStock: 0,
        reorderPoint: 0,
        reorderQuantity: 0,
        lastRestocked: new Date().toISOString(),
        supplier: '',
        supplierContact: '',
        batchNumber: '',
        expiryDate: null,
        location: ''
      }
    } satisfies Product;

    const productData: Product = {
      ...baseProduct,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      type: formData.get('type') as ProductType,
      category: formData.get('category') as string,
      brand: formData.get('brand') as string,
      sku: formData.get('sku') as string,
      shipping: {
        free: false,
        price: 49,
        weight: Number(formData.get('weight')),
        dimensions: {
          length: Number(formData.get('length')),
          width: Number(formData.get('width')),
          height: Number(formData.get('height'))
        }
      }
    };

    if (selectedProduct?.id) {
      setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, ...productData } : p));
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        images: [],
        specs: {},
        shipping: {
          free: false,
          price: 49,
          weight: Number(formData.get('weight')),
          dimensions: {
            length: Number(formData.get('length')),
            width: Number(formData.get('width')),
            height: Number(formData.get('height'))
          }
        }
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
    setPreviewUrls([]);
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your product inventory, including stock levels, pricing, and product details.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setSelectedProduct({
                  inventory: {
                    currentStock: 0,
                    minimumStock: 0,
                    reorderPoint: 0,
                    reorderQuantity: 0,
                    lastRestocked: new Date().toISOString().split('T')[0],
                    supplier: '',
                    supplierContact: '',
                    batchNumber: '',
                    expiryDate: null,
                    location: ''
                  }
                });
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add product
            </button>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Product
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        SKU
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Stock
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        GST
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="flex items-center">
                            {product.images[0] && (
                              <div className="h-10 w-10 flex-shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.sku}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div>₹{product.price.toFixed(2)}</div>
                          {product.discount > 0 && (
                            <div className="text-green-600">-{product.discount}%</div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div>{product.inventory.currentStock}</div>
                          {product.inventory.currentStock <= product.inventory.reorderPoint && (
                            <div className="text-red-600">Reorder needed</div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.gst}%
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-medium mb-4">
              {selectedProduct?.id ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={selectedProduct?.name || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku"
                    value={selectedProduct?.sku || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    step="0.01"
                    value={selectedProduct?.price || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    id="mrp"
                    step="0.01"
                    value={selectedProduct?.mrp || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, mrp: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="gst" className="block text-sm font-medium text-gray-700">
                    GST (%)
                  </label>
                  <input
                    type="number"
                    id="gst"
                    value={selectedProduct?.gst || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, gst: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={selectedProduct?.category || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    value={selectedProduct?.brand || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    id="currentStock"
                    value={selectedProduct?.inventory?.currentStock || 0}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      inventory: {
                        ...selectedProduct?.inventory,
                        currentStock: parseInt(e.target.value) || 0,
                        minimumStock: selectedProduct?.inventory?.minimumStock || 0,
                        reorderPoint: selectedProduct?.inventory?.reorderPoint || 0,
                        reorderQuantity: selectedProduct?.inventory?.reorderQuantity || 0,
                        lastRestocked: selectedProduct?.inventory?.lastRestocked || new Date().toISOString().split('T')[0],
                        supplier: selectedProduct?.inventory?.supplier || '',
                        supplierContact: selectedProduct?.inventory?.supplierContact || '',
                        batchNumber: selectedProduct?.inventory?.batchNumber || '',
                        expiryDate: selectedProduct?.inventory?.expiryDate || null,
                        location: selectedProduct?.inventory?.location || ''
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="reorderPoint" className="block text-sm font-medium text-gray-700">
                    Reorder Point
                  </label>
                  <input
                    type="number"
                    id="reorderPoint"
                    value={selectedProduct?.inventory?.reorderPoint || 0}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      inventory: {
                        ...selectedProduct?.inventory,
                        currentStock: selectedProduct?.inventory?.currentStock || 0,
                        minimumStock: selectedProduct?.inventory?.minimumStock || 0,
                        reorderPoint: parseInt(e.target.value) || 0,
                        reorderQuantity: selectedProduct?.inventory?.reorderQuantity || 0,
                        lastRestocked: selectedProduct?.inventory?.lastRestocked || new Date().toISOString().split('T')[0],
                        supplier: selectedProduct?.inventory?.supplier || '',
                        supplierContact: selectedProduct?.inventory?.supplierContact || '',
                        batchNumber: selectedProduct?.inventory?.batchNumber || '',
                        expiryDate: selectedProduct?.inventory?.expiryDate || null,
                        location: selectedProduct?.inventory?.location || ''
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                    Supplier
                  </label>
                  <input
                    type="text"
                    id="supplier"
                    value={selectedProduct?.inventory?.supplier || ''}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      inventory: {
                        ...selectedProduct?.inventory,
                        currentStock: selectedProduct?.inventory?.currentStock || 0,
                        minimumStock: selectedProduct?.inventory?.minimumStock || 0,
                        reorderPoint: selectedProduct?.inventory?.reorderPoint || 0,
                        reorderQuantity: selectedProduct?.inventory?.reorderQuantity || 0,
                        lastRestocked: selectedProduct?.inventory?.lastRestocked || new Date().toISOString().split('T')[0],
                        supplier: e.target.value,
                        supplierContact: selectedProduct?.inventory?.supplierContact || '',
                        batchNumber: selectedProduct?.inventory?.batchNumber || '',
                        expiryDate: selectedProduct?.inventory?.expiryDate || null,
                        location: selectedProduct?.inventory?.location || ''
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={selectedProduct?.inventory?.location || ''}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct,
                      inventory: {
                        ...selectedProduct?.inventory,
                        currentStock: selectedProduct?.inventory?.currentStock || 0,
                        minimumStock: selectedProduct?.inventory?.minimumStock || 0,
                        reorderPoint: selectedProduct?.inventory?.reorderPoint || 0,
                        reorderQuantity: selectedProduct?.inventory?.reorderQuantity || 0,
                        lastRestocked: selectedProduct?.inventory?.lastRestocked || new Date().toISOString().split('T')[0],
                        supplier: selectedProduct?.inventory?.supplier || '',
                        supplierContact: selectedProduct?.inventory?.supplierContact || '',
                        batchNumber: selectedProduct?.inventory?.batchNumber || '',
                        expiryDate: selectedProduct?.inventory?.expiryDate || null,
                        location: e.target.value
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={selectedProduct?.description || ''}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Product Images</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {previewUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                    setPreviewUrls([]);
                  }}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {selectedProduct?.id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
} 