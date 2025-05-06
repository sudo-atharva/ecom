'use client';

import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Arduino: A Beginner\'s Guide',
    excerpt: 'Learn the basics of Arduino programming and electronics with this comprehensive guide for beginners.',
    image: '/images/blog/arduino-beginner.jpg',
    date: '2024-03-15',
    author: 'John Doe',
    category: 'Tutorials'
  },
  {
    id: 2,
    title: 'Top 10 Electronics Components Every Maker Should Have',
    excerpt: 'Discover the essential components that every electronics enthusiast should have in their toolkit.',
    image: '/images/blog/components.jpg',
    date: '2024-03-10',
    author: 'Jane Smith',
    category: 'Components'
  },
  {
    id: 3,
    title: 'Building Your First IoT Project with ESP32',
    excerpt: 'A step-by-step guide to creating your first Internet of Things project using the ESP32 microcontroller.',
    image: '/images/blog/esp32.jpg',
    date: '2024-03-05',
    author: 'Mike Johnson',
    category: 'IoT'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blog</h1>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Latest articles, tutorials, and news from the world of electronics and DIY
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <div className="aspect-h-2 aspect-w-3">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <Link href={`/blog/category/${post.category.toLowerCase()}`}>
                      {post.category}
                    </Link>
                  </p>
                  <Link href={`/blog/${post.id}`} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">{post.author}</span>
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 