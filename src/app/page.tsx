import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Microcontrollers',
    description: 'Arduino, Raspberry Pi, ESP32, and more',
    image: '/images/categories/microcontrollers.jpg',
    href: '/products?category=microcontrollers',
  },
  {
    name: 'Sensors',
    description: 'Temperature, humidity, motion, and more',
    image: '/images/categories/sensors.jpg',
    href: '/products?category=sensors',
  },
  {
    name: 'DIY Kits',
    description: 'Complete projects for learning and fun',
    image: '/images/categories/diy-kits.jpg',
    href: '/products?category=diy-kits',
  },
  {
    name: 'Tools',
    description: 'Essential tools for electronics work',
    image: '/images/categories/tools.jpg',
    href: '/products?category=tools',
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Your Electronics Components Partner
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Quality components, tools, and DIY kits for makers, hobbyists, and professionals.
                  From microcontrollers to sensors, we've got everything you need for your next project.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/products"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Browse Products
                  </Link>
                  <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Find exactly what you need for your next electronics project
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {categories.map((category) => (
            <article key={category.name} className="flex flex-col items-start">
              <div className="relative w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={500}
                  height={300}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <Link
                    href={category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={category.href}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">{category.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
