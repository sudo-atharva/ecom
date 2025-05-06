'use client';

import { useCart } from '@/lib/context/CartContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SuccessPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/');
    }
  }, [state.items.length, router]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Thank you for your order!
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Your order has been successfully placed. We'll send you an email with your order details and
          tracking information once your order ships.
        </p>
        <div className="mt-6">
          <Link
            href="/products"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 