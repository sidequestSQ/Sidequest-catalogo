import type { Promotion } from '../types/catalog';

const promotionModules =
  import.meta.glob('./promotions/*.json', {
    eager: true,
    import: 'default',
  }) as Record<string, Promotion>;

export const promotions =
  Object.values(promotionModules);
