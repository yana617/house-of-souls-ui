import { useHead } from '@unhead/vue';

export const SITE_NAME = 'Домик Спасённых Душ (ДСД)';
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://soulhome.by';

const DEFAULT_DESCRIPTION =
  'Животные из мини-приюта Домик Спасённых Душ в Минске ищут семьи! Всегда рады помощи и новым волонтёрам.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function useSeo({ title, description, image, url, type = 'website', jsonLd } = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `Животные из приюта | ${SITE_NAME}`;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaImage = image || DEFAULT_OG_IMAGE;
  const metaUrl = url || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  const headConfig = {
    title: fullTitle,
    meta: [
      { name: 'description', content: metaDescription },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:image', content: metaImage },
      { property: 'og:url', content: metaUrl },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'ru_RU' },
    ],
    link: [{ rel: 'canonical', href: metaUrl }],
  };

  if (jsonLd) {
    headConfig.script = [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd),
      },
    ];
  }

  useHead(headConfig);
}

export const SHELTER_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'AnimalShelter',
  name: 'Домик Спасённых Душ',
  alternateName: 'ДСД',
  description:
    'Волонтёрский мини-приют для бездомных животных в Минске. Помогаем кошкам и собакам найти новый дом.',
  url: 'https://soulhome.by',
  telephone: ['+375296624213', '+375293226155'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Минск',
    addressRegion: 'Минская область',
    addressCountry: 'BY',
  },
};