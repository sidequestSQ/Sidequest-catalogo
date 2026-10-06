import type { Category } from '../types/catalog';

const categoryModules =
  import.meta.glob('./categories/*.json', {
    eager: true,
    import: 'default',
  }) as Record<string, Category>;

export const categories =
  Object.values(categoryModules);
