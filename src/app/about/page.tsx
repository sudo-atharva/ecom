'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Naviyantra</h1>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Empowering makers and innovators with quality electronics components and expert guidance
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-lg lg:h-auto">
              <Image
                src="/images/about/workshop.jpg"
                alt="Our workshop"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:pl-8">
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500">
                Founded in 2024, Naviyantra was born from a passion for electronics and a desire to make quality components accessible to everyone. We believe that innovation should be within reach of every maker, student, and professional.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Our team of experienced engineers and enthusiasts carefully curates each product in our catalog, ensuring that we offer only the best components for your projects.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Our Mission</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">Quality Components</h3>
                <p className="mt-2 text-gray-500">
                  We source and test every component to ensure the highest quality and reliability for your projects.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">Expert Support</h3>
                <p className="mt-2 text-gray-500">
                  Our team of experts is always ready to help you with technical questions and project guidance.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">Community Focus</h3>
                <p className="mt-2 text-gray-500">
                  We're building a community of makers and innovators through our blog, tutorials, and events.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Our Team</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/images/team/ceo.jpg"
                    alt="CEO"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">John Doe</h3>
                <p className="text-gray-500">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/images/team/cto.jpg"
                    alt="CTO"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Jane Smith</h3>
                <p className="text-gray-500">CTO</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/images/team/engineer.jpg"
                    alt="Lead Engineer"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Mike Johnson</h3>
                <p className="text-gray-500">Lead Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 