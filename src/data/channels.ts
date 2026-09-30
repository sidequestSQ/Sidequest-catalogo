import type { OfficialChannel } from '../types/catalog';

export const channels: OfficialChannel[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    type: 'instagram',
    purpose: 'divulgacao',
    url: '',
    active: false,
    showOnProducts: false,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    type: 'whatsapp',
    purpose: 'contato',
    url: '',
    active: false,
    showOnProducts: true,
  },
];
