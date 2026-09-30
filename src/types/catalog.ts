export type ProductStatus =
  | 'disponivel'
  | 'indisponivel'
  | 'em-breve'
  | 'esgotado'
  | 'oculto';

export type ChannelType =
  | 'whatsapp'
  | 'instagram'
  | 'mercado-livre'
  | 'shopee'
  | 'outro';

export type PromotionStatus =
  | 'agendada'
  | 'ativa'
  | 'encerrada';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  active: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  position: number;
  primary?: boolean;
}

export interface OfficialChannel {
  id: string;
  name: string;
  type: ChannelType;
  url: string;
  active: boolean;
  icon?: string;
}

export interface Promotion {
  id: string;
  name: string;
  status: PromotionStatus;
  startDate?: string;
  endDate?: string;
  discountPercent?: number;
  discountAmount?: number;
  text?: string;
  coupon?: string;
  channelIds?: string[];
}

export interface ProductChannel {
  channelId: string;
  active: boolean;
  price?: number;
  promotionId?: string;
  message?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  subcategory?: string;
  basePriceCents: number;
  images: ProductImage[];
  status: ProductStatus;
  sku: string;
  featured: boolean;
  isNew: boolean;
  tags: string[];
  channels: ProductChannel[];
  promotions?: Promotion[];
  createdAt: string;
  updatedAt: string;
}
