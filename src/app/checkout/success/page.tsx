'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const { state } = useCart();

  useEffect(() => {
    // Clear cart after successful checkout
    if (state.items.length > 0) {
      // Clear cart logic here
    }
  }, [state.items]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Thank you for your order!</h1>
        <p className="mt-4 text-lg text-gray-500">
          We&apos;ve received your order and will begin processing it right away.
        </p>
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 