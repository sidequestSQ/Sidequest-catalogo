import type { Product } from '../types/catalog';
import { categories } from '../data/categories';

export function getCategoryName(categoryId: string): string {
  return (
    categories.find((category) => category.id === categoryId)?.name ??
    'Sem categoria'
  );
}

export function getVisibleProducts(products: Product[]): Product[] {
  return products.filter((product) => product.status !== 'oculto');
}

export function searchProducts(
  products: Product[],
  query: string
): Product[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.shortDescription,
      product.description,
      product.sku,
      product.subcategory ?? '',
      ...product.tags,
    ]
      .join(' ')
      .toLocaleLowerCase('pt-BR');

    return searchableText.includes(normalizedQuery);
  });
}
