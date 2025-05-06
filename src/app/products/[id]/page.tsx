'use client';

import { useParams } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  return <ProductDetails id={id} />;
} 