import {
  isOfficialChannelUrl,
} from './channels';

const tests = [
  {
    name: 'Instagram oficial',
    type: 'instagram' as const,
    url: 'https://instagram.com/sidequest',
    expected: true,
  },
  {
    name: 'Instagram falso',
    type: 'instagram' as const,
    url: 'https://site-exemplo.com/instagram',
    expected: false,
  },
  {
    name: 'WhatsApp oficial',
    type: 'whatsapp' as const,
    url: 'https://wa.me/5500000000000',
    expected: true,
  },
  {
    name: 'WhatsApp falso',
    type: 'whatsapp' as const,
    url: 'https://site-exemplo.com/whatsapp',
    expected: false,
  },
  {
    name: 'Mercado Livre oficial',
    type: 'mercado-livre' as const,
    url: 'https://mercadolivre.com.br/',
    expected: true,
  },
  {
    name: 'Mercado Livre falso',
    type: 'mercado-livre' as const,
    url: 'https://site-exemplo.com/mercadolivre',
    expected: false,
  },
];

for (const test of tests) {
  const result = isOfficialChannelUrl(
    test.type,
    test.url
  );

  if (result !== test.expected) {
    throw new Error(
      `Falha: ${test.name}. Esperado ${test.expected}, recebido ${result}.`
    );
  }
}

console.log(
  `✓ ${tests.length} testes de canais passaram.`
);
