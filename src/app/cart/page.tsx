'use client';

import { useCart } from '@/lib/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  if (state.items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
        <div className="mt-12 text-center">
          <h2 className="text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't added any items to your cart yet.
          </p>
          <div className="mt-6">
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

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-7">
          <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {state.items.map((item) => (
              <li key={item.product.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={200}
                    height={200}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {item.product.name}
                        </Link>
                      </h4>
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                  </div>

                  <div className="mt-4 flex flex-1 items-end justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="rounded-md border border-gray-300 p-1"
                      >
                        -
                      </button>
                      <p className="text-gray-500">Qty {item.quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="rounded-md border border-gray-300 p-1"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
            <Link
              href="/checkout"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 