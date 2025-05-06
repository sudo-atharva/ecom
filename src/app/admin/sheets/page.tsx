'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DocumentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Sheet {
  id: string;
  name: string;
  type: string;
  description: string;
  lastUpdated: string;
  status: 'published' | 'draft';
  fileUrl: string;
}

const mockSheets: Sheet[] = [
  {
    id: '1',
    name: 'Product Catalog 2024',
    type: 'Product Sheet',
    description: 'Complete catalog of all products with specifications',
    lastUpdated: '2024-03-15',
    status: 'published',
    fileUrl: '/sheets/product-catalog-2024.pdf',
  },
  {
    id: '2',
    name: 'Technical Specifications',
    type: 'Technical Sheet',
    description: 'Detailed technical specifications for all products',
    lastUpdated: '2024-03-10',
    status: 'published',
    fileUrl: '/sheets/technical-specs.pdf',
  },
  {
    id: '3',
    name: 'User Guide',
    type: 'User Guide',
    description: 'Comprehensive user guide for all products',
    lastUpdated: '2024-03-05',
    status: 'draft',
    fileUrl: '/sheets/user-guide.pdf',
  },
];

export default function AdminSheetsPage() {
  const [sheets, setSheets] = useState<Sheet[]>(mockSheets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSheet, setEditingSheet] = useState<Sheet | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSheet: Sheet = {
      id: editingSheet?.id || String(sheets.length + 1),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: formData.get('status') as 'published' | 'draft',
      fileUrl: formData.get('fileUrl') as string,
    };

    if (editingSheet) {
      setSheets(sheets.map(sheet => sheet.id === editingSheet.id ? newSheet : sheet));
    } else {
      setSheets([...sheets, newSheet]);
    }

    setIsModalOpen(false);
    setEditingSheet(null);
  };

  const handleDelete = (id: string) => {
    setSheets(sheets.filter(sheet => sheet.id !== id));
  };

  return (
    <ProtectedRoute>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Sheets</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your product sheets, technical specifications, and other documents.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setEditingSheet(null);
                setIsModalOpen(true);
              }}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Sheet
            </button>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Updated
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sheets.map((sheet) => (
                    <tr key={sheet.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <div className="flex items-center">
                          <DocumentIcon className="h-5 w-5 text-gray-400 mr-2" />
                          {sheet.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sheet.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sheet.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sheet.lastUpdated}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            sheet.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {sheet.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => {
                            setEditingSheet(sheet);
                            setIsModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(sheet.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
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

        {/* Add/Edit Sheet Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {editingSheet ? 'Edit Sheet' : 'Add New Sheet'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={editingSheet?.name}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      defaultValue={editingSheet?.type}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="Product Sheet">Product Sheet</option>
                      <option value="Technical Sheet">Technical Sheet</option>
                      <option value="User Guide">User Guide</option>
                      <option value="Datasheet">Datasheet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      defaultValue={editingSheet?.description}
                      required
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      defaultValue={editingSheet?.status}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700">
                      File URL
                    </label>
                    <input
                      type="text"
                      name="fileUrl"
                      id="fileUrl"
                      defaultValue={editingSheet?.fileUrl}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingSheet(null);
                    }}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {editingSheet ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 