import type {
  Product,
  ProductChannel,
  Promotion,
} from '../types/catalog';

import { promotions } from '../data/promotions';

export interface PriceResult {
  originalPriceCents: number;
  finalPriceCents: number;
  discountCents: number;
  discountPercent: number;
}

function parsePromotionDate(
  value: string,
  isEndDate = false
): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
    const [year, month, day] =
      trimmedValue.split('-').map(Number);

    const date = new Date(
      year,
      month - 1,
      day,
      isEndDate ? 23 : 0,
      isEndDate ? 59 : 0,
      isEndDate ? 59 : 0,
      isEndDate ? 999 : 0
    );

    const timestamp = date.getTime();

    return Number.isNaN(timestamp)
      ? null
      : timestamp;
  }

  const timestamp = Date.parse(trimmedValue);

  return Number.isNaN(timestamp)
    ? null
    : timestamp;
}

export function isPromotionActive(
  promotion: Promotion,
  now: Date = new Date()
): boolean {
  if (promotion.status !== 'ativa') {
    return false;
  }

  const nowTimestamp = now.getTime();

  if (Number.isNaN(nowTimestamp)) {
    return false;
  }

  if (promotion.startDate) {
    const startTimestamp = parsePromotionDate(
      promotion.startDate
    );

    if (
      startTimestamp === null ||
      nowTimestamp < startTimestamp
    ) {
      return false;
    }
  }

  if (promotion.endDate) {
    const endTimestamp = parsePromotionDate(
      promotion.endDate,
      true
    );

    if (
      endTimestamp === null ||
      nowTimestamp > endTimestamp
    ) {
      return false;
    }
  }

  return true;
}

export function getActivePromotions(
  product: Product,
  now: Date = new Date()
): Promotion[] {
  return promotions.filter((promotion) => {
    if (!isPromotionActive(promotion, now)) {
      return false;
    }

    if (
      promotion.productIds &&
      promotion.productIds.length > 0 &&
      !promotion.productIds.includes(product.id)
    ) {
      return false;
    }

    return true;
  });
}

export function getPromotionById(
  product: Product,
  promotionId: string
): Promotion | undefined {
  const promotion = promotions.find(
    (item) =>
      item.id === promotionId
  );

  if (!promotion) {
    return undefined;
  }

  if (
    promotion.productIds &&
    promotion.productIds.length > 0 &&
    !promotion.productIds.includes(product.id)
  ) {
    return undefined;
  }

  return promotion;
}

export function getActivePromotion(
  product: Product,
  now: Date = new Date()
): Promotion | undefined {
  return getActivePromotions(
    product,
    now
  )[0];
}

export function getChannelPromotion(
  product: Product,
  channel: ProductChannel,
  now: Date = new Date()
): Promotion | undefined {
  if (!channel.promotionId) {
    return undefined;
  }

  const promotion =
    getPromotionById(
      product,
      channel.promotionId
    );

  if (
    !promotion ||
    !isPromotionActive(
      promotion,
      now
    )
  ) {
    return undefined;
  }

  if (
    promotion.channelIds &&
    promotion.channelIds.length > 0 &&
    !promotion.channelIds.includes(
      channel.channelId
    )
  ) {
    return undefined;
  }

  return promotion;
}

export function calculatePromotionPrice(
  priceCents: number,
  promotion?: Promotion,
  now: Date = new Date()
): PriceResult {
  const safePriceCents =
    Number.isFinite(priceCents) &&
    priceCents > 0
      ? Math.round(priceCents)
      : 0;

  if (
    !promotion ||
    !isPromotionActive(
      promotion,
      now
    )
  ) {
    return {
      originalPriceCents:
        safePriceCents,
      finalPriceCents:
        safePriceCents,
      discountCents: 0,
      discountPercent: 0,
    };
  }

  let discountCents = 0;

  if (
    typeof promotion.discountPercent ===
      'number' &&
    Number.isFinite(
      promotion.discountPercent
    ) &&
    promotion.discountPercent > 0
  ) {
    discountCents = Math.round(
      safePriceCents *
        (promotion.discountPercent / 100)
    );
  }

  if (
    typeof promotion.discountAmount ===
      'number' &&
    Number.isFinite(
      promotion.discountAmount
    ) &&
    promotion.discountAmount > 0
  ) {
    discountCents = Math.max(
      discountCents,
      Math.round(
        promotion.discountAmount
      )
    );
  }

  discountCents = Math.min(
    Math.max(
      discountCents,
      0
    ),
    safePriceCents
  );

  const finalPriceCents =
    safePriceCents -
    discountCents;

  const discountPercent =
    safePriceCents > 0
      ? Math.round(
          (discountCents /
            safePriceCents) *
            100
        )
      : 0;

  return {
    originalPriceCents:
      safePriceCents,
    finalPriceCents,
    discountCents,
    discountPercent,
  };
}

export function getProductChannelPrice(
  product: Product,
  channel: ProductChannel,
  now: Date = new Date()
): PriceResult {
  const basePrice =
    typeof channel.price ===
        'number' &&
      Number.isFinite(
        channel.price
      ) &&
      channel.price >= 0
      ? Math.round(
          channel.price
        )
      : product.basePriceCents;

  const promotion =
    getChannelPromotion(
      product,
      channel,
      now
    );

  return calculatePromotionPrice(
    basePrice,
    promotion,
    now
  );
}

export function getProductPrice(
  product: Product,
  now: Date = new Date()
): PriceResult {
  const promotion =
    getActivePromotion(
      product,
      now
    );

  return calculatePromotionPrice(
    product.basePriceCents,
    promotion,
    now
  );
}
