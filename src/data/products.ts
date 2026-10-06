import type { Product } from '../types/catalog';

const productModules =
  import.meta.glob('./products/*.json', {
    eager: true,
    import: 'default',
  }) as Record<string, Product>;

export const products =
  Object.values(productModules);
