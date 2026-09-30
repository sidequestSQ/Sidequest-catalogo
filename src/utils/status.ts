import type { ProductStatus } from '../types/catalog';

export const productStatusLabels: Record<
  ProductStatus,
  string
> = {
  disponivel: 'Disponível',
  indisponivel: 'Indisponível',
  'em-breve': 'Em breve',
  esgotado: 'Esgotado',
  oculto: 'Oculto',
};

export function getProductStatusLabel(
  status: ProductStatus
): string {
  return productStatusLabels[status];
}

export function isProductVisible(
  status: ProductStatus
): boolean {
  return status !== 'oculto';
}

export function isProductAvailable(
  status: ProductStatus
): boolean {
  return status === 'disponivel';
}
