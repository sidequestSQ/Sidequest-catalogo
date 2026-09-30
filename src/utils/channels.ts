import type {
  ChannelType,
  OfficialChannel,
} from '../types/catalog';

const allowedDomains: Record<
  ChannelType,
  string[]
> = {
  instagram: [
    'instagram.com',
    'www.instagram.com',
  ],

  whatsapp: [
    'wa.me',
    'api.whatsapp.com',
    'www.whatsapp.com',
  ],

  'mercado-livre': [
    'mercadolivre.com.br',
    'www.mercadolivre.com.br',
  ],

  shopee: [
    'shopee.com.br',
    'www.shopee.com.br',
  ],

  outro: [],
};

function isValidWhatsAppUrl(
  url: URL
): boolean {
  if (
    url.hostname === 'wa.me'
  ) {
    const path =
      url.pathname.replace(
        /^\/+|\/+$/g,
        ''
      );

    return /^\d{10,15}$/.test(path);
  }

  if (
    url.hostname ===
      'api.whatsapp.com'
  ) {
    return (
      url.pathname ===
        '/send' &&
      url.searchParams.has('phone')
    );
  }

  if (
    url.hostname ===
      'www.whatsapp.com'
  ) {
    return (
      url.pathname !== '/' &&
      url.pathname !== ''
    );
  }

  return false;
}

function isValidInstagramUrl(
  url: URL
): boolean {
  return (
    url.pathname !== '/' &&
    url.pathname !== ''
  );
}

function isValidMarketplaceUrl(
  url: URL
): boolean {
  return (
    url.pathname !== '/' &&
    url.pathname !== ''
  );
}

export function isOfficialChannelUrl(
  type: ChannelType,
  url: string
): boolean {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.protocol !==
      'https:'
    ) {
      return false;
    }

    const hostname =
      parsedUrl.hostname.toLocaleLowerCase();

    if (
      !allowedDomains[type].includes(
        hostname
      )
    ) {
      return false;
    }

    switch (type) {
      case 'whatsapp':
        return isValidWhatsAppUrl(
          parsedUrl
        );

      case 'instagram':
        return isValidInstagramUrl(
          parsedUrl
        );

      case 'mercado-livre':
      case 'shopee':
        return isValidMarketplaceUrl(
          parsedUrl
        );

      case 'outro':
        return false;

      default:
        return false;
    }
  } catch {
    return false;
  }
}

export function isValidOfficialChannel(
  channel: OfficialChannel
): boolean {
  if (!channel.active) {
    return false;
  }

  return isOfficialChannelUrl(
    channel.type,
    channel.url
  );
}
