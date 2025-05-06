'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/context/CartContext';
import { StarIcon } from '@heroicons/react/20/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Product } from '@/types';

interface ProductDetailsProps {
  id: string;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  // This would normally come from Firebase using the id
  const mockProduct: Product = {
    id: '1',
    name: 'Arduino Uno R3',
    description: 'The Arduino Uno is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins (of which 6 can be used as PWM outputs), 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header, and a reset button.',
    price: 699,
    type: 'Development Board',
    category: 'microcontrollers',
    tags: ['arduino', 'microcontroller', 'beginner'],
    images: [
      '/images/products/arduino-uno-1.jpg',
      '/images/products/arduino-uno-2.jpg',
      '/images/products/arduino-uno-3.jpg'
    ],
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
    gst: 18,
    mrp: 799,
    discount: 12.5,
    weight: 25,
    dimensions: {
      length: 68.6,
      width: 53.4,
      height: 6.8
    },
    shipping: {
      free: false,
      price: 49,
      weight: 25,
      dimensions: {
        length: 68.6,
        width: 53.4,
        height: 6.8
      }
    },
    inventory: {
      currentStock: 50,
      minimumStock: 10,
      reorderPoint: 20,
      reorderQuantity: 50,
      lastRestocked: new Date().toISOString(),
      supplier: 'Arduino Official',
      supplierContact: 'supplier@arduino.cc',
      batchNumber: 'BATCH-2024-001',
      expiryDate: null,
      location: 'Warehouse A'
    }
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product: mockProduct, quantity }
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-4 ${
                      selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${mockProduct.name} - Image ${index + 1}`}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="aspect-h-1 aspect-w-1 w-full">
              <div className="h-full w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={mockProduct.images[selectedImage]}
                  alt={mockProduct.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{mockProduct.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">₹{mockProduct.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        mockProduct.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {mockProduct.reviewCount} reviews
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">{mockProduct.description}</div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900">Quantity:</h3>
                <div className="ml-4 flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-l-md border border-gray-300 px-3 py-1 text-gray-500 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="border-t border-b border-gray-300 px-3 py-1 text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(mockProduct.stock, quantity + 1))}
                    className="rounded-r-md border border-gray-300 px-3 py-1 text-gray-500 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <ShoppingCartIcon className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
            </div>

            {/* Specifications */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
              <div className="mt-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  {Object.entries(mockProduct.specs).map(([key, value]) => (
                    <div key={key} className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Shipping */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Shipping</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {mockProduct.shipping.free
                    ? 'Free shipping'
                    : `Shipping cost: ₹${mockProduct.shipping.price}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 