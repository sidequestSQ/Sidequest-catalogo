import type { Product } from '../types/catalog';

export const products: Product[] = [
  {
    id: 'pelucia-cogumelo-deluxe',
    name: 'Pelúcia Cogumelo Deluxe',
    slug: 'pelucia-cogumelo-deluxe',
    shortDescription: 'Pelúcia temática para fãs do universo geek.',
    description:
      'Uma pelúcia colecionável com acabamento especial, ideal para decoração, presente ou coleção.',
    categoryId: 'pelucias',
    basePriceCents: 5490,
    images: [],
    status: 'disponivel',
    sku: 'SQ-PEL-001',
    featured: true,
    isNew: true,
    tags: ['pelúcia', 'geek', 'colecionável'],
    channels: [
      {
        channelId: 'whatsapp',
        active: true,
      },
    ],
    createdAt: '2026-09-30',
    updatedAt: '2026-09-30',
  },
];
