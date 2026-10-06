import siteData from './site.json';

export const siteConfig =
  siteData as {
    name: string;
    shortName: string;
    description: string;
    url: string;
    language: string;
    locale: string;
    catalogPath: string;
    logo: string;
    favicon: string;
    defaultOgImage: string;
    footer: {
      description: string;
    };
  };
