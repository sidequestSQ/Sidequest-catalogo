import type { OfficialChannel } from '../types/catalog';

const channelModules =
  import.meta.glob('./channels/*.json', {
    eager: true,
    import: 'default',
  }) as Record<string, OfficialChannel>;

export const channels =
  Object.values(channelModules);
