'use server';

import { prisma } from '@/db/prisma';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { convertToPlainObject } from '../utils';

// get latest poducts
export const getLatestProducts = async () => {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
};

// get single product by its slug
export const getProductBySlug = async (slug: string) => {
  const data = await prisma.product.findFirst({
    where: { slug: slug },
  });
  return data;
};
