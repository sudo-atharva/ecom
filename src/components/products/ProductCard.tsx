import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        {product.type === 'digital' && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
              Digital
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        </div>
        <div className="text-right">
          {product.salePrice ? (
            <>
              <p className="text-sm font-medium text-gray-900">₹{product.salePrice}</p>
              <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
            </>
          ) : (
            <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={`h-4 w-4 flex-shrink-0 ${
                product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="ml-2 text-sm text-gray-500">({product.reviewCount})</p>
      </div>
      {product.stock === 0 && (
        <div className="mt-2">
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
} 