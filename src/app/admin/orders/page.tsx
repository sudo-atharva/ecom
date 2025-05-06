'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const orders = [
  {
    id: '1',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2024-03-15',
    amount: '$299.00',
    status: 'Delivered',
    items: [
      { name: 'Arduino Uno R3', quantity: 2, price: '$24.99' },
      { name: 'Breadboard', quantity: 1, price: '$5.99' },
    ],
  },
  {
    id: '2',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2024-03-14',
    amount: '$199.00',
    status: 'Processing',
    items: [
      { name: 'Raspberry Pi 4', quantity: 1, price: '$89.99' },
      { name: 'SD Card 32GB', quantity: 1, price: '$19.99' },
    ],
  },
  {
    id: '3',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    date: '2024-03-13',
    amount: '$499.00',
    status: 'Shipped',
    items: [
      { name: 'ESP32 Development Board', quantity: 3, price: '$12.99' },
      { name: 'OLED Display', quantity: 2, price: '$8.99' },
    ],
  },
];

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // TODO: Implement status update functionality
    console.log(`Updating order ${orderId} status to ${newStatus}`);
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all orders in your store including their status and details.
              </p>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders.map((order) => (
                        <>
                          <tr key={order.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              #{order.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div>{order.customer}</div>
                              <div className="text-gray-400">{order.email}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.date}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.amount}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'Processing'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                {selectedOrder === order.id ? 'Hide details' : 'Show details'}
                              </button>
                            </td>
                          </tr>
                          {selectedOrder === order.id && (
                            <tr>
                              <td colSpan={6} className="bg-gray-50 px-6 py-4">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">Order Items</h4>
                                    <div className="mt-2">
                                      <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                          <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                              Item
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                              Quantity
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                              Price
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          {order.items.map((item, index) => (
                                            <tr key={index}>
                                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                                                {item.name}
                                              </td>
                                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {item.quantity}
                                              </td>
                                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {item.price}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">Update Status</h4>
                                    <div className="mt-2">
                                      <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 