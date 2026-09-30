import type {
  Product,
  ProductImage,
} from '../types/catalog';

function isValidProductImage(
  image: ProductImage
): boolean {
  return (
    image.src.trim() !== '' &&
    image.alt.trim() !== ''
  );
}

export function getProductImages(
  product: Product
): ProductImage[] {
  return [...product.images]
    .filter(isValidProductImage)
    .sort((a, b) => {
      const positionA =
        Number.isFinite(a.position)
          ? a.position
          : Number.MAX_SAFE_INTEGER;

      const positionB =
        Number.isFinite(b.position)
          ? b.position
          : Number.MAX_SAFE_INTEGER;

      return positionA - positionB;
    });
}

export function getPrimaryProductImage(
  product: Product
): ProductImage | undefined {
  const images =
    getProductImages(product);

  const primaryIndex =
    images.findIndex(
      (image) =>
        image.primary === true
    );

  if (primaryIndex > 0) {
    const [primaryImage] =
      images.splice(primaryIndex, 1);

    images.unshift(primaryImage);
  }

  return images[0];
}

export function getProductGallery(
  product: Product
): ProductImage[] {
  return getProductImages(product);
}
