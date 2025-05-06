'use client';

import { useCart } from '@/lib/context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/cart');
    }
  }, [state.items.length, router]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // In a real application, you would create an order on your backend
      // and get the order ID from there
      const orderData = {
        amount: state.total * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: 'receipt_' + Date.now(),
      };

      // Create order on your backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'TechParts',
        description: 'Electronics Components Store',
        order_id: order.id,
        handler: async function (response: any) {
          // Handle successful payment
          console.log('Payment successful:', response);
          
          // Prepare order data for Google Sheets
          const firstName = (document.getElementById('first-name') as HTMLInputElement)?.value || '';
          const lastName = (document.getElementById('last-name') as HTMLInputElement)?.value || '';
          
          const orderData = {
            id: order.id,
            customerName: `${firstName} ${lastName}`.trim(),
            email: 'customer@example.com', // In a real app, get this from user profile
            total: state.total,
            status: 'Paid',
            items: state.items,
          };

          // Sync order with Google Sheets
          try {
            await fetch('/api/orders/sync', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(orderData),
            });
          } catch (error) {
            console.error('Failed to sync order with Google Sheets:', error);
            // Continue with the flow even if Google Sheets sync fails
          }

          // Clear cart and redirect to success page
          router.push('/checkout/success');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#4F46E5',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment failure
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Checkout
      </h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-7">
          {/* Shipping Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                  Postal code
                </label>
                <input
                  type="text"
                  id="postal-code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Subtotal</div>
              <div className="text-sm font-medium text-gray-900">₹{state.total}</div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-base font-medium text-gray-900">Order total</div>
              <div className="text-base font-medium text-gray-900">₹{state.total}</div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </div>
  );
} 